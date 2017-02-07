
var page = require('webpage').create();
var login = 'http://www.whenisgood.net/Login';
var home = 'http://whenisgood.net/35rxcyk/results/jger2xs';
var fs = require("fs");
var conf = JSON.parse(fs.read("conf.json"));
console.log(conf['email'])
console.log(conf['password'])

page.open(login, function (status) {
    if (status !== 'success') {
        console.log('fail!');
        console.log(status);
        phantom.exit(1);
    } else {
        page.evaluate(function(conf){
          $("input[name=loginEmail]").val(conf['email']) ;
          $("input[name=loginPassword]").val(conf['password']) ;
          $("input[type=submit]").click() ;
        }, conf);
        setTimeout(function(){
          page.render('page.png');
            page.open(home, function(status){
                if (status !== "success") {
                    console.log('fail2');
                    phantom.exit(1);
                    return;
                }
              console.log(page.url);
              page.render('page.png');
              console.log('finished!');
              phantom.exit();
            });
        }, 500);
    }
});
