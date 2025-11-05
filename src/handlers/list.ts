type Shortcut = {
	name: string
	metadata?: {
		createdAt: string
		location?: {
			country?: string
			city?: string
			region?: string
			colo?: string
		}
	}
}

// take a url (/api/list) and return a list of all shortcuts
export const list = async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> => {
	// pretend this endpoint doesn't exist
	if (env.ADMIN_API_KEY !== new URL(request.url).searchParams.get('key')) {
		return new Response('not found', { status: 404 })
	}

	// @ts-expect-error we know the type of the response
	const shortcuts: Shortcut[] = (await env.REDIRECTS.list()).keys

	const sorted = shortcuts
		// only include shortcuts with metadata
		.filter((s) => Object.prototype.hasOwnProperty.call(s, 'metadata'))
		// sort by createdAt date
		.sort((a, b) => new Date(b.metadata?.createdAt || '').getTime() - new Date(a.metadata?.createdAt || '').getTime())
		// select only wanted fields and resolve the destination
		.map(async (s) => ({
			name: s.name,
			dest: await env.REDIRECTS.get(s.name),
			createdAt: s.metadata?.createdAt,
			location: s.metadata?.location,
		}))

	return new Response(JSON.stringify(await Promise.all(sorted)), {
		status: 200,
		headers: { 'content-type': 'application/json' },
	})
}
