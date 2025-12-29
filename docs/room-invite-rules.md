Ti si senior multiplayer backend + frontend inženjer. Radiš na online multiplayer igri „Zing“ (Node.js + TypeScript + Socket.IO + Postgres/Prisma).

POSTOJEĆE STANJE:
Već postoji kompletna logika za Room:
- create room
- join room preko room koda
- room ima hosta
- igrači mogu join
- host može startovati igru
- Game, Player, GameEvent, GameSnapshot već postoje u bazi

ZADATAK:
Potrebno je implementirati FRIEND INVITE funkcionalnost i proširiti POSTOJEĆI ROOM SISTEM (bez pravljenja novog party sistema). Room ostaje centralni objekat.

--------------------------------------------------------------------
OSNOVNA PRAVILA (OBAVEZNA)
--------------------------------------------------------------------

1) ROOM LIFETIME
- Room postoji dok god ima BAR JEDNOG igrača.
- Ako Room ima 0 igrača → automatski se briše.
- Kada se Room obriše:
  - svi invite-ovi vezani za taj Room postaju nevažeći
  - ako neko pokuša da prihvati invite → dobija grešku: ROOM_NOT_FOUND

2) HOST
- Room uvijek ima jednog hosta dok ima igrača.
- Ako host napusti Room, a u Roomu ostanu drugi igrači:
  - host se dodjeljuje RANDOM preostalom igraču
- Host ima dodatne privilegije:
  - kick bilo kog igrača
  - start game
  - dodjela uloga (igrač / spektator)
  - izbor timova kod 2v2 party

3) INVITE — PRVI INVITE KREIRA ROOM
Scenario: igrač A poziva igrača B
- Čim A pošalje invite:
  - server kreira NOVI Room (koristeći ISTI kod kao create room)
  - A AUTOMATSKI ulazi u taj Room
  - A postaje host
- B dobija in-app invite (Accept / Decline)
- Ako B prihvati → ulazi u TAJ ISTI Room
- Ako B odbije → A dobija notifikaciju da je invite odbijen

4) INVITE IZ POSTOJEĆEG ROOMA
- Svaki igrač koji je u Roomu ima pristup svojoj friend listi
- Iz friend liste može slati invite za TAJ ISTI Room
- Ne kreira se novi Room
- Invite se može poslati samo:
  - prijatelju (Friendship = ACCEPTED)
  - korisniku koji već nije u tom Roomu
- Invite preko room koda i dalje postoji i radi paralelno

5) INVITE VALIDNOST
- Invite traje 5 minuta (TTL = 5 min)
- Ako istekne:
  - status postaje EXPIRED
  - Accept vraća grešku: INVITE_EXPIRED
- Ako već postoji PENDING invite za istog usera u tom Roomu:
  - ne dozvoliti slanje novog invite-a
  - UI treba da blokira dugme i prikaže „Invite already pending“

6) ACCEPT INVITE DOK JE USER U DRUGOM ROOMU
- User NE MOŽE biti u dva Rooma istovremeno
- Ako user pokuša Accept invite dok je već u Roomu:
  - UI mora da pita: „Leave current room and join new room?“
  - Ako potvrdi:
    - user napušta trenutni Room
    - zatim se izvršava Accept invite
  - Ako odbije → ništa se ne dešava

7) KICK & LEAVE
- Host može kickovati bilo kog igrača
- Kick NIJE ban:
  - kickovani igrač može kasnije opet biti invite-ovan
- Svaki igrač mora imati opciju Leave room
- Ako Leave ili Kick dovede do 0 igrača → Room se briše

--------------------------------------------------------------------
ROLE: IGRAČ vs SPEKTATOR
--------------------------------------------------------------------

- U Roomu može biti neograničen broj korisnika
- Postoje dvije uloge:
  - PLAYER
  - SPECTATOR
- Po defaultu, svaki novi user koji uđe u Room je PLAYER
- Host ima opciju da svakom useru promijeni ulogu (PLAYER ↔ SPECTATOR)

PRAVILO STARTA IGRE:
- Game se NE MOŽE započeti ako:
  - nema TAČNO 2 ili TAČNO 4 PLAYERA
  - spektatori se ignorišu za start

--------------------------------------------------------------------
START GAME OPCIJE (SAMO HOST)
--------------------------------------------------------------------

Host ima tri dugmeta:

1) 1v1
- dostupno samo ako ima TAČNO 2 PLAYERA
- klik → game startuje odmah (1v1)

2) 2v2 RANDOM
- dostupno samo ako ima TAČNO 2 PLAYERA
- klik → ta 2 playera ulaze u REGULAR matchmaking
- kada matchmaking pronađe game:
  - kreira se novi Game
  - trenutni Room se briše
  - igrači se prebacuju u matchmaking game room

3) 2v2 PARTY
- dostupno samo ako ima TAČNO 4 PLAYERA
- klik → otvara se UI za izbor timova
- SAMO HOST bira:
  - Team 1: 2 playera
  - Team 2: 2 playera
- nakon izbora host klikne Start Game
- game se startuje sa FIKSNIM timovima

Team assignment mora biti:
- validiran (2 vs 2)
- authoritative
- sačuvan (Player.team ili GameEvent payload)

--------------------------------------------------------------------
BAZA PODATAKA — OBAVEZNO
--------------------------------------------------------------------

Dodati novu tabelu za invite-ove (Prisma):

- RoomInvite
  - id
  - roomId
  - inviterId
  - inviteeId
  - status: PENDING | ACCEPTED | DECLINED | CANCELLED | EXPIRED
  - createdAt
  - updatedAt
  - expiresAt

Pravila:
- UNIQUE (roomId, inviteeId) za PENDING invite
- Brisanje Rooma → svi invite-ovi za taj room postaju CANCELLED ili se brišu

--------------------------------------------------------------------
SOCKET API — POTREBNO DEFINISATI
--------------------------------------------------------------------

Definiši tačne Socket.IO evente i payload-ove za:
- send_invite (van rooma → kreira room)
- send_invite (iz rooma)
- invite_received
- invite_accept
- invite_decline
- invite_expired
- room_joined
- room_left
- room_kicked
- host_changed
- role_changed (player/spectator)
- start_1v1
- start_2v2_random
- start_2v2_party
- team_assignment

Svaki error mora imati jasan reason:
ROOM_NOT_FOUND
INVITE_EXPIRED
ALREADY_IN_ROOM
NOT_HOST
INVALID_PLAYER_COUNT
ROOM_EMPTY
etc.

--------------------------------------------------------------------


SVAKI OD 8 TASKOVA:

1) Dodaj Prisma modele:
- RoomInvite:
  - id (uuid)
  - roomId (string)
  - inviterId (User.id)
  - inviteeId (User.id)
  - status enum: PENDING | ACCEPTED | DECLINED | CANCELLED | EXPIRED
  - createdAt, updatedAt
  - expiresAt (DateTime)
  - (po potrebi) metadata jsonb
- Relations: inviter and invitee su User (2 relacije).
- Indexi: roomId, inviteeId, inviterId, status, expiresAt.
- Pravilo: ne dozvoliti dupli PENDING invite za isti (roomId, inviteeId).
  - Ako Prisma ne može partial unique, predloži najbolju alternativu:
    a) običan @@unique([roomId, inviteeId]) + u logici dozvoli re-invite tek kad status != PENDING
    b) ili raw SQL partial unique index (Postgres) i objasni kako ide migracija.

1.2) Napiši migraciju ili SQL ekvivalent koji će Prisma da generiše.
1.3) Napiši TypeScript helper funkcije (repo/service) za:
- createInvite(roomId, inviterId, inviteeId, expiresAt)
- markAccepted(inviteId)
- markDeclined(inviteId)
- cancelInvitesByRoom(roomId)
- expireOldInvites(now)
--------------------------------------------------------------------
2) Implementiraj InviteService za Zing (Node/TS + Prisma). DB već ima RoomInvite.

Zahtjevi:
- Invite traje 5 minuta (expiresAt).
- Ne dozvoli slanje invite-a ako već postoji PENDING za isti (roomId, inviteeId). Vrati error INVITE_ALREADY_PENDING.
- Accept:
  - Ako invite ne postoji -> INVITE_NOT_FOUND
  - Ako status nije PENDING -> INVITE_NOT_PENDING
  - Ako expired -> set status EXPIRED i vrati INVITE_EXPIRED
  - Ako room ne postoji -> ROOM_NOT_FOUND (pretpostavi da roomovi žive in-memory; service dobija callback roomExists(roomId))
  - Ako invitee već u nekom roomu -> vrati ALREADY_IN_ROOM (UI će pitati leave & join)
- Decline:
  - Ako status PENDING -> set DECLINED, notify inviter
- Cancel by room delete:
  - set CANCELLED za sve PENDING invites tog roomId
- Expire job:
  - funkcija koja markira sve PENDING sa expiresAt < now u EXPIRED

Vrati:
1) InviteService.ts (TypeScript kod)
2) listu error code-ova i kada se vraćaju
3) predlog transakcija/locks da se izbjegne race (accept klik 2 puta, accept dok room briše).
--------------------------------------------------------------------
3) Proširi postojeći roomManager za Zing (Socket.IO server). Roomovi su in-memory.

Zahtjevi:
- Room ima listu members sa:
  - userId (ili guestId)
  - name
  - roleInRoom: 'PLAYER' | 'SPECTATOR' (default PLAYER)
  - joinedAt
- Room ima hostId (socket/user identifier).
- Ako host napusti:
  - ako ostaje >=1 member -> random preostali postaje host
  - emit 'host_changed' svima u roomu
- Ako room ostane bez igrača (0 members) -> room se briše.

Dodaj funkcije:
- setMemberRole(roomId, targetId, role) (samo host)
- kickMember(roomId, targetId) (samo host)
- leaveRoom(roomId, memberId)
- countPlayers(roomId) -> broj PLAYER
- canStart1v1(roomId) -> players==2
- canStart2v2(roomId) -> players==4

----------------------------------------------------------------------

4) Napiši Socket.IO evente i server handlers za Zing invite sistem, koristeći InviteService + roomManager.

Tokovi:
A) send_invite_outside_room:
- A šalje invite B dok nije u roomu (ili čak i kad jeste — ali prefer outside):
  1) server kreira novi room (existing createRoom)
  2) auto-join A, A postaje host
  3) create RoomInvite(PENDING, expiresAt=now+5m)
  4) emit A: room_created + room_update
  5) emit B: invite_received (inviteId, roomId, inviter info, expiresAt)

B) send_invite_in_room:
- bilo koji member u roomu može pozvati svog friend-a u isti room
- create invite -> emit invite_received

C) invite_accept:
- client šalje inviteId
- server validira:
  - ako invitee već u roomu -> server vrati error ALREADY_IN_ROOM i NE radi join
  - ako OK -> server joinuje usera u room (existing join logic)
  - update invite status ACCEPTED
  - emit room_update svima
  - emit inviter: invite_accepted

D) invite_decline:
- update status DECLINED
- emit inviter: invite_declined

E) UI flow “leave current room and join?”:
- predloži event ‘invite_accept_force’ ili dvostepeni:
  1) client leave current room
  2) client accept invite

Vrati:
- Tačne event name-ove
- Payload shape
- Error response shape (reason, message)
- Server handler pseudokod/TS kod.
---------------------------------------------------------------
5) Integracija join-by-code i room deletion sa invites.

Zahtjevi:
- join_room by code i dalje radi kao prije.
- Ako room postane prazan i briše se:
  - pozvati InviteService.cancelInvitesByRoom(roomId)
  - emit svim online invitee-ovima (ako moguće) 'invite_cancelled' sa reason ROOM_DELETED
- Ako neko pokuša accept invite za obrisani room -> error ROOM_NOT_FOUND.

Napiši:
1) gdje u roomManager-u / socket handleru treba da se pozove cancelInvitesByRoom
2) kako da se mapiraju online korisnici -> njihove pending invite notifikacije (ako nema, samo DB update je ok)
3) test scenarije: host leaves -> reassignment; last player leaves -> room deleted -> invites cancelled.

--------------------------------------------------------------
6) Implementiraj host start akcije u roomu za Zing.

6.1) start_1v1:
- samo host
- validacija: countPlayers(roomId)==2
- start game odmah (existing startGame flow)
- emit game_started / navigate signal

6.2) start_2v2_random:
- samo host
- validacija: countPlayers(roomId)==2
- duo party ulazi u regular matchmaking (postojeći matchmakingManager)
- kada matchmaking pronađe match i kreira game:
  - trenutni room se briše (roomManager.deleteRoom)
  - igrači se prebacuju u novi matchmaking game/room
- definisi evente:
  - queue_joined, match_found, matchmaking_error
- obradi edge case: dok su u queue, neko napusti room -> cancel queue.

Vrati TS handler kod i potrebne izmjene u matchmakingManager-u da primi “party of 2” kao jedinicu.

--------------------------------------------------------------
7) Implementiraj 2v2 PARTY start (private) u roomu.

Zahtjevi:
- samo host
- validacija: countPlayers(roomId)==4
- klik dugmeta otvara “team selection” flow:
  - host šalje team assignment: team1:[id,id], team2:[id,id]
  - server validira: 4 unique players, 2/2, svi su PLAYER u roomu
- tek nakon validnog team assignment, host šalje start_2v2_party_confirm
- server startuje game i persistuje timove authoritative:
  - predloži najbolji način:
    a) dodaj Player.team kolonu u DB
    b) ili upiši GameEvent 'teams_assigned' payload
- emit: teams_updated / game_started

Vrati:
- event contract
- TS handler kod
- DB izmjenu ako predlažeš Player.team (Prisma schema + migration).
--------------------------------------------------------
8) Napiši frontend plan/implementaciju (React) za Room screen za Zing, integrisan sa Socket.IO.

Zahtjevi UI:
- prikaz member list (name, PLAYER/SPECTATOR, host badge)
- host kontrole:
  - kick player
  - set role PLAYER/SPECTATOR
  - start buttons: 1v1, 2v2 random, 2v2 party (enabled samo kad countPlayers==2 ili 4)
- svi memberi:
  - leave room
  - friend list panel + invite button (disabled ako invite pending)
- invite inbox:
  - modal/toast za invite_received sa Accept/Decline
  - Accept ako user već u roomu -> pokaži confirm “Leave current room and join?”
- team selection modal za 2v2 party:
  - host bira timove, submit, zatim confirm start

Vrati:
- state machine (koji state/flagovi)
- minimalne React komponente
- tačne socket evente koje sluša/emituje
- error handling i poruke (reason-based).


