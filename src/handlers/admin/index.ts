import { deleteShortcut } from './delete'
import { list } from './list'
import { manage } from './manage'
import { purge } from './purge'
import { stats } from './stats'

export const admin = async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> => {
	const url = new URL(request.url)
	const path = url.pathname

	// pretend this endpoint doesn't exist
	const isAdmin =
		env.ADMIN_API_KEY === new URL(request.url).searchParams.get('key') || request.headers.get('x-api-key') === env.ADMIN_API_KEY
	if (!isAdmin) {
		return new Response('not found', { status: 404 })
	}

	if (path === '/admin/list') {
		return await list(request, env)
	} else if (path === '/admin/delete') {
		return deleteShortcut(request, env)
	} else if (path === '/admin/manage') {
		return manage()
	} else if (path === '/admin/purge') {
		return purge(request, env)
	} else if (path === '/admin/stats') {
		return stats(request, env)
	}

	return new Response('not found', { status: 404 })
}
