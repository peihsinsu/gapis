var googleapis = require('googleapis')
  , log = require('nodeutil').logger.getInstance('gservice')
	, _ = require('underscore')

exports.doit = doit;
function doit(prj, scopes, srv, ver, func, paramObj, bodyObj) {
	var jwt = new googleapis.auth.JWT(
    '860835453338-81ummpns1okt1s99mohaceafv844ukpp@developer.gserviceaccount.com',
    '/Users/simonsu/project/.google/mitac-cp300/demo-io/key.pem',
    null,
    scopes);
  log.trace('request api use scopes:', JSON.stringify(scopes));
	log.trace('do api call:%s, %s, %s, %s, %s, %s',prj, srv, ver, func, 
			JSON.stringify(paramObj), JSON.stringify(bodyObj));
	jwt.authorize(function(err, tokens) {
		if(err) {
			log.error(err);
			return;
		}
		var param= {};//projectId: prj};
		if(paramObj) {
      param = _.extend(param, paramObj);
		}
		log.trace('Request parameters: ', param);
		var farr = func.split('.');

		googleapis.discover(srv, ver).execute(function(e,client) {
			if(e)
				console.log(e);
			else {
				log.trace('will do api: ', farr.join('.'));
				if(farr && farr.length == 3) {
					var fn = client[farr[0]][farr[1]][farr[2]];
					if(!fn)
						log.error('Got function error, fn=' + fn);
					else
						fn(param, bodyObj).withAuthClient(jwt).execute(function(err, response) {
							if(err) log.error('API request got error:', err);
							//Standard output the message
							console.log(JSON.stringify(response));
						});
				} else
					log.error('function (%s) not correct...', farr.join('.'));
			}
		});
	});
}

