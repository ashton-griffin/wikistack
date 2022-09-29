const express = require('express');
const morgan = require('morgan');
const {db}= require('./models')
const layout = require('./views/layout')
const path = require('path')

// const html=require('html-template-tag');

const app = express();

app.use(morgan("dev"));

express.static(path.join(__dirname,"public"))

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
  res.redirect('/wiki')
})

app.use('/wiki',require('./routes/wiki'));
app.use('/users',require('./routes/users'))

const init = async ()=>{
  await db.sync({force:true});
  const PORT = 3000
  app.listen(PORT,()=>{
  console.log(`Connected on port ${PORT}`)
})
}

init()


