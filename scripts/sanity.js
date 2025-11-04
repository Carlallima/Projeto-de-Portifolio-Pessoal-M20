// Script de sanity para testar a API local (assume node >=18 com fetch)
const base = 'http://localhost:3000';

async function post(path, body, token) {
  const res = await fetch(base + path, {
    method: 'POST',
    headers: Object.assign({'content-type':'application/json'}, token ? { Authorization: 'Bearer ' + token } : {}),
    body: JSON.stringify(body)
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch(e) { data = text; }
  return { status: res.status, data };
}

async function get(path, token) {
  const res = await fetch(base + path, { headers: token ? { Authorization: 'Bearer ' + token } : {} });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch(e) { data = text; }
  return { status: res.status, data };
}

async function run() {
  console.log('Criando consultor...');
  const c1 = await post('/users', { name: 'Consultor A', email: 'consultor@example.com', password: 'senha', role: 'CONSULTOR' });
  console.log('consultor:', c1.status, c1.data);

  console.log('Criando gestor...');
  const g1 = await post('/users', { name: 'Gestor G', email: 'gestor@example.com', password: 'senha', role: 'GESTOR' });
  console.log('gestor:', g1.status, g1.data);

  const consultantId = c1.data && c1.data.id;

  console.log('Logando como gestor...');
  const lg = await post('/auth/login', { email: 'gestor@example.com', password: 'senha' });
  console.log('login gestor:', lg.status, lg.data);
  const gestorToken = lg.data && lg.data.token;

  console.log('Cadastrando contrato como gestor para o consultor...');
  const reg = await post('/contracts', { raw: { contractNumber: 'CT-99999', clientName: 'Empresa Teste' }, consultantId }, gestorToken);
  console.log('registro contrato:', reg.status, reg.data);

  console.log('Pegando notificações como gestor...');
  const nots = await get('/notifications', gestorToken);
  console.log('notificações:', nots.status, nots.data);

  console.log('Logando como consultor...');
  const lc = await post('/auth/login', { email: 'consultor@example.com', password: 'senha' });
  const consToken = lc.data && lc.data.token;
  console.log('login consultor:', lc.status, lc.data);

  console.log('Listando contratos como consultor...');
  const consContracts = await get('/contracts', consToken);
  console.log('contratos consultor:', consContracts.status, consContracts.data);
}

run().catch(e => { console.error('erro no sanity', e); process.exit(1); });
