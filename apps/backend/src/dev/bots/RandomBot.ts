import { io } from 'socket.io-client';

export class RandomBot {
  name: string;
  socket: ReturnType<typeof io> | null = null;
  roomId: string | null = null;
  constructor(name: string) {
    this.name = name;
  }

  connect(url = 'http://localhost:4000') {
    this.socket = io(url, { transports: ['websocket'] });
    this.socket.on('connect', () => {
      this.socket!.emit('auth', { name: this.name });
    });
    this.socket.on('auth_ok', ({ id, name }) => console.log(`${name} auth_ok id:${id}`));
    this.socket.on('room_created', (d) => {
      console.log('room created', d);
    });
    this.socket.on('game_state', (state) => {
      // naive: if there are playable cards announced, play a random one
      setTimeout(() => this.makeRandomPlay(state), 200 + Math.random() * 800);
    });
  }

  createAndJoin() {
    if (!this.socket) return;
    this.socket.emit('create_room', {});
    this.socket.once('room_created', (payload: any) => {
      this.roomId = payload.roomId;
      this.socket!.emit('join_room', { roomId: this.roomId });
      // ask server to start a game if backend exposes this
      setTimeout(() => this.socket!.emit('start_game', { roomId: this.roomId }), 200 + Math.random() * 200);
    });
  }

  join(roomId: string) {
    if (!this.socket) return;
    this.roomId = roomId;
    this.socket.emit('join_room', { roomId });
  }

  makeRandomPlay(state: any) {
    if (!this.socket || !this.roomId) return;
    // pick random available intent (if presented by server in state.legalMoves)
    // For now we just emit intent_play_card with a placeholder
    if (!state) return;
    const player = (state.players || []).find((p: any) => p.name === this.name);
    if (!player || !player.hand || player.hand.length === 0) return;
    const card = player.hand[Math.floor(Math.random() * player.hand.length)];
    this.socket.emit('intent_play_card', { roomId: this.roomId, cardId: card });
  }
}
