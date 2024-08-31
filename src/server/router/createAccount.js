const fs = require('fs');

module.exports = function(req,res){
    let newUser = {
        username: req.body.username,
        email: req.body.email,
        id: req.body.id,
        roles: ["basic"],
        groups: [],
        password: req.body.password,
        valid: true
    }

    fs.readFile("./data/data.json", "utf8", function(err,data){
        if (err) throw err;

        // if no err

        // check whether user already exists
        let allData = JSON.parse(data);
        let allUsers = allData.users;
        let index = allUsers.findIndex(user=>
            user.username == newUser.username
        );

        if (index == -1){      // i.e. if user does not already exist
            allData.users.push(newUser)
            fs.writeFile("./data/data.json", JSON.stringify(allData), function(err){});
            res.send(true);
        } else {    // user already exists
            res.send(false);
        }
    });
};