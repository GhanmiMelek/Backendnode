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
      emailSenderFunction(message,"ghanmimelek72@gmail.com")
  
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
    }
}


function emailSenderFunction(message,target){
  const transporter = nodemailer.createTransport({
    port: 465,               
    host: "smtp.gmail.com",
      auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
         }
        ,
    secure: true,
    });


  const mailData = {
    from: 'info.CNRPS@gmail.com',  
      to: target,   
      subject: 'CNRPS',
      text: 'CNRPS USERS',
      html:"<h4>Cet utilisateur a un problème. </h4><br><h3> CNRPS : "+message+"</h3>"
    };


transporter.sendMail(mailData, function (err, info) {
if(err)
    console.log(err)
else
    console.log(info);
});
}
  
  
  module.exports = contactController;
  