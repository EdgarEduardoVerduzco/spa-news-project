const BASE_URL = ' https://9u7o88z38k.execute-api.us-east-1.amazonaws.com';

async function get(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function put(url: string, data: any) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function post(url: string, data: any) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function postPlainText(url: string, data: any) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain', // Cambiado a text/plain
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export const api = {
  getListNews: (page = 1, pageSize = 8) =>
    get(`${BASE_URL}/getListNews?page=${page}&size=${pageSize}`),
  getNewsById: (id: string) => get(`${BASE_URL}/news/${id}`),
  getUsers: () => get(`${BASE_URL}/users`),
  getUserById: (id: string) => get(`${BASE_URL}/users/${id}`),
  updateUser: (id: string, userData: any) => post(`${BASE_URL}/updateUser/${id}`, userData),
  deactivateUser: (id: string) => post(`${BASE_URL}/users/${id}/deactivate`, {}),
  login: (user: string, password: string) => postPlainText(`${BASE_URL}/loginUser`, {user, password}),
};
