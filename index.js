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

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });
app.get('/',(req,res)=>{
  return res.render('index.pug')
})


app.post('/upload-file',upload.single('file'),uploadFile)



function uploadFile(req,res,){
   const file = req.file

   if(!file){
    return res.json({ error: 'No file uploaded.' });
   }

   const fileSize = file.size
   const fileType = file.mimetype
   const fileName = file.originalname
    

   res.json([fileName,fileType,fileSize])
}



app.listen(PORT,()=>console.log('server has started'))
