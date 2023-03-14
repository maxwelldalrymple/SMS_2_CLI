const http = require('http'); // for setting up loacal server
const express = require('express'); // for interacting with local server (GET & POST requests)
const cli_lib = require("./tools/cli"); // for saving cli outputs
const MessagingResponse = require('twilio').twiml.MessagingResponse; // for sending autmated messages back 
const app = express(); 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

verfication_id_pin = "YOUR_PIN" // verifcation pin to access built-in database features
username = "YOUR_USERNAME" // username stored in database
password = "YOUR_PASSWORD" // password stored in database

let verifu_ = false // verify user boolean
let verifp_ = false // verify password boolean
let verified = false // verify user and password match boolean


app.post('/sms', (req, res) => { // post request sent @'/sms' using request and responce
    
    const twiml = new MessagingResponse();
    input = req.body.Body
    if (verified == true){// if username and password match
      output = cli_lib.cli_output(input) // every sms is now a cli input and returns exactly what the cli ouputs
      twiml.message(output);
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
    if (verifp_ == true){// if sms matches valid password, return "Terminal Mode: Activated" else return "invalid password"
      if (input == password){
        twiml.message("Password Identified");
        twiml.message("SignIn succsessfull")
        twiml.message("Terminal Mode: Activated")
        twiml.message("Terminal commands may now be executated")
        output = cli_lib.cli_output("pwd") // show the starting location path
        location = "Location: " + output 
        twiml.message(location)
        verified = true
      } else{
        twiml.message("Invalid Password");
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
    if (verifu_ == true){ // if sms matches valid username, return "password?" else return "invalid username"
      if (input == username){
        twiml.message("Username Identified");
        twiml.message("What is your password?");
        verifp_ = true
      } else{
        twiml.message("Invalid Username");
      }
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
    if (input == verfication_id_pin){ // if sms matches verfication pin, return "username?"
      twiml.message("Key Identified");
      verifu_ = true
      twiml.message("What is your username?");
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    } 
    if (input != verfication_id_pin) { // if sms does not matche verfication pin, return "Sign In Required"
      twiml.message("Sign In Required");
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString());
    }
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    
});

http.createServer(app).listen(8080, () => {
    console.log('Express server listening on port 1304');
  });