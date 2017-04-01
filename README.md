Higher-order functions for zeit/micro
=====================================

 - `compose()` - because it should be a part of es6 right
 - `respondToLivenessProbe` - to respond to k8s liveness probe with `{"healthy": true}`
 - `parseJSONInput` - puts input json on `req.json`

Example:

```js
const cmd = input => ({
  hello: input.world
})

module.exports = compose(
  respondToLivenessProbe,
  parseJSONInput,
  process.env.NODE_ENV !== 'production' && visualize
)(async req => cmd(req.json))
```

`curl localhost:3000` -> returns `{"healthy": true}`
`curl -XPOST -d'{"world": "world!"}' http://localhost:3000` -> returns `{"hello": "world!"}`
