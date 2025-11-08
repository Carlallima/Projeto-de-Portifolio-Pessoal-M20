import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  const url = 'http://localhost:3000/auth/login';
  const payload = JSON.stringify({
    email: 'usuario@mail.com',
    password: '654321'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const res = http.post('http://localhost:3000/api/auth/login', payload, params);

  check(res, {
    'status é 401': (r) => r.status === 401,
    'retorna mensagem de erro': (r) => r.json('message') !== 'Credenciais inválidas'
  });
}
