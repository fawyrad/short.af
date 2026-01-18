import { expand } from './handlers/expand'
import { shortcut } from './handlers/shortcut'
import { shorten } from './handlers/shorten'
import { admin } from './handlers/admin'
import { troll } from './handlers/troll'
import { knownUrls } from './utils'

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url)
		const path = url.pathname

		// handle special cases
		if (request.method === 'OPTIONS') {
			return new Response(null, { headers: { 'Access-Control-Allow-Origin': '*' } })
		} else if (path === '/api/shorten' && request.method === 'POST') {
			return shorten(request, env, ctx)
		} else if (path.startsWith('/api/expand/')) {
			return expand(request, env, ctx)
		} else if (path.startsWith('/admin')) {
			return admin(request, env, ctx)
		} else if (knownUrls.some((url) => path.startsWith(url))) {
			return troll()
		}

		// everything else is a shortcut
		return shortcut(request, env, ctx)
	},
} satisfies ExportedHandler<Env>
