const { json } = require('micro')

const compose = (...fns) => fns.reduce((f, g) => (...args) =>
  // Allow falsey functions to be passed in, by passing over them
  g ? f(g(...args)) : f(...args),
  // Set initial value with blank HOF, so "f" above is always truthy on first iteration
  fn => async (...args) => fn(...args)
)

const respondToLivenessProbe = fn => async (req, ...args) => {
  if (req.method == 'GET' && req.url == '/') return { healthy: true }
  return fn(req, ...args)
}

const parseJSONInput = fn => async (req, ...args) => {
  if (req.headers['content-type'] === 'application/json') req.json = await json(req)
  return fn(req, ...args)
}

module.exports = { compose, respondToLivenessProbe, parseJSONInput }
