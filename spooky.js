var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('conf.json', 'utf8'));

try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

var spooky = new Spooky({
        child: {
            transport: 'http'
        },
        casper: {
            logLevel: 'debug',
            verbose: true
        }
    }, function (err) {
        if (err) {
            e = new Error('Failed to initialize SpookyJS');
            e.details = err;
            throw e;
        }
        var code = '2xdzp5k';
        var id = 'igjq25h';
        spooky.start('http://www.whenisgood.net/Login', function() {
          this.echo(this.getTitle());
        });
        spooky.then([{conf:conf}, function() {
          //Log into the page
          this.fillSelectors("body > div.textContent > form",
            {"input[name='loginEmail']": conf['email'], "input[name='loginPassword']" : conf['password']}, true);
        }]);
        spooky.then(function () {
          this.echo(this.getTitle());
        });
        spooky.thenOpen('http://whenisgood.net/' + id + '/results/' + code, function(){
          this.echo(this.getTitle());
        });
        spooky.then(function () {
          this.capture('example.png');
          var html  = this.getElementInfo('body > script:nth-child(15)').html;
          // this.echo(html)
          // eval(html)
          // this.echo(respondents)

          // this.echo(a)
          // this.echo(this.getElement('body > script:nth-child(15)').html);
          // var a = this.getHTML();


        });
        spooky.run();

    });

spooky.on('error', function (e, stack) {
      console.error(e);

    if (stack) {
        console.log(stack);
    }
});

/*
// Uncomment this block to see all of the things Casper has to say.
// There are a lot.
// He has opinions.
spooky.on('console', function (line) {
    console.log(line);
});
*/

spooky.on('hello', function (greeting) {
    console.log(greeting);
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});
