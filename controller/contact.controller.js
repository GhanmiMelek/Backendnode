const express = require('express');
const bodyParser = require('body-parser');
const pool = require ("../database/index")
const router = express.Router();
const jsonParser = bodyParser.json();

const contactController = {
    submitMessage: async(req, res) => {
      const username = req.body.username;
      const email = req.body.email;
      const number = req.body.number;
      const subject = req.body.subject;
      const message = req.body.message;
  
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
    }
  };
  
  
  module.exports = contactController;
  