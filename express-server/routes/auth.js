const config = require('../config');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

/* To implement a JWT middleware that will ensure the validity of our token.
  it will require each protected route to have a
  valid access_token sent in the Authorization header */
const authCheck = jwt({
  secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${config.auth0Strategy.domain}/.well-known/jwks.json`
    }),
    // This is the identifier we set when we created the API
    audience: config.auth0Strategy.audience,
    issuer: `https://${config.auth0Strategy.domain}/`,
    algorithms: ['RS256']
});
// const checkScopes = jwtAuthz([ 'read:stems' ]);
// const checkScopesAdmin = jwtAuthz([ 'full_access' ]);

module.exports = authCheck;
