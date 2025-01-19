const express = require('express');
const nunjucks = require('nunjucks');
const dotevn = require('dotenv');
const app = express();
const sequelize = require('./models');
const multerUpload = require('./file.middleware');

app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app
})

app.use(express.static('uploads'));


app.get('/', async (req, res) => {
    // 데이터 베이스에서 전체 목록 가져오기
    // index.html 페이지 응답 내보내고 전체 목록 값 같이 보내기
    const booklist = await User.findAll();
    res.render('index.html', { 
            booklist 
        });
});


app.get('/uploads/:filename', async (req, res) => {
    const id = req.params.id;
    const book = await User.findAll({
        where: { id: { id } },  
      });
    res.render('view.html', {
        book
    })
});

app.post('/upload', multerUpload.single('file'), async (req, res) => {
    const { filename, path } = req.file;
    try{
        const newBook = await User.create({
            name: filename,
            path: path,
        });
        console.log(filename, path)
        res.status(200).redirect('/');
    }catch(error){
        console.log(error)
    }
});

// 서버 시작
app.listen(3000, () => {
    //await sequelize.sync();
    console.log(`Server running on http://localhost:3000`);
});