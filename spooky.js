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
        var site = 'http://whenisgood.net/' + id + '/results/' + code;
        spooky.start(site, function() {
          this.emit('hello', this.getTitle());
        });
        spooky.then(function () {
          html  = this.getElementInfo('body > script:nth-child(15)').html;
          this.emit('eval', html);

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
spooky.on('eval', function(text){
  var unwanted  = /disableSelection.+;|paintCanDos\(\);|mySlider\(\);/g // Contains missing functions and space
  console.log(text)
  text = text.replace(unwanted, " ")
  console.log(text)
  console.log(typeof(text))
  debugger
  eval(text)
  for (var i in respondents) {
    console.log(respondents[i]);
  }
  console.log("test")
  // console.log(respondents)
})

spooky.on('hello', function (greeting) {
    console.log(greeting);
});

spooky.on('log', function (log) {
    if (log.space === 'remote') {
        console.log(log.message.replace(/ \- .*/, ''));
    }
});
