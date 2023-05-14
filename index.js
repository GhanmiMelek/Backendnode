const express = require ("express")
const app = express()
const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4200' }));

require('dotenv').config()


app.use(express.urlencoded({extended: false}))
app.use(express.json())

const usersRouter = require('./routes/users.router')
const authRouter = require('./routes/auth.router')
const contactRouter = require('./routes/contact.router');
const profileRouter = require('./routes/profile.router');

app.use('/api/cnrps/upload', express.static('upload/images'));
app.use("/api/cnrps/users", usersRouter)
app.use("/api/cnrps/auth", authRouter)
app.use("/api/cnrps/contact", contactRouter)
app.use("/api/cnrps/profile", profileRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, () =>{

    console.log("Server is running.....")

})