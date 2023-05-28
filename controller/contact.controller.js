const express = require('express');
const bodyParser = require('body-parser');
const pool = require ("../database/index")
const router = express.Router();
const jsonParser = bodyParser.json();
const nodemailer = require('nodemailer');

const contactController = {
    submitMessage: async(req, res) => {
      const username = req.body.username;
      const email = req.body.email;
      const number = req.body.number;
      const subject = req.body.subject;
      const message = req.body.message;
      emailSenderFunction(username, email, message,"cnrps.adm@gmail.com");
  
      // insert the message into the contacts table
      const sql = `INSERT INTO contacts (username, email,number, subject, message) VALUES (?, ?, ?, ? , ?)`;
      try {
        const [rows, fields] = await pool.query(sql, [username, email,number, subject, message]);
        console.log('Message saved to database with ID: ' + rows.insertId);
  
        // Here you can implement code to send an email to the admin
        // notifying them of the new message.
  
        return res.status(200).send('Message received and saved!');
      } catch (err) {
        console.error('Error saving message to database: ' + err.stack);
        return res.status(500).send('Internal server error');
      }
    },
    getAll: async (req, res) =>{
      try{
          const [rows,fields] = await pool.query("SELECT * FROM contacts ");
          res.json({
              data: rows
          })
      } catch (error){
          console.log(error)
          res.json({
              status: "error"
          })
      }
  },
  delete: async(req, res ) =>{
    try{
        const { id } = req.params
        const [rows, fields] =await pool.query("delete from contacts where id = ?", [id])
         res.json({
            data: rows
         })
        }catch(error){
            console.log(error)
            res.json({
                status: "error"
            })
         }
    }, 
    resolve: async (req, res) => {
      try {
        const { id } = req.params;
        const [rows, fields] = await pool.query("UPDATE contacts SET resolved = 1 WHERE id = ?", [id]);
        res.json({
          data: rows
        });
      } catch (error) {
        console.log(error);
        res.json({
          status: "error"
        });
      }
    }
    
}


function emailSenderFunction(username, email,message,target){
  const transport = nodemailer.createTransport({
    port: 465,               
    host: "smtp.gmail.com",
      auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        
    secure: true,
    });


  const mailData = {
    from: email,  // sender address
      to: target,   
      subject: 'CNRPS',
      text: 'CNRPS USERS',
      html: `<h3>User Details:</h3><br>
            <h4>username: ${username}</h4>
            <h4>email: ${email}</h4>
            <h3>subject:</h3>
            <h4>${message}</h4>`,
      };


transport.sendMail(mailData, function (err, info) {
if(err)
    console.log(err)
else
    console.log(info);
});
}
  
  
  module.exports = contactController;
  