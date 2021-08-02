const http = require('http');
const url = require('url');
const prom = require('prom-client');

const register = new prom.Registry();
register.setDefaultLabels({ serviceName: 'app' });
prom.collectDefaultMetrics({ register })

const httpRequestDuration = new prom.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] 
})

register.registerMetric(httpRequestDuration)

const collect = async (req, res) => {
  // return an error 1% of the time
  if ((Math.floor(Math.random() * 100)) === 0) {
    throw new Error('Error');
  }

  // delay for 3-6 seconds
  const delaySeconds = Math.floor(Math.random() * (6 - 3)) + 3;
  await new Promise(res => setTimeout(res, delaySeconds * 1000));

  res.end('ok');
}

const server = http.createServer(async (req, res) => {
  const end = httpRequestDuration.startTimer();
  const route = url.parse(req.url).pathname;

  try {
    if (route === '/metrics') {
      res.setHeader('Content-Type', register.contentType);
      res.end(register.metrics());
    }

    if (route === '/collect') {
      await collect(req, res);
    }

  } catch (error) {
    res.writeHead(500).end();
  }

  if (!res.finished) {
    res.writeHead(404).end();
  }

  end({ route, code: res.statusCode, method: req.method });
})

server.listen(8080, () => {
  console.log('Running on http://localhost:8080');
})

