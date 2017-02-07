
var page = require('webpage').create();
var login = 'http://www.whenisgood.net/Login';
var home = 'http://whenisgood.net/35rxcyk/results/jger2xs';
var conf = require('./conf.json')

page.open(login, function (status) {
    if (status !== 'success') {
        console.log('fail!');
        console.log(status);
        phantom.exit(1);
    } else {
        page.evaluate(function(){
            $("input[name=loginEmail]").val(conf['email']) ;
            $("input[name=password]").val(conf['password']) ;
            $("input[type=submit]").click() ;
        });
        setTimeout(function(){
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
