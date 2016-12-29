var express = require("express");
var url = require("url");
var app = express();

app.get("/api/whoami", function(request, response) {
    var language = parseLanguage(request.headers["accept-language"]);
    var os = parseOs(request.headers["user-agent"]);
    var ip = parseIp(request.connection.remoteAddress);
    var json = {"ipaddress":ip,"language":language[0],"software":os};
    response.status(200).send(JSON.stringify(json));
});


function parseLanguage(language){
    var reg = ".+?(?=,)";
    var lan = language.match(reg);
    return lan;
}

function parseOs(os){
    var reg = /\(.+\s*\d+\s*\)/g;
    var oss = os.split(/[\(\)]/)[1];
    return oss;
}

function parseIp(ip){
    var dsa = ip.split(":");
    return dsa[3];
}

app.listen(process.env.PORT || 5000);
