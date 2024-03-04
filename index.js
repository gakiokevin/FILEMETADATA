const  express = require('express')
const cors = require('cors')
const multer =  require('multer')
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT  =  process.env.PORT || 3000

const app = express()

app.set('view engine','pug')
app.set('views','views')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer()

app.get('/',(req,res)=>{
  return res.render('index.pug')
})


app.post('api/fileanalyse',upload.single('upfile'),uploadFile)



function uploadFile(req,res,){
try {
   const file = req.file
  if(!file){
     return res.status(400).json({ error: 'No file uploaded.' });
  }


   const fileSize = file.size
   const fileType = file.mimetype
   const fileName = file.originalname
    

   return res.json({name:fileName,type:fileType,size:fileSize})  
}catch(error){
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal server error.' });
}
  
}



app.listen(PORT,()=>console.log('server has started'))
