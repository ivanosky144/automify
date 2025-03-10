import API_KEY, { getAuthHeaders } from ".";

export async function addRequest(payload: any) {
    const res = await fetch(`${API_KEY}/api/requests`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
    });
    return res.json();
}

export async function deleteRequest(id: number) {
    const res = await fetch(`${API_KEY}/api/requests/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    return res.json();
}

export async function updateRequest(id: number, payload: any) {
    const res = await fetch(`${API_KEY}/api/requests/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
    });
    return res.json();
}

export async function getRequests() {
    const res = await fetch(`${API_KEY}/api/requests`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    return res.json();
}