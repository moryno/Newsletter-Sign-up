const express = require("express");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                   FNAME: firstName,
                   LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url ="https://us5.api.mailchimp.com/3.0/lists/e265b12a45";
    const options = {
        method: "POST",
        auth: "moryno:93d5981aa664035c91ef640b941c973c-us5"
    }
    const request = https.request(url, options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }
         response.on("data", function(data){
             console.log(JSON.parse(data));
         })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.get("/sign-up", function(req, res){
      res.sendFile(__dirname + "signup.html");
})
app.listen(3000, function(){
    console.log("server is running on port 3000")
})


// api key  93d5981aa664035c91ef640b941c973c-us5

// audience key e265b12a45