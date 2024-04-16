
let draggedCard = null;
let g_id;
let g_card_index = 0;
let g_index_drag_card;
let g_column_drag_start;
let g_column_drag_end;
let json_file = 'bd.json'

openJSON()

function openJSON() {
  fetch('bd.json')
    .then(response => {
      return response.json();
    })
    .then(data => makeColumns(data))
}

function makeColumns(objJSON) {

  g_id = objJSON.id;
  let columns = objJSON.columns;
  mapAllColumn(columns.todo, 'todo')
  mapAllColumn(columns.doing, 'doing')
  mapAllColumn(columns.done, 'done')
  setIndexCards()
}



function setIndexCards() {
  let indexColumn = 0
  document.querySelectorAll('.column').forEach(columns => {
    columns.info = indexColumn ++;
    let index = 0;
    columns.querySelectorAll('.card').forEach(cards => {
      cards.info = index++;
    })
  })
}

function mapAllColumn(column, id_element) {

  column.forEach(card => {
    document.getElementById(id_element).insertAdjacentHTML("beforeend",
      `<div class="card" id='card-${card.id}' draggable="true">
        <div>
            <span>${card.title}</span>
            <span class="priority">${card.priority}</span>
        </div>
        <span>${card.text}</span>
          <div class="tags"> 
          </div>
          <div class="dates">
              <span>${formatData(card.date_register)}</span>
              <span>${formatData(card.date_change)}</span>
              <span>🗑️</span>
          </div>
      </div>`)

    card.tags.forEach(tag => document.querySelector('#card-' + card.id + '>.tags').insertAdjacentHTML("beforeend", `<span>${tag}</span>`))

  })

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);
  });

  document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('drop', dragDrop);
  });
}

function formatData(dataJSON) {
  let newData = String(dataJSON).split("-")
  return newData[2] + '/' + newData[1] + '/' + newData[0]
}

function dragStart() {
  draggedCard = this;
  this.classList.add('dragging');

  g_column_drag_start = this.parentElement.id
  g_index_drag_card = this.info;
}

function dragEnd() {
  this.classList.remove('dragging');
  // console.log('Acabou');
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add('drop-here');
}

function dragEnter() {
  this.classList.add('drop-here');
}

function dragLeave() {
  this.classList.remove('drop-here');
}

function dragDrop() {
  this.classList.remove('drop-here');
  this.appendChild(draggedCard);
  g_column_drag_end = this.id;
  setIndexCards();
  shakeCard()
}


function shakeCard() {

  let url = 'api/crud.php?sc=' + g_column_drag_start + '&ec=' + g_column_drag_end + '&ci=' + g_index_drag_card
  fetch(url)
    .then(data => {
      console.log(data.url);
    })

  // console.log('Coluna Start: ' + g_column_drag_start);
  // console.log('Coluna End: ' + g_column_drag_end);
  // console.log('Card Index ' + g_index_drag_card);
}