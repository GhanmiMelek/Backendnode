const pool = require ("../database/index")
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt')
const validator = require('validator');

// Define a function to check if an email is valid
function validateEmail(email) {
  return validator.isEmail(email);
}
const authController = {
    
    register: async (req, res) =>{
        try{
            const {username, email, password, Age} = req.body
            if (!validateEmail(email)) {
                return res.json({ error: 'Invalid email!' });
              }
            const [user] = await pool.query("select * from users where email = ?", [email]);
            if (user [0]) return res.json ({error: "Email already exists"})

            const hash = await bcrypt.hash(password, 10)
            const Role = 'USER'
            const sql = "insert into users(username, email, password,Age,Role) values(?,?,?,?,?)"
            const [rows, fields] =await pool.query(sql, [username, email, hash, Age,Role])

           if (rows.affectedRows){
            const [user] = await pool.query("select * from users where email = ?", [email])
            if (!user[0]) return res.json({ error: "Invalid email!" })
            
            const {id} = user[0]

            const accessToken = jwt.sign({ userId: id }, '3812932sjad34&*@', { expiresIn: '1h' });
                return res.json({ 
                    accessToken,
                    data: { 
                        userId: id,
                        email,
                        username,
                        Age,
                        Role
                    },
                    message:  "ok"
                 })
           }else{
            return res.json ({error: "Error"})    
           } 
        } catch (error){
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    registerAdmin: async (req, res) =>{
        try{
            const {username, email, password} = req.body
            if (!validateEmail(email)) {
                return res.json({ error: 'Invalid email!' });
              }
            const [user] = await pool.query("select * from users where email = ?", [email]);
            if (user [0]) return res.json ({error: "Email already exists"})

            const hash = await bcrypt.hash(password, 10)
            const Role = 'ADMIN'
            const sql = "insert into users(username, email, password,Role) values(?,?,?,?)"
            const [rows, fields] =await pool.query(sql, [username, email, hash, Role])

           if (rows.affectedRows){
            const [user] = await pool.query("select * from users where email = ?", [email])
            if (!user[0]) return res.json({ error: "Invalid email!" })
            
            const {id} = user[0]

            const accessToken = jwt.sign({ userId: id }, '3812932sjad34&*@', { expiresIn: '1h' });
                return res.json({ 
                    accessToken,
                    data: { 
                        userId: id,
                        email,
                        username,
                        Role
                    },
                    message:  "ok"
                 })
           }else{
            return res.json ({error: "Error"})    
           } 
        } catch (error){
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    login: async (req, res) => {
        try {
            const {email, password } = req.body
            if (!validator.isEmail(email)) {
                return res.json({ error: 'Invalid email format!' });
              }
            const [user] = await pool.query("select * from users where email = ?", [email])
            if (!user[0]) return res.json({ error: "Invalid email!" })
            
            const { password: hash, id, username , Role} = user[0]

            const check = await bcrypt.compare(password, hash)

            if (check) {
                const accessToken = jwt.sign({ userId: id }, '3812932sjad34&*@', { expiresIn: '1h' });
                return res.json({ 
                    accessToken,
                    data: { 
                        userId: id,
                        email,
                        username,
                        Role
                    }
                 })

            }

            return res.json({ error: "Wrong password!" })
            
        } catch (error) {
            console.log(error)
            res.json({
                error: error.message
            })
        }
    },
    verifyemail: async (req, res) => {
        try {
          const email = req.query.email;
          const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      
          if (user[0]) {
            return res.json({ exists: true });
          } else {
            return res.json({ exists: false });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      },
    logout: (req, res) => {
        try {
            // delete the access token from the client side (for example, from cookies or local storage)
            res.clearCookie('accessToken'); // for cookies
            // res.locals.accessToken = null; // for local storage
    
            return res.status(200).json({
                message: 'Logout successful'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                error: error.message
            });
        }
    },
}
    
      
      
    

module.exports = authController

