const express = require('express')
const {spawn} = require('child_process');
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
// app.post('/', (req, res) => {
// const data1=req.body.data;
//  var dataToSend;
//  console.log(data1)
//  // spawn new child process to call the python script
//  const python = spawn('python', ['model.py', data1]);
//  // collect data from script
//  python.stdout.on('data', function (data) {
//   console.log('Pipe data from python script ...');
//   dataToSend = data.toString();
//   console.log(dataToSend);
//  });
//  // in close event we are sure that stream from child process is closed
//  python.on('close', (err,code) => {
//    if(err){
//      console.log(err);
//    }
//  console.log(`child process close all stdio with code ${code}`);
//  // send data to browser
//  console.log(dataToSend);
//  res.send(dataToSend);
//  // res.render('summary.ejs',{
//  //   data1:dataToSend
//  // })
//  });
//
// })
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
