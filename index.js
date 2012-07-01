var charm = require('charm');
var fs = require('fs');
var cupData = fs.readFileSync(__dirname + '/cup.txt');

exports.cup = cup;
exports.cold = cup;

function cup (cb) {
    var c = charm();
    var indent = Array(30+1).join(' ');
    process.nextTick(function () {
        c.foreground('white');
        c.write(indent);
        for (var i = 0; i < cupData.length; i++) {
            var s = String.fromCharCode(cupData[i]);
            
            if (s === 'x') {
                c.background('white').write(' ');
                c.display('reset').foreground('white');
            }
            else if (s === '\n') {
                c.write('\n' + indent);
            }
            else c.write(s);
        }
        if (cb) cb();
    });
    return c;
}

exports.hot = function () {
    process.nextTick(function () {
        c.reset();
        c.down(14);
    });
    var cupRows = cupData.toString().split('\n').length;
    var particles = [];
    
    var c = cup(function () {
        setInterval(function () {
            particles.push([ 30 + 3 + Math.random() * 22, 14, '.' ]);
            
            if (Math.random() > 0.5) {
                particles.push([ 30 + 3 + Math.random() * 22, 14, '*' ]);
            }
            
            for (var i = 14; i >= 1; i--) {
                c.position(1,i);
                c.erase('line');
                particles.forEach(function (p) {
                    if (Math.floor(p[1]) === i) {
                        c.position(Math.floor(p[0]), i);
                        c.write(p[2]);
                    }
                });
            }
            
            particles.forEach(function (p) {
                p[0] += Math.random() - 0.5;
                p[1] -= 1;
            });
            particles = particles.filter(function (p) {
                return p[1] >= 1 && Math.random() > 0.2;
            });
            
            console.log();
            c.position(1, 1);
        }, 100);
    });
    
    return c;
};
