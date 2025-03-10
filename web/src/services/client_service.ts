import API_KEY, { getAuthHeaders } from ".";

export async function addClient(payload: any) {
    const res = await fetch(`${API_KEY}/api/clients`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
    });
    return res.json();
}

export async function deleteClient(id: number) {
    const res = await fetch(`${API_KEY}/api/clients/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    return res.json();
}

export async function updateClient(id: number, payload: any) {
    const res = await fetch(`${API_KEY}/api/clients/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
    });
    return res.json();
}

export async function getClients() {
    const res = await fetch(`${API_KEY}/api/posts`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    return res.json();
}