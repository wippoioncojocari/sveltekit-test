import { fetchDataFromCMS } from '$lib/services/cms_fetch';

export const load = async (page: { params: { page: string } }) => {
    const endpoint = `/api/document/get/slots_test`;
    const data = await fetchDataFromCMS(endpoint);
    return data.data
};