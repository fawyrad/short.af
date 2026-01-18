// take a url (/admin/delete) and return a list of all shortcuts
export const deleteShortcut = async (request: Request, env: Env): Promise<Response> => {
	const url = new URL(request.url)
	const key = url.searchParams.get('key')
	const name = url.searchParams.get('name')

	if (!key || !name) {
		return new Response('invalid request', { status: 400 })
	}

	await env.REDIRECTS.delete(name)

	return new Response(JSON.stringify({ status: 'success' }), {
		status: 200,
		headers: { 'content-type': 'application/json' },
	})
}
