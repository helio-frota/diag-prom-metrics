const fsPromises = require('fs').promises;

const crypto = require('crypto');

const express = require('express');

// Collecting the default metrics recommended by Prometheus
// https://prometheus.io/docs/instrumenting/writing_clientlibs/#standard-and-runtime-collectors
const client = require('prom-client');

// This helps/allows the client to extract extra information
// from the server. (memory usage, cpu, etc)
const collectDefaultMetrics = client.collectDefaultMetrics;

// Probe for every Nth second.
collectDefaultMetrics({ timeout: 1000 });

const app = express();

let suffix = 0;

app.get('/c_sync', (_, res) => {
  crypto.pbkdf2Sync('secret', 'salt', 5000, 512, 'sha512');
  res.send('ok');
});

app.get('/c_async', (_, res) => {
  crypto.pbkdf2('secret', 'salt', 5000, 512, 'sha512', _ => {});
  res.send('ok');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  suffix++;
  await fsPromises.writeFile(`metrics_${req.query.test}_${suffix}.txt`, metrics);
  res.end(metrics);
});

app.listen(8080, () => console.log(`listening on port 8080`));
