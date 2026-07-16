import type Redis from 'ioredis';
import { createClient, k } from '../client.js';
import { cmd, note, sleep, title } from '../log.js';

/**
 * Pub/Sub —— 广播，fire-and-forget。
 *
 * 注意它没有持久化：消息发出去时没在线的订阅者就永远收不到了。
 * 需要"至少一次"投递请用 Stream（见 10-stream.ts）。
 */
export async function pubsubDemo(redis: Redis): Promise<void> {
  title('Pub/Sub：广播');

  const channel = k('news');

  // 订阅会把连接锁进订阅模式，必须单独开一条。
  const sub = createClient();
  const received: string[] = [];

  await sub.subscribe(channel);
  sub.on('message', (ch, msg) => {
    received.push(msg);
    cmd(`收到 [${ch}]`, msg);
  });

  await sleep(50); // 等订阅真正生效，否则消息会丢
  cmd(`PUBLISH ${channel} "hello"`, await redis.publish(channel, 'hello'));
  note('PUBLISH 的返回值 = 收到消息的订阅者数量，0 就是没人在听');
  cmd(`PUBLISH ${channel} "world"`, await redis.publish(channel, 'world'));
  await sleep(100);

  await sub.unsubscribe(channel);
  note('取消订阅后再发，消息直接蒸发');
  cmd(`PUBLISH ${channel} "lost"`, await redis.publish(channel, 'lost'));
  await sleep(50);
  cmd('订阅者总共收到', received);
  await sub.quit();

  note('PSUBSCRIBE 按模式订阅，可以一次收一批频道');
  const psub = createClient();
  await psub.psubscribe(k('room', '*'));
  psub.on('pmessage', (pattern, ch, msg) => cmd(`pmessage ${pattern} [${ch}]`, msg));
  await sleep(50);
  await redis.publish(k('room', '1'), 'hi from room 1');
  await redis.publish(k('room', '2'), 'hi from room 2');
  await sleep(100);
  await psub.quit();
}
