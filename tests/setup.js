// Inicializa o servidor só se ele ainda não estiver rodando, evitando EADDRINUSE
// e garantindo que os testes com baseUrl funcionem mesmo se você já deu `npm start`.
require('dotenv').config();

const net = require('net');

function checkPortInUse(port, cb) {
	const client = new net.Socket();
	client.setTimeout(1000);
	client.once('connect', () => { client.destroy(); cb(true); });
	client.once('timeout', () => { client.destroy(); cb(false); });
	client.once('error', () => { cb(false); });
	try {
		client.connect(port, '127.0.0.1');
	} catch (_) {
		cb(false);
	}
}

before(function(done) {
	this.timeout(15000);
	const port = Number(process.env.PORT || 3000);

	checkPortInUse(port, (alive) => {
		if (alive) return done();

		// Não está rodando: inicia o servidor programaticamente via app.listen
		process.env.PORT = String(port);
		const app = require('../src/app');
		const server = app.listen(port, () => {
			done();
		});
		server.on('error', (err) => {
			// Se ainda assim houver EADDRINUSE, apenas siga em frente para não quebrar a suíte
			if (err && err.code === 'EADDRINUSE') return done();
			done(err);
		});
	});
});
