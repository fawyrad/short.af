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

// take a url (/api/list) and print a list of all shortcuts
export const list = async (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> => {
	// @ts-expect-error we know the type of the response
	const shortcuts: Shortcut[] = (await env.REDIRECTS.list()).keys

	if (shortcuts) {
		const sorted = shortcuts
			// only include shortcuts with metadata
			.filter((s) => Object.prototype.hasOwnProperty.call(s, 'metadata'))
			// sort by createdAt date
			.sort((a, b) => new Date(b.metadata?.createdAt || '').getTime() - new Date(a.metadata?.createdAt || '').getTime())
			// tidy up
			.map((s) => ({
				name: s.name,
				createdAt: s.metadata?.createdAt,
				location: s.metadata?.location,
			}))

		console.log(sorted)
	}

	// pretend this endpoint doesn't exist
	return new Response('not found', { status: 404 })
}
