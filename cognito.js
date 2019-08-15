const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');
global.fetch = require('node-fetch');

const poolData = {
  UserPoolId: 'eu-west-1_yjGXnhzqH', // Your user pool id here
  ClientId: '372d79u1e93kpv9ffoqn73dmtj' // Your client id here
};

const pool_region = 'eu-west-1';

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = userPool;
