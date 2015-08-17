// =========================================
// Server dependencies
// =========================================

var app = require('express.io')();
var path = require('path');
var fs = require('fs');
var express = require('express');


// =========================================
// Global variables
// =========================================


// =========================================
// Server initiation
// =========================================

app.http();
app.use(express.static(__dirname + '/public')); // This grants the users access to all data within the /public folder


app.get('/', function(req, res) {
  res.render('/public/index.html');
});


// =========================================
// Server start
// =========================================

app.listen(80);
console.log('#SERVER STARTED');