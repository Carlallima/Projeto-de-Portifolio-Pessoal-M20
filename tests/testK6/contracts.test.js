import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '10s',
};

export default function () {
  const res = http.get('http://localhost:3000/api/contracts', {
    headers: { Authorization: `Bearer ${__ENV.TEST_TOKEN}`,
    'content-type': 'application/json'
},
  });

  check(res, {
    'status é 200': (r) => r.status === 200,
    'retorna contratos': (r) => Array.isArray(r.json()),
  });
  

  sleep(1);
}
