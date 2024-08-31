const fs = require('fs');

module.exports = function(req,res){
    let username = req.body.username;

    fs.readFile("./data/data.json","utf8", function(err,data){
        if (err) throw err;

        // if no err
        let allData = JSON.parse(data);
        let allUsers = allData.users;   // is an array
        let allGroups = allData.groups;
        let allChannels = allData.channels;
        console.log("original:");
        console.log(allData);
        let indexOldUser = allUsers.findIndex(user => user.username === username);
        let oldUserInfo = allUsers[indexOldUser];
        let oldUserGroups = oldUserInfo.groups;
        for (group in allGroups){   // 
            if (not (oldUserGroups.include(groupID))){
                
            }

        }
        
        let newUserList = allData.splice(indexOldUser,1);
        allData.users = newUserList;
        console.log("altered:");
        console.log(allData)

        fs.writeFile("./data/data.json",allData, function(err){});
        res.send({"done":true})
    })
};