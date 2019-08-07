const userPool = require('../cognito.js');
const AWS = require('aws-sdk');
const request = require('request');
const jwkToPem = require('jwk-to-pem');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
  function RegisterUser(name, email, password, admin){
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"name",Value: name}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"email",Value: email}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"admin",Value: admin}));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({Name:"date",Value: new.Date()}));
  
    userPool.signUp(email, password, attributeList, null, function(err, result){
        if (err) {
            console.log(err);
            return;
        }
        cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
  }
  const {name, username, password, admin } = req.body;
  RegisterUser(name, username, password, admin)
});