import { RandomBot } from './RandomBot';
import { GreedyBot } from './GreedyBot';
import { TimedBot } from './TimedBot';

const args = process.argv.slice(2);
const count = Number(args[0] || 2);
const baseUrl = args[1] || 'http://localhost:4000';

async function main() {
  for (let i = 0; i < count; i++) {
    const t = Math.random();
    const name = `Bot-${Math.floor(Math.random() * 10000)}`;
    const b = t < 0.33 ? new RandomBot(name) : t < 0.66 ? new GreedyBot(name) : new TimedBot(name, 500 + Math.floor(Math.random() * 500));
    b.connect(baseUrl);
    b.createAndJoin();
    // small stagger
    await new Promise((r) => setTimeout(r, 200));
  }
}

main().catch(console.error);
