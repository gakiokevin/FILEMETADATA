const  express = require('express')
const cors = require('cors')
const multer =  require('multer')
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT  =  process.env.PORT || 3000
const path = require('path');


const app = express()

app.use(express.static(path.join(__dirname, 'views')));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });



app.post('/upload-file',upload.single('file'),uploadFile)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


function uploadFile(req,res,){
   const file = req.file

   if(!file){
    return res.status(400).json({ error: 'No file uploaded.' });
   }

   const fileSize = file.size
   const fileType = file.mimetype
   const fileName = file.originalname
      

   res.json({name:fileName,type:fileType,size:fileSize})


}



app.listen(PORT,()=>console.log('server has started'))