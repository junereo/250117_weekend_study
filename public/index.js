const btnLike = document.querySelector('#book-list1');
const like = (e) =>{
    const itemId = e.target.id;
    if(itemId !== undefined && itemId !== null && itemId !== '')
    {
        console.log(e.target.value)
        if (parseInt(e.target.value) === 1) {
            e.target.innerHTML = '🩶';
            e.target.value = "false"
        } else {
            e.target.innerHTML = '❤️';
             e.target.value = "true"
        }
    }
}
btnLike.addEventListener('click', like);