//Функция для переключения блоков при нажатии кнопки
function changeBlock () {
    const wrap = document.getElementById('wrapper');//переменная стартового поля//
    const startChange = document.querySelectorAll('[data-next]');//переменная для кнопки//
    
    // Ищем блок вопроса по методу dataset и id, удаляем класс _hidden
    startChange.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Ищем кнопку по атрибуту dataset 
            const startChangeId = this.dataset.next;
            
            // Ищем блок вопроса по атрибуту кнопки, что мы нашли, и по id 
            const blockId = document.querySelector('#' + startChangeId);
                    
            // Удаляем класс _hidden
            blockId.classList.remove('_hidden');
            //wrap.classList.remove('wrapper');
            wrap.classList.add('invisible');
            
            // Ищем родительский блок и добавляем ему класс _hidden
            this.closest('.block').classList.add('_hidden');
            
        })
    });
}
changeBlock ();

// Функция для создания значений в select
function injectSelect (sel, rowsObject) {
    let opt, x;
    sel.innerHTML = "";
    for (x in rowsObject) {
        opt = document.createElement("option");
        opt.value = x;
        opt.innerHTML = rowsObject[x];
        sel.appendChild(opt);
    }
}
// Функция, возвращающая ассоциативный массив ряда чисел от меньшего к большему, включительно. 
function makeNumbersObject (from, to) {
    let result = {}, x;
    if(from > to) { // Если from меньше to, поменять их значения друг на друга.
        let z = from;
        from = to;
        to = z;
    }
    for (x = from; x <= to; x++) {
        result[x] = x;
    }
    return result
}
injectSelect(document.getElementById("months"), {
    text:"Месяц",
    jan:"Январь", feb:"Февраль", mar:"Март", apr:"Апрель", 
    may:"Май", jun:"Июнь", jul:"Июль", avg:"Август", 
    sep:"Сентябрь", okt:"Октябрь", nov:"Ноябрь", dec:"Декабрь"
}); // Наполняем месяца

injectSelect(document.getElementById("years"), makeNumbersObject(1950, 2003)); // Наполняем года
injectSelect(document.getElementById("days"), makeNumbersObject(1, 31));// Наполняем дни

//Выбор пользователем возраста и отрисовка  блока зависимости
const select = document.getElementById('years');
select.addEventListener('change', selectYear);

function selectYear() {
    let choice = select.value;

    if (choice >= '1986' && choice <= '2003') {
        document.getElementById("label1").classList.add('block');
        document.getElementById("label2").classList.add('invisible');
        document.getElementById("label3").classList.add('invisible');
    } else if (choice >= '1976' && choice <= 1985) {
        document.getElementById("label1").classList.remove('block');
        document.getElementById("label1").classList.add('invisible');
        document.getElementById("label2").classList.remove('invisible');
        document.getElementById("label2").classList.add('block');
        document.getElementById("label3").classList.add('invisible');
    } else {
        document.getElementById("label1").classList.remove('block');
        document.getElementById("label1").classList.add('invisible');
        document.getElementById("label2").classList.add('invisible');
        document.getElementById("label3").classList.remove('invisible');
        document.getElementById("label3").classList.add('block');
  }
}

//Получение данных со стороненного API
const btnEnd = document.getElementById('btn-end');
btnEnd.addEventListener("click", function () {
    const body = document.body;
    let url = `https://swapi.dev/api/people/1/`;
    const data = new Date();
    const getUrl = new Promise ((resolve, reject) => {
        return url ? resolve(url) : reject('Ссылка не найдена');
    });
    const getDate = new Promise ((resolve, reject) => {
        return data ? resolve(data) : reject('Дата не найдена');
    }); 
    Promise.all(([getDate, getUrl]))
        .then(([data, url]) => fetch(url))
        .then(res => res.json())
        .then(json => {
        console.log(json.height);
        console.log(json.name);
        console.log(json.hair_color);
        console.log(json.eye_color);
    const name = document.querySelector('.result');
    if (json.name != null) {
        name.innerHTML = "Имя этого человека: " + json.name;
    } else {
        name.innerHTML = 'Данные недоступны';
    }
    body.append(name);

    const height = document.querySelector('.result__height');
    if (json.height != null) {
        height.innerHTML = "Рост: "+ json.height;
    } else {
       height.innerHTML = 'Данные недоступны';
    }
    body.append(height);

    const hair_color = document.querySelector('.result__hair_color');
    if (json.hair_color != null) {
        hair_color.innerHTML = "Его волосы цвета: "+ json.hair_color;
    } else {
        hair_color.innerHTML = 'Данные недоступны';
    }
    body.append(hair_color);
          
    const eye_color = document.querySelector('.result__eye_color');
    if (json.eye_color != null) {
        eye_color.innerHTML = "Цвет глаз: "+ json.eye_color;
    } else {
        eye_color.innerHTML = 'Данные недоступны';
    }
    body.append(eye_color);
    }) 
    .catch(err => console.log(err));
});

//Расчет даты события
let currentDate = new Date()
currentDate.setDate(currentDate.getDate() + 1)

document.getElementById("date").innerHTML =("<b>"+currentDate.toLocaleDateString()+  "</b>")

//Загрузка прелоадера
const startPrelFirst = document.getElementById('startPrel1');
const preloaderFirst = document.querySelector('.preloader-first')
const showBlock = document.querySelector('.block_4');

startPrelFirst.addEventListener('click', function() {
    preloaderFirst.classList.remove("hide");
    setTimeout(function() {
        preloaderFirst.classList.add("hide");
        showBlock.classList.remove("hide")
    }, 2000);
});

const startPrelSecond = document.getElementById('startPrel2');
const preloaderSecond = document.querySelector('.preloader-second');
const showBlockText = document.querySelector('.text');

startPrelSecond.addEventListener('click', function() {
    preloaderSecond.classList.remove("hide");
    setTimeout(function() {
        preloaderSecond.classList.add("hide");
        showBlockText.classList.remove("hide")
    }, 2000);
});



