export async function fetchDataFromCMS(endpoint: string) {
    const req = await fetch("https://devcmscp.cashpot.ro"+endpoint, {
        method: "GET"
    });
    return await req.json();
}