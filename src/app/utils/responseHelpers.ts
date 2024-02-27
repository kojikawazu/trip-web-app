
function createResponse(body: Object, status: number, headers: HeadersInit = { 'Content-Type': 'application/json' }) {
    return new Response(JSON.stringify(body), {
        status,
        headers,
    });
}

export { createResponse };