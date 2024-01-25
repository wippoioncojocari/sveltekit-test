import {PUBLIC_CMS_API, PUBLIC_CMS_PROJECT_ID} from "$env/static/public"

export async function fetchDataFromCMS(endpoint: string) {
    const req = await fetch(PUBLIC_CMS_API+endpoint, {
        method: "GET",
        headers: {
            "projectId":PUBLIC_CMS_PROJECT_ID
        }
    });
    return await req.json();
}