let currentPage = 1; //Változó, ami nyomon követi az aktuális oldalt
const itemsPerPage = 20; //Az oldalanként megjelenítendő sorok számát rögzíti
let data = []; //Tömb, amely tárolja a JSONPlaceholder API által tárolt adatokat

function fetchData() {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(responseData => {
      data = responseData;
      renderTable();
    })
    .catch(error => console.log('Hiba történt:', error));
}

function renderTable() { //Megjeleníti a táblázatot a megfelelő oldalon található adatokkal
  const tableBody = document.getElementById('Body');
  tableBody.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const item = data[i];
    const row = `<tr><td>${item.id}</td><td>${item.title}</td></tr>`;
    tableBody.innerHTML += row;
  }
}

function nextPage() { //Növeli a "currentpage" értékét,ha még nem éri el az utolsó oldalt, majd újra megjeleníti
  if (currentPage < Math.ceil(data.length / itemsPerPage)) {
    currentPage++;
    renderTable();
  }
}

function previousPage() { //Csökkenti "a currentpage" értékét, ha nem vagyunk az első oldalon, majd újra megjeleníti a táblázatot
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

window.onload = fetchData;
