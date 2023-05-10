const express = require ("express")
const app = express()
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4200' }));

require('dotenv').config()


app.use(express.urlencoded({extended: false}))
app.use(express.json())

const usersRouter = require('./routes/users.router')
const authRouter = require('./routes/auth.router')
const profileRouter = require('./routes/profile.router')
const contactRouter = require('./routes/contact.router');


app.use('/upload', express.static('upload/images'));
app.use("/api/cnrps/users", usersRouter)
app.use("/api/cnrps/auth", authRouter)
app.use("/api/cnrps/profile", profileRouter)
app.use("/api/cnrps/contact", contactRouter)



const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{

    console.log("Server running.....")

})