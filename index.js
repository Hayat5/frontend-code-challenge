
var request = require('request');
const http = require('http');
var fs = require('fs');
var jsonStr = '{"results":[]}';
var write_res = false;

const MAX_USERS = 10;

let getNextUser = function (i) {
    if (i === MAX_USERS) {
        //limit 10 users
        console.log(`MAX REACHED ${MAX_USERS}`);
        write_res = true;


        return;
    } else {

        request('https://randomuser.me/api', function (err, response, body) {
            if (!err) {
                //parse json body
                let jsonResp = JSON.parse(body).results[0];
                var name = jsonResp.name.first + " " + jsonResp.name.last;
                var gender = jsonResp.gender;
                var street = jsonResp.location.street;
                var desc = jsonResp.location.timezone.description;
                var image = jsonResp.picture.large;
                var postcode = jsonResp.location.postcode;


                var obj = JSON.parse(jsonStr);
                // add new object
                obj['results'].push({key: Math.random(),
                    name: name,
                    gender: gender,
                    street: street,
                    desc: desc,
                    image: image,
                    postcode: postcode
                });
                jsonStr = JSON.stringify(obj);

            }
            getNextUser(i + 1);
        });
    }
}

const server = http.createServer((req, res) => {


    getNextUser(0);
    if (write_res) {

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(jsonStr);

        res.end();
    }



});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
server.listen(8000, () =>
        {

            console.log('server started');
        });
console.log('index finished');