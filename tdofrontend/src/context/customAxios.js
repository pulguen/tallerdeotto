//customAxios.js
import axios from 'axios';

// helper para CSRF
function getCsrfToken() {
  const m = document.cookie.match(/csrftoken=([^;]+)/);
  return m ? m[1] : null;
}

const instance = axios.create({
  baseURL: '/api/',
  withCredentials: true,
});

instance.interceptors.request.use(config => {
  // inyecta JWT
  if (!config.skipAuth && window.accessToken) {
    config.headers.Authorization = `Bearer ${window.accessToken}`;
  }
  // inyecta CSRF
  const csrf = getCsrfToken();
  if (csrf) {
    config.headers['X-CSRFToken'] = csrf;
  }
  return config;
});

export default instance;