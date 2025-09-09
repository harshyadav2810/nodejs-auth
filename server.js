require('dotenv').config()
const express=require('express')
const app=express()
const connected=require('./database/db')


const authroutes=require('./routes/auth-routes')
const homeroutes=require('./routes/home')
const adminroutes=require('./routes/admin')
const imageroutes=require('./routes/image-routes')

//connect to database
connected()

const port=process.env.PORT||3000

//midddleware

app.use(express.json())

app.use('/api/auth',authroutes)
app.use('/api/home',homeroutes)
app.use('/api/admin',adminroutes)
app.use('/api/image',imageroutes)


app.listen(port,()=>{
    console.log(`app is listening to the port ${port}`)
})
