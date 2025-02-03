const express = require('express');
const nunjucks = require('nunjucks');
const dotevn = require('dotenv');
const app = express();
const book = require('./models');
const multerUpload = require('./file.middleware');
const { searchBook, searchNewBook, searchOneBook }  = require('./searchBook');

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app
})

app.use(express.static('uploads'));
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res) => {
    const {name} = req.query;
    const searchBookList = await searchBook(name, "Book", 10);
    const searchNewBookList = await searchNewBook("ItemNewAll","Book", 10);
    //console.log(searchNewBookList)
    //const booklist = await book.findAll();
    res.render('index.html', { 
             searchBookList, searchNewBookList
        });
});

app.get('/uploads/:filename', async (req, res) => {
    const filename = parseInt(req.params.filename);
    /*const booklist = await book.findOne({
        where: { filename:  filename  }  
      });
    */
    const [BookInfo] = await searchOneBook(filename);
    console.log(BookInfo)
      
    res.render('view.html', {
        BookInfo
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
    //await book.sync({force: true});
    //book.isSynchronized = true;
    console.log(`Server running on http://localhost:3000`);
});