const btnLike = document.querySelector('#book-list1');
const like = (e) =>{

    if(e.target.tagName === "BUTTON")
    {       
        if (e.target.value === "true") {
            e.target.innerHTML = '🩶';
            e.target.value = "false"
        } else {
            e.target.innerHTML = '❤️';
            e.target.value = "true"
        }
    }
}

btnLike.addEventListener('click', like);