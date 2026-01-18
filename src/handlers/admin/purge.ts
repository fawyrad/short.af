import { badDomains, badPrefixes } from '../../utils'

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

// take a url (/admin/purge) and remove all bad shortcuts
export const purge = async (request: Request, env: Env): Promise<Response> => {
	// @ts-expect-error we know the type of the response
	const shortcuts: Shortcut[] = (await env.REDIRECTS.list()).keys
	const purged: Record<string, string>[] = []

	for (const shortcut of shortcuts) {
		const dest = await env.REDIRECTS.get(shortcut.name)
		if (!dest) continue

		const url = new URL(dest)
		const isBad = badDomains.includes(url.hostname) || badPrefixes.some((prefix) => dest.startsWith(prefix))
		if (isBad) {
			console.log(`purging bad shortcut: ${shortcut.name} (${dest})`)
			await env.REDIRECTS.delete(shortcut.name)
			purged.push({ name: shortcut.name, dest })
		}
	}

	return new Response(JSON.stringify(purged), {
		status: 200,
		headers: { 'content-type': 'application/json' },
	})
}
