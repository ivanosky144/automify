import API_KEY, { getAuthHeaders } from ".";

export async function loginUser(payload: any) {
    return fetch(`${API_KEY}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((res) => res.json());
}

export async function registerUser(payload: any) {
    return fetch(`${API_KEY}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((res) => res.json());
}

export async function getUserDetail(id: number) {
    const res = await fetch(`${API_KEY}/api/users/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    return res.json();
}

export async function searchUsers() {
    const res = await fetch(`${API_KEY}/api/users`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    return res.json();
}

export async function updateUser(id: number, payload: any) {
    const res = await fetch(`${API_KEY}/api/user/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
    });
    return res.json();
}

export async function getUsers() {
    const res = await fetch(`${API_KEY}/api/users`, {
        method: 'GET',
        headers: getAuthHeaders(),
    });
    return res.json();
}