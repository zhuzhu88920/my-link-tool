export async function onRequestGet(context) {
    const data = await context.env.MY_DB.get("links");
    return new Response(data || "[]", { headers: { "Content-Type": "application/json" } });
}

export async function onRequestPost(context) {
    const newData = await context.request.json();
    const oldData = JSON.parse(await context.env.MY_DB.get("links") || "[]");
    const combined = [...oldData, ...newData];
    await context.env.MY_DB.put("links", JSON.stringify(combined));
    return new Response(JSON.stringify({success: true}));
}

export async function onRequestDelete(context) {
    await context.env.MY_DB.delete("links");
    return new Response(JSON.stringify({success: true}));
}