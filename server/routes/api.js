const express = require('express');
const router = express.Router();
var sql = require("mssql");

// declare axios for making http requests
var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');

//Initiallising connection string
var dbConfig = {
    user: "portaluser",
    password: "MerckApp1@",
    server: "localhost",
    database: "moviedb"
};



//Function to connect to database and execute query
var executeQuery = function (res, query) {
    sql.connect(dbConfig, (err) => {
        if (err) {
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            console.log("Successfuly Connected to the Database :- ");
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, rs) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(err);
                    sql.close();
                }
                else {
                    console.log("Response Sent Successfuly- ");
                    res.send(rs);
                    sql.close();
                }
            });
        }
    });
}


var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
        }
        else {
            callback(null, html);
        }
    });
};

// Get all posts
router.post('/UserCreationEmail', (req, res) => {
    let temp = req.body;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sairamreddy.ponnala@gmail.com',
            pass: 'Sram@225',
            ssl: true
        }
    });

    readHTMLFile(__dirname + '/UserAccountCreationConfirmation.html', function (err, html) {
        var template = handlebars.compile(html);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var replacements = {
          username: temp.username,
          password:temp.password,
          Date: dateTime
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'sairamreddy.ponnala@gmail',
            to: temp.email,
            subject: 'Your Account Has Been Created..!',
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.send(info.response);
            }
        });
    });
});

// Get all posts
router.post('/ProjectCreationEmail', (req, res) => {
    let temp = req.body;
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sairamreddy.ponnala@gmail',
            pass: 'Sram@225',
            ssl: true
        }
    });

    readHTMLFile(__dirname + '/StroyCreationConfirmationMail.html', function (err, html) {
        var template = handlebars.compile(html);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        var replacements = {
            username: temp.username,
            storyName: temp.storyName,
            storyDetails: temp.storyDetails,
            Date: dateTime
        };
        var htmlToSend = template(replacements);

        var mailOptions = {
            from: 'sairamreddy.ponnala@gmail',
            to: temp.Name,
            subject: temp.Sub,
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.send(info.response);
            }
        });
    });
});


//GET API
router.get("/user", (req, res) => {
  console.log("Inside the Get users Request");
    var query = "select * from [user]";
    executeQuery(res, query);
});

//POST API
router.post("/user", (req, res) => {
    console.log("Response", res.body);
    let username = req.body.UserName;
    let password = req.body.Password;
    let email = req.body.Email;
    let role = req.body.Role;
    let mobilenumber = req.body.MobileNumber;
    var query = "INSERT INTO [user] ( ID, UserName, Password, Email, MobileNumber, Role) VALUES (  '1' ," + "'" + username + "'" + ",  " + "'" + password + "'" + ", " + "'" + email + "'" + ", " + "'" + mobilenumber + "'" + ", " + "'" + role + "'"+ ")";
    executeQuery(res, query);
});



module.exports = router;