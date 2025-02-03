const axios = require('axios');
const apiKey = process.env.BOOK_API_KEY;
const query = "비트코인";

const searchBook = async (query = "비트코인", SearchTarget= "Book", amount=5) => {
    const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${query}&QueryType=Title&MaxResults=${amount}&start=1&SearchTarget=${SearchTarget}&output=js&Version=20131101&Cover=big`;

    try{
        const booklist = [];
        const response =  await axios.get(url);
        console.log("도서 검색 결과:", response.data);

        response.data.item.forEach(book => {
            booklist.push(`{${book.title.split('-')[0]}, ${book.itemId}, ${book.cover}, ${book.link}, ${book.isbn13}, ${book.isbn}
            , ${book.description}, ${book.author}, ${book.pubDate}, ${book.categoryName}, ${book.publisher}}`);
            //console.log(`제목: ${book.title}, 저자: ${book.author}, 가격: ${book.priceStandard}원, 이미지 : ${book.cover} `);
        
        });
        
        const structuredData = booklist.map(item => {
        const content = item.replace(/[{}]/g, '').split(', ');
        return {
            title: content[0],
            itemId: content[1],
            url: content[2],
            link: content[3].replace(/&amp;/g, '&'),
            isbn13: content[4],
            isbn: content[5],
            description: content[6],
            author: content[7],
            pubDate: content[8],
            categoryName: content[9],
            publisher: content[10]
        };
        });
        return structuredData;

    }catch(error){
        console.error("API 호출 오류:", error)
    }
}


/*
ItemNewAll : 신간 전체 리스트, ItemNewSpecial : 주목할 만한 신간 리스트, ItemEditorChoice : 편집자 추천 리스트
(카테고리로만 조회 가능 - 국내도서/음반/외서만 지원), Bestseller : 베스트셀러, BlogBest : 블로거 베스트셀러 (국내도서만 조회 가능)
*/
const searchNewBook = async (QueryType = "ItemNewAll", SearchTarget= "Book",SubSearchTarget="Book", amount=5) => {
    //const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${query}&QueryType=Title&MaxResults=${amount}&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=big`;
    const url = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${apiKey}&QueryType=${QueryType}&MaxResults=${amount}&start=1&SearchTarget=${SearchTarget}&output=js&Version=20131101&Cover=big`

    try{
        const booklist = [];
        const response =  await axios.get(url);
        //console.log("도서 검색 결과:", response.data);

        response.data.item.forEach(book => {
            booklist.push(`{${book.title.split('-')[0]}, ${book.itemId}, ${book.cover}, ${book.link}, ${book.isbn13}, ${book.isbn}
            , ${book.description}, ${book.author}, ${book.pubDate}, ${book.categoryName}, ${book.publisher}}`);
            //console.log(`제목: ${book.title}, 저자: ${book.author}, 가격: ${book.priceStandard}원, 이미지 : ${book.cover} `);
        
        });
        
        const structuredData = booklist.map(item => {
        const content = item.replace(/[{}]/g, '').split(', ');
        return {
            title: content[0],
            itemId: content[1],
            url: content[2],
            link: content[3].replace(/&amp;/g, '&'),
            isbn13: content[4],
            isbn: content[5],
            description: content[6],
            author: content[7],
            pubDate: content[8],
            categoryName: content[9],
            publisher: content[10]
        };
        });
        return structuredData;

    }catch(error){
        console.error("API 호출 오류:", error)
    }
}

const searchOneBook = async (itemId) => {
    //const url = `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${apiKey}&Query=${query}&QueryType=Title&MaxResults=${amount}&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=big`;
    //const url = `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${apiKey}&QueryType=${QueryType}&MaxResults=${amount}&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=big`
    const url = `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${apiKey}&itemIdType=ISBN&ItemId=${itemId}&output=js&Version=20131101&Cover=big&OptResult=ebookList,usedList,reviewList`


    try{
        const booklist = [];
        const response =  await axios.get(url);
        //console.log("도서 검색 결과:", response.data.item);

        
        response.data.item.forEach(book => {
            booklist.push(`{${book.title.split('-')[0]}, ${book.itemId}, ${book.cover}, ${book.link}, ${book.isbn13}, ${book.isbn}
            , ${book.description}, ${book.author}, ${book.pubDate}, ${book.categoryName}, ${book.pubDate}}`);
            //console.log(`제목: ${book.title}, 저자: ${book.author}, 가격: ${book.priceStandard}원, 이미지 : ${book.cover} `);
        
        });
        
        const structuredData = booklist.map(item => {
        const content = item.replace(/[{}]/g, '').split(', ');
        return {
            title: content[0],
            itemId: content[1],
            url: content[2],
            link: content[3].replace(/&amp;/g, '&'),
            isbn13: content[4],
            isbn: content[5],
            description: content[6],
            author: content[7],
            pubDate: content[8],
            categoryName: content[9],
            publisher: content[10]
        };
        });
        return response.data.item;

    }catch(error){
        console.error("API 호출 오류:", error)
    }
}


module.exports = { searchBook, searchNewBook, searchOneBook};