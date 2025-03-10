const API_KEY = process.env.NEXT_PUBLIC_API_URL

export function getToken() {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem('token');
    }
}

export function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
}

export default API_KEY;
