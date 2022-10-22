const input = document.querySelector('input');
const btn = document.querySelector('.btn');
const img = document.querySelector('.picture')
const reg = /^([1-9]|10)$/;
function takePicture(limit, funcCB) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://picsum.photos/v2/list/?limit=${limit}`);
    xhr.onload = function() {
        if (xhr.status != 200) {
            img.innerHTML = '<p>Ошибка! Попробуй еще раз</p>';
        } else {
            const result = JSON.parse(xhr.response);
            if (funcCB) {
                funcCB(result);
            } else {
                img.innerHTML = '<p>Ошибка! Попробуй еще раз</p>';
            }
        }
    };
    xhr.onerror = function() {
        img.innerHTML = '<p>Ошибка! Попробуй еще раз</p>'
    };
    xhr.send();
}

function showPicture(data) {
    let pics = '';
    data.forEach(item => {
        const picture = `
          <div class="card">
            <img src="${item.download_url}"/>
          </div>`;
        pics = pics + picture;
    });
    img.innerHTML = pics;
}
btn.addEventListener('click',function (e){
    e.preventDefault();
    if (!reg.test(input.value)){
        img.innerHTML = '<p>Введите число от 1 до 10</p>'
    } else {
        takePicture(input.value, showPicture)
    }
})