const width = document.querySelector('#width');
const height = document.querySelector('#height');
const btn = document.querySelector('button');
const img = document.querySelector('.picture')
const reg = /^([1-4]\d\d|500)$/;
function takePicture(width, height, funcCB) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://loremflickr.com/json/g/${width}/${height}/all`);
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
    const file = data.file.replace(/\\/g, '');
    const picture = `
          <div class="card">
            <img src="${file}" height="${height.value}" width="${width.value}"/>
          </div>`;
    pics = pics + picture;
    img.innerHTML = pics;
}
btn.addEventListener('click',function (e){
    e.preventDefault();
    if (!reg.test(width.value)||!reg.test(height.value)){
        img.innerHTML = '<p>Введите число от 100 до 500</p>'
    } else {
        takePicture(width.value, height.value, showPicture)
    }
})