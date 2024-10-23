
const promClient = require('prom-client');

// Create a new Registry

const register = promClient.Registry.globalRegistry;

// Enable default system metrics collection
promClient.collectDefaultMetrics({ register });

// HTTP request counter metric for http
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [register]
});

// Function to handle counting requests
function countHttpRequest(req, res) {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.originalUrl,
      status: res.statusCode
    });
  });
}

// Route for Prometheus metrics
async function getMetrics(req, res) {
  res.set('Content-Type', register.contentType);
  res.send(await register.metrics());
}

module.exports = { countHttpRequest, getMetrics };
