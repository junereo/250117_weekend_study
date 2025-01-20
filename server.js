const express = require('express');
const nunjucks = require('nunjucks');
const dotevn = require('dotenv');
const app = express();
const book = require('./models');
const multerUpload = require('./file.middleware');
const { searchBook }  = require('./searchBook');

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app
})

app.use(express.static('uploads'));
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res) => {
    const {name} = req.query;
    const searchBookList = await searchBook(name, 10);
    const booklist = await book.findAll();
    res.render('index.html', { 
            booklist, searchBookList
        });
});

app.get('/uploads/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const booklist = await book.findOne({
        where: { id:  id  }  
      });
    res.render('view.html', {
        booklist
    })
});

app.post('/upload', multerUpload.single('file'), async (req, res) => {
    const { filename, path } = req.file;
    try{
        const newBook = await book.create({
            name: filename,
            path: filename,
        });
        console.log(filename, path)
        res.status(200).redirect('/');
    }catch(error){
        console.log(error)
    }
});

// 서버 시작
app.listen(3000,async () => {
    await book.sync({force: false});
    book.isSynchronized = true;
    console.log(`Server running on http://localhost:3000`);
});