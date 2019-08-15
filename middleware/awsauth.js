const jwt = require('jsonwebtoken');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
global.fetch = require('node-fetch');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  function ValidateToken(AWStoken) {
    request(
      {
        url: `https://cognito-idp.${pool_region}.amazonaws.com/${
          poolData.UserPoolId
        }/.well-known/jwks.json`,
        json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode === 200) {
          pems = {};
          var keys = body['keys'];
          for (var i = 0; i < keys.length; i++) {
            //Convert each key to PEM
            var key_id = keys[i].kid;
            var modulus = keys[i].n;
            var exponent = keys[i].e;
            var key_type = keys[i].kty;
            var jwk = { kty: key_type, n: modulus, e: exponent };
            var pem = jwkToPem(jwk);
            pems[key_id] = pem;
          }
          //validate the token
          var decodedJwt = jwt.decode(AWStoken, { complete: true });
          if (!decodedJwt) {
            console.log('Not a valid JWT token');
            return;
          }

          var kid = decodedJwt.header.kid;
          var pem = pems[kid];
          if (!pem) {
            console.log('Invalid token');
            return;
          }

          jwt.verify(AWStoken, pem, function(err, payload) {
            if (err) {
              console.log('Invalid Token.');
            } else {
              console.log('Valid Token.');
              console.log(payload);
            }
          });
        } else {
          console.log('Error! Unable to download JWKs');
        }
      }
    );
  }

  if (!token) {
    return res.status(401).json({ msg: 'Access denied, no token' });
  }

  // Verifying token
  ValidateToken(token);
};
