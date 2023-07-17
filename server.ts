import { indexOfNeedle } from 'https://deno.land/std@0.193.0/bytes/index_of_needle.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { send } from 'https://deno.land/x/oak@v12.6.0/send.ts';

const app = new Application();
const router = new Router();

router.get('/', async (req) => {
	req.response.headers.set('Content-Type', 'text/html');
	await send(req, req.request.url.pathname, {
		root: `${Deno.cwd()}/public/pages/`,
		index: 'index.html',
	});
});

router.get('/add-user', async (req) => {
	console.log('Current working directory:', Deno.cwd());
	console.log('Resolved file path:', `${Deno.cwd()}/public/adduser.html`);
	req.response.headers.set('Content-Type', 'text/html');
	await send(req, req.request.url.pathname, {
		root: `${Deno.cwd()}/public/pages`,
		index: 'add-user.html',
	});
});

app.use(router.routes());
console.log('Server running on http://localhost:3000');
await app.listen({ port: 3000 });
