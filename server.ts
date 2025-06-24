import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { join } from "https://deno.land/std@0.177.0/path/mod.ts";

const UV_PATH = './uv';

serve(async (req) => {
    const url = new URL(req.url);
    const pathname = url.pathname;
    
    // Serve static files
    if (pathname.startsWith('/uv/')) {
        const filePath = join(UV_PATH, pathname.replace('/uv/', ''));
        try {
            const file = await Deno.readFile(filePath);
            return new Response(file, {
                headers: { 'Content-Type': getContentType(filePath) }
            });
        } catch {
            return new Response('Not found', { status: 404 });
        }
    }
    
    // Serve index.html
    if (pathname === '/') {
        const html = await Deno.readTextFile('./index.html');
        return new Response(html, {
            headers: { 'Content-Type': 'text/html' }
        });
    }
    
    return new Response('Not found', { status: 404 });
});

function getContentType(path: string): string {
    if (path.endsWith('.js')) return 'application/javascript';
    if (path.endsWith('.html')) return 'text/html';
    return 'text/plain';
}
