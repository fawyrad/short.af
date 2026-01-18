// @ts-expect-error this is an html file
import html from './manage.html'

// take a url (/admin/manage) and return an html page
export const manage = async (): Promise<Response> => {
	return new Response(html, {
		status: 200,
		headers: { 'content-type': 'text/html' },
	})
}
