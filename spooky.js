var fs = require('fs');
var conf = JSON.parse(fs.readFileSync('conf.json', 'utf8'));
var $ = require('jquery');
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
    table = this.getElementInfo('#grid').html;
    script  = this.getElementInfo('body > script:nth-child(15)').html;
    this.emit('hello', "chec");
    this.emit('eval', [table, script]);

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
function getTableData(table) {
  var timeRef = {};
  debugger
  $(table).each(function () {
    $('td', this).each(function () {
      var text = $(this).text().trim();
      var id = $(this).attr('id');
      if (text != "" && id != undefined && id != false ) {
          console.log(id);
          console.log(text);
          timeRef[id] = text;
      }
    });
  });
  console.log(timeRef);
  return timeRef;
}




spooky.on('eval', function(html){
  console.log("hello")
  var table = html[0];
  var tableRef = getTableData(table)
  console.log("hello2")
  // debugger
  var script = html[1];
  var unwanted  = /disableSelection.+;|paintCanDos\(\);|mySlider\(\);/g // Contains inaccessible functions
  script = script.replace(unwanted, " ")

  eval(script);
  var applicants = {};
  // for (var i in respondents) {
  //   var responder = respondents[i];
  //   applicants[responder.name] = responder.myCanDos
  //   // Add all mycandos to a set
  //   // Then find results using regex?
  // }
  console.log(applicants)
  //TODO reconcile candos with actual times



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
