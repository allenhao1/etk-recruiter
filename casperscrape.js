var casper = require('casper').create({
  clientScripts: ["node_modules/jquery/src/jquery.js"]
});
// Get contents of conf
var conf = require('conf.json');
require('utils').dump(conf);

casper.start('http://www.whenisgood.net/Login', function() {

    this.echo(this.getTitle());
    //Log into the page
    this.fillSelectors("body > div.textContent > form",
      {"input[name='loginEmail']": conf['email'], "input[name='loginPassword']" : conf['password']}, true);
});
casper.then(function () {
    this.capture('example.png');
});

casper.run();
