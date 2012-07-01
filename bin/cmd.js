#!/usr/bin/env node
var tea = require('../');
var temp = process.argv[2] || 'hot';
if ([ 'hot', 'cold' ].indexOf(temp) < 0) {
    return console.error('impossible temperature');
}
tea[temp]().pipe(process.stdout);
