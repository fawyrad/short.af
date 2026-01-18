import { list } from './list'

export const admin = async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> => {
	const url = new URL(request.url)
	const path = url.pathname

	// pretend this endpoint doesn't exist
	if (env.ADMIN_API_KEY !== new URL(request.url).searchParams.get('key')) {
		return new Response('not found', { status: 404 })
	}

	if (path === '/admin/list') {
		return await list(request, env)
	}

	return new Response('not found', { status: 404 })
}
