var casper = require('casper').create({
  clientScripts: ["node_modules/jquery/src/jquery.js"],
  verbose: true //For debugging
});
// Get contents of conf
var conf = require('conf.json');
require('utils').serialize(conf);

require("utils").serialize(casper.cli.args);

var cli = casper.cli;
var code = '2xdzp5k';
var id = 'igjq25h';
if (cli.args.length > 2) {
    casper.echo(args.length)
    casper.echo("Usage: casperjs + casperscrape.js [Survey Number]");
} else if (cli.args.length ==2) {
  // TODO Access CLI args
} else {
  // TODO Default
}

casper.start('http://www.whenisgood.net/Login', function() {
  this.echo(this.getTitle());
  //Log into the page
  this.fillSelectors("body > div.textContent > form",
    {"input[name='loginEmail']": conf['email'], "input[name='loginPassword']" : conf['password']}, true);
});
casper.then(function () {
  this.echo(this.getTitle());
});
casper.thenOpen('http://whenisgood.net/' + id + '/results/' + code, function(){
  this.echo(this.getTitle());
});
casper.then(function () {
  this.capture('example.png');
  casper.echo(this.getHTML());
});



casper.run();
