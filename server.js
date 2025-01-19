const express = require('express');
const nunjucks = require('nunjucks');
const dotevn = require('dotenv');
const app = express();
const book = require('./models');
const multerUpload = require('./file.middleware');

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app
})

app.use(express.static('uploads'));

app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res) => {
    // 데이터 베이스에서 전체 목록 가져오기
    // index.html 페이지 응답 내보내고 전체 목록 값 같이 보내기
    const booklist = await book.findAll();
    res.render('index.html', { 
            booklist 
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