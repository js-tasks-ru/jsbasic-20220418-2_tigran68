/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.table = document.createElement('table');
    this.createTable();
    this.buttonDelete();
    console.log(this.table);
  }
  createTable = () => {
    return this.table.innerHTML = `<thead>
    <tr>
      <th>Имя</th>
      <th>Возраст</th>
      <th>Зарплата</th>
      <th>Город</th>
      <th></th>
  </tr>
  </thead>
  <tbody>
  ${this.rows.map(row => `
  <tr>
    <td>${row.name}</td> 
    <td>${row.age}</td>
    <td>${row.salary}</td>
    <td>${row.city}</td>
    <td><button>X</button></td>
    </tr>`).join('')}
      </tr>
      <tbody>
  `;
  }
  buttonDelete() {
    let butDel = this.table.querySelectorAll('button');
    for (let i = 0; i < butDel.length; i++) {
      butDel[i].addEventListener('click', function(event) {
        event.target.closest("tr").remove();
      });
    }
  }
  get elem() {
    return this.table;
  }
}
