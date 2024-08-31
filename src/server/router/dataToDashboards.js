const fs = require('fs');

module.exports = function(req,res){
    fs.readFile("./data/data.json", "utf8", function(err,data){
        if (err) throw err;
        res.send(data);

    })
};