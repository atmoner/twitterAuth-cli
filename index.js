var prompt = require('prompt');
var twitterAPI = require('node-twitter-api');
var twitter = new twitterAPI({
    consumerKey: '****************',
    consumerSecret: '****************',
    callback: 'oob'
});

var token = "";
var tokenSecret = "";

prompt.start();
 
twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log(error);
    } else {

		token = requestToken;
		tokenSecret = requestTokenSecret;
		//console.log(token,tokenSecret);
		console.log("Please use this links: https://twitter.com/oauth/authenticate?oauth_token="+token);
		prompt.get(['code'], function (err, result) {
			//console.log('Command-line input received:');
			//console.log('  code: ' + result.code);
			twitter.getAccessToken(token, tokenSecret, result.code, function(error, accessToken, accessTokenSecret, results) {
				if (error) {
					console.log(error);
				} else {
					console.log('Final result:');
					console.log('	Username: '+results.screen_name);
					console.log('	accessToken: '+accessToken);
					console.log('	accessTokenSecret: '+accessTokenSecret);
				}
			});

		});
    }
}); 
 
