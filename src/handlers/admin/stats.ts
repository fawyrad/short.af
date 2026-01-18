type Shortcut = {
	name: string
}

type Stats = {
	domains: Record<string, number>
	countries: Record<string, number>
}

// take a url (/admin/stats) and show some stats about the shortcuts
export const stats = async (request: Request, env: Env): Promise<Response> => {
	const shortcuts: Shortcut[] = (await env.REDIRECTS.list()).keys

	const stats: Stats = {
		domains: {},
		countries: {},
	}

	for (const shortcut of shortcuts) {
		const dest = await env.REDIRECTS.get(shortcut.name)
		if (!dest) continue
		const url = new URL(dest)

		if (url.hostname.includes('.')) {
			stats.domains[url.hostname] = stats.domains[url.hostname] ? stats.domains[url.hostname] + 1 : 1
		}
	}

	const domains = Object.entries(stats.domains)
	domains.sort((a, b) => b[1] - a[1])

	stats.domains = Object.fromEntries(domains)

	return new Response(JSON.stringify(stats), {
		status: 200,
		headers: { 'content-type': 'application/json' },
	})
}
