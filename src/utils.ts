// some useful functions and consts

// allowed characters for a shortcut
export const allowedCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+.'
const genCharset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789'

// check if a string is a valid url
export const isValidHttpUrl = (str: string) => {
	let url
	try {
		url = new URL(str)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (_) {
		return false
	}
	return url.protocol === 'http:' || url.protocol === 'https:'
}

// random number generator
export const random = (upTo: number): number => Math.floor(Math.random() * upTo) + 1

// generate random string in base58
export const randomString = (length: number): string => {
	const stringBuilder = []

	// push a random character into the string builder
	for (let i = 0; i < length; i++) {
		stringBuilder.push(genCharset.charAt(random(genCharset.length)))
	}

	return stringBuilder.join('')
}

// check if a shortcut exists by checking if it's in the kv namespace
export const checkExists = async (env: Env, shortcut: string): Promise<boolean> => (await env.REDIRECTS.get(shortcut)) !== null

// list of 'well-known' urls to return trolling responses for
export const knownUrls = [
	// common config files
	'/.env',
	'/.htaccess',

	// wordpress
	'/wp-admin',
	'/wp-content',
	'/wp-cron.php',
	'/wp-login.php',
	'/wp-includes',
	'/wp-good.php',
	'/wp-blog.php',
	'/wpfile.php',

	// assorted paths
	'/about.php',
	'/admin.php',
	'/login.php',
	'/moon.php',
	'/tiny.php',
	'/tools.php',
	'/worksec.php',
	'/xmlrpc.php',
	'/Marvins.php',
]

// list of bad behavers that should be ignored
export const badDomains = [
	'appollo.jp',
	'appollo-plus.com',
	'ad-nex.com',
	'al.fanza.co.jp',
	'video.dmm.co.jp',
	'al.dmm.co.jp',
	'al.dmm.com',
	'matomenever.com',
	'www.mgstage.com',
	'www.toindom.com',
]

export const badPrefixes = ['https://x.com/shirouto_ero_', 'https://x.com/tabegoro_tuma']
