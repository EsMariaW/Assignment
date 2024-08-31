const fs = require('fs');

module.exports = function(req,res){
    let username = req.body.username;
    let password = req.body.password;


    fs.readFile("./data/data.json","utf8", function(err,data){
        if (err) throw err;

        // if no err
        let allData = JSON.parse(data);
        let allUsers = allData.users;
        let index = allUsers.findIndex(user=>
            user.username == "abby"
        );
        console.log(allData.users[index]);

        if (index != -1){      // i.e. if matches valid user
            // send all details
            res.send(data);
            console.log(data);
        } else {
            res.send(false);
        }
    })
};