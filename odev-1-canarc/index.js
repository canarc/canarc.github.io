'use strict';

//filtreleme işlemi için apiden gelen veriyi saklamak gerekti.
let gridData = [];

document.addEventListener('DOMContentLoaded', () => getData());

function getData() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => data.slice(0, 10))
    .then((data) => {
      gridData = data;
      renderGrid(data);
    });
}

Array.from(document.querySelector('.leftContent').children).forEach((node) => {
  node.addEventListener('click', (e) => {
    e.preventDefault();

    //Sol menüdeki butonları aktif pasif yapar
    document.querySelector('.leftContent > .active').classList.remove('active');
    e.target.classList.add('active');

    switch (e.target.value) {
      case 'form':
        //ekranda formu gösterir
        document.querySelector('.myGrid').classList.add('empty');
        document.querySelector('.myForm').classList.remove('empty');
        document.querySelector('.searchBar').classList.add('hidden');
        return;
      case 'grid':
        //ekranda gridi gösterir
        document.querySelector('.myForm').classList.add('empty');
        document.querySelector('.myGrid').classList.remove('empty');
        document.querySelector('.searchBar').classList.remove('hidden');

        return;
    }
  });
});

document.querySelector('.searchBar').addEventListener('input', (e) => {
  //search değiştiğinde datayı filtreler ve kartları tekrar renderlar.
  const filteredData = gridData.filter((data) => data.title.includes(e.target.value) || data.body.includes(e.target.value));
  renderGrid(filteredData);
});

function renderGrid(datas) {
  const myGrid = document.querySelector('.myGrid');

  myGrid.innerHTML = '';

  datas.forEach((data, index) => {
    const gridCell = document.createElement('div');
    gridCell.className = 'gridCell';

    const image = document.createElement('img');
    image.src = `https://picsum.photos/id/${index * 14}/500/200/`;
    image.className = 'gridImg';
    image.alt = 'random';

    const titleContainer = document.createElement('div');
    titleContainer.className = 'gridTitleContainer';

    const title = document.createElement('h3');
    title.innerText = data.title;

    const body = document.createElement('p');
    body.innerText = data.body;

    const button = document.createElement('button');
    button.innerText = 'Bana Tıkla';

    gridCell.appendChild(image);
    gridCell.appendChild(title);
    gridCell.appendChild(body);
    gridCell.appendChild(button);

    myGrid.appendChild(gridCell);
  });
}

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const content = document.querySelector('.modalContent');
    content.innerHTML = '';

    let info = document.createElement('p');
    info.innerText = 'İsim: ' + e.target.elements.fname.value;
    content.appendChild(info);

    info = document.createElement('p');
    info.innerText = 'Soyisim: ' + e.target.elements.lname.value;
    content.appendChild(info);

    info = document.createElement('p');
    info.innerText = 'Telefon: ' + e.target.elements.phone.value;
    content.appendChild(info);

    info = document.createElement('p');
    info.innerText = 'Adres: ' + e.target.elements.address.value;
    content.appendChild(info);

    info = document.createElement('p');
    info.innerText = 'Yaş: ' + document.querySelector('input[name="age"]:checked').value;
    content.appendChild(info);

    info = document.createElement('p');
    info.innerText = 'Favori Dil: ' + document.querySelector('input[name="fav_language"]:checked').value;
    content.appendChild(info);

    e.target.reset();

    document.querySelector('.modalContainer').classList.remove('empty');
  } catch (err) {
    alert('Lütfen tüm alanları doldurun.');
  }
});

document.querySelector('.modalContent').addEventListener('click', (e) => {
  e.stopPropagation();
});

document.querySelector('.modalContainer').addEventListener('click', (e) => {
  e.target.classList.add('empty');
});
