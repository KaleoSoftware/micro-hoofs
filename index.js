const { json } = require('micro')

const compose = (...fns) => fns.reduce((f, g) => (...args) =>
  // Allow falsey functions to be passed in, by passing over them
  g ? f(g(...args)) : f(...args),
  // Set initial value with blank HOF, so "f" above is always truthy on first iteration
  fn => async (req, res) => fn(req, res)
)

const respondToLivenessProbe = fn => async (req, res) => {
  if (req.method == 'GET' && req.url == '/') return { healthy: true }
  return fn(req, res)
}

const parseJSONInput = fn => async (req, res) => {
  if (req.headers['content-type'] === 'application/json') req.json = await json(req)
  return fn(req, res)
}

module.exports = { compose, respondToLivenessProbe, parseJSONInput }
