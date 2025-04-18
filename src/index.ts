import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { hashPassword, verifyPassword } from './argon2id';

const app = new Hono();

app.use('/*', cors({
  origin: 'https://app.rmdhn.id',
  allowMethods: ['GET', 'POST'],
}));

app.get('/healthcheck', async (c) => {
  console.log('Healthcheck called');
  const password = 'a';
  const passwordHash = await hashPassword(password);

  if (await verifyPassword(password, passwordHash)) {
    return c.json({ status: 'healthy' });
  } else {
    return c.json({ status: 'please wait' });
  };
});

app.post('/hash', async (c) => {
  const { password }: { password: string } = await c.req.json();
  const passwordHash = await hashPassword(password);

  return c.json({ passwordHash });
});

app.post('/verify', async (c) => {
  const { password, passwordHash }: { password: string, passwordHash: string } = await c.req.json();
  const match = await verifyPassword(password, passwordHash);

  return c.json({ match });
});

export default app;
