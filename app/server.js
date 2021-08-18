const fsPromises = require('fs').promises;

const express = require('express');

// Collecting the default metrics recommended by Prometheus
// https://prometheus.io/docs/instrumenting/writing_clientlibs/#standard-and-runtime-collectors
const client = require('prom-client');

// This helps/allows the client to extract extra information
// from the server. (memory usage, cpu, etc)
const collectDefaultMetrics = client.collectDefaultMetrics;

// Probe for every Nth second.
collectDefaultMetrics({ timeout: 1000 });

// [ extra metric ]
const counter = new client.Counter({
  name: 'custom_total_number_processed_requests',
  help: 'Total number of processed requests',
});

// [ extra metric ]
const histogram = new client.Histogram({
  name: 'custom_request_duration_seconds',
  help: 'Duration in seconds',
  buckets: [1, 2, 5, 7, 10],
});

const app = express();

let fileSuffix = 0;

app.get('/', (_, res) => {
  counter.inc();
  res.send('bar');
});

app.get('/extra', (_, res) => {

  const start = new Date();
  const time = 1000;

  setTimeout(() => {
    const end = new Date() - start;
    histogram.observe(end / 1000);
  }, time);

  counter.inc();

  res.send('extra bar');
});

app.get('/metrics', async (_, res) => {
  res.set('Content-Type', client.register.contentType);
  const metrics = await client.register.metrics();
  fileSuffix++;

  (async () => {
    await fsPromises.writeFile(`metrics${fileSuffix}.txt`, metrics);
  })();

  res.end(metrics);
});

app.listen(8080, () => console.log(`listening on port 8080`));
