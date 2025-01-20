const axios = require('axios');
const apiKey = process.env.BOOK_API_KEY;
const query = "비트코인";

const searchBook = async (query = "비트코인", amount=5) => {
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${query}&QueryType=Title&MaxResults=${amount}&start=1&SearchTarget=Book&output=js&Version=20131101`;

    try{
        const booklist = [];
        const response =  await axios.get(url);
        console.log("도서 검색 결과:", response.data);

        response.data.item.forEach(book => {
            booklist.push(`{${book.title.split('-')[0]}, ${book.itemId}, ${book.cover}, ${book.link}}`);
            //console.log(`제목: ${book.title}, 저자: ${book.author}, 가격: ${book.priceStandard}원, 이미지 : ${book.cover} `);
        
        });
        
        const structuredData = booklist.map(item => {
        const content = item.replace(/[{}]/g, '').split(', ');
        return {
            title: content[0],
            itemId: content[1],
            url: content[2],
            link: content[3].replace(/&amp;/g, '&')
        };
        });
        return structuredData;

    }catch(error){
        console.error("API 호출 오류:", error)
    }
}

module.exports = { searchBook };