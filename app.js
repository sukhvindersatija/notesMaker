const express = require('express')
// const {spawn} = require('child_process');
const app = express()
var bodyParser = require('body-parser');

const port = 3000
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));
app.get('/',(req,res,next)=>{
  res.render('index.ejs')
});
let {PythonShell}=require('python-shell')
app.post('/',(req,res,next)=>{
  const data1=req.body.data;
  console.log(data1);
  let options={
    args:[data1]
  }
  PythonShell.run('model.py',options,(err,result)=>{
    if(err){
      console.log(err);
    }
    if(result){
      console.log(result);
      res.render('summary.ejs',{
        data1:result
      });
    }
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
