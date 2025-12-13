import { io } from 'socket.io-client';

export class TimedBot {
  name: string;
  socket: ReturnType<typeof io> | null = null;
  roomId: string | null = null;
  delay: number;
  constructor(name: string, delay = 500) {
    this.name = name;
    this.delay = delay;
  }

  connect(url = 'http://localhost:4000') {
    this.socket = io(url, { transports: ['websocket'] });
    this.socket.on('connect', () => {
      this.socket!.emit('auth', { name: this.name });
    });
    this.socket.on('game_state', (state) => {
      setTimeout(() => this.act(state), this.delay + Math.random() * 1000);
    });
  }

  createAndJoin() {
    if (!this.socket) return;
    this.socket.emit('create_room', {});
    this.socket.once('room_created', (payload: any) => {
      this.roomId = payload.roomId;
      this.socket!.emit('join_room', { roomId: this.roomId });
      setTimeout(() => this.socket!.emit('start_game', { roomId: this.roomId }), 200 + Math.random() * 200);
    });
  }

  act(state: any) {
    if (!this.socket || !this.roomId) return;
    const player = (state.players || []).find((p: any) => p.name === this.name);
    if (!player || !player.hand || player.hand.length === 0) return;
    const card = player.hand[Math.floor(Math.random() * player.hand.length)];
    this.socket.emit('intent_play_card', { roomId: this.roomId, cardId: card });
  }
}
