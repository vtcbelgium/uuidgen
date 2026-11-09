export default {
  async fetch(request, env) {
    const ua = (request.headers.get("user-agent") || "").toLowerCase();
    if (ua.includes("curl") || ua.includes("wget") || ua.includes("httpie")) {
      const url = new URL(request.url);
      const count = Math.min(Math.max(parseInt(url.searchParams.get("n") || "1"), 1), 100);
      let uuids = [];
      for (let i = 0; i < count; i++) {
        uuids.push(crypto.randomUUID());
      }
      return new Response(uuids.join("\n") + "\n", {
        headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "no-store" }
      });
    }
    return env.ASSETS.fetch(request);
  }
};