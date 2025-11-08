import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';



const BASE_URL = 'http://localhost:3000'; 

export default function () {
  const payload = JSON.stringify({
    email: 'usuario@mail.com',
    password: '123456'
  });

  const headers = { 'Content-Type': 'application/json' };

  const res = http.post(`${BASE_URL}/api/auth/login`, payload, { headers });
        
        console.log(' STATUS:', res.status);
        console.log(' RESPOSTA:', res.body);
        
  check(res, {
    'status 200': (r) => r.status === 200,
    'retorna token': (r) => r.json('token') !== undefined,
  });

  sleep(1);
}
