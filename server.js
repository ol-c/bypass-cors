var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {
  var url_parts = url.parse(request.url);
  var external_request_url = url_parts.path.slice(1);

  //  ensure http protocol present
  var prefix = "http://";
  if (external_request_url.slice(0, prefix.length) !== prefix) {
    external_request_url = prefix + external_request_url;
  }

  //  make external request and pipe to response
  http.get(external_request_url, function (external_response) {

    external_response.on("data", function (data) {
      response.write(data);
    });

    external_response.on("end", function (data) {
      response.end();
    });
  }).on("error", function (error) {
    response.end(error.toString());
  });
});

server.listen(80);
