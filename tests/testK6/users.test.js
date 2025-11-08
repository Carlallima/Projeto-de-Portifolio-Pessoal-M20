import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const res = http.get('http://localhost:3000/api/users', {
    headers: { Authorization: `Bearer ${__ENV.TEST_TOKEN}`,
    'content-type': 'application/json'
},
  });

  check(res, {
    'status é 200': (r) => r.status === 200,
    'retorna lista de usuários': (r) => Array.isArray(r.json()),
  });

  sleep(1);
}
