
let draggedCard = null;
let id;

openJSON()

function openJSON() {
  fetch('../bd.json')
    .then(response => {
      return response.json();
    })
    .then(data => makeColumns(data))
}

function makeColumns(objJSON) {

  id = objJSON.id;

  let columns = objJSON.columns;
  let todo = columns.todo
  let done = columns.done
  let doing = columns.doing;

  todo.forEach(card => {
    document.getElementById('todo').insertAdjacentHTML("beforeend",
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

function formatData(dataJSON){
  let newData = String(dataJSON).split("-")
  return newData[2] + '/' + newData[1] + '/' + newData[0] 
}

function dragStart() {
  draggedCard = this;
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
  // console.log('Acabou');
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add('drop-here');

  console.log('aqui');
}

function dragEnter() {
  this.classList.add('drop-here');
  // console.log(this);  //sobre a coluna
}

function dragLeave() {
  this.classList.remove('drop-here');
}

function dragDrop() {
  this.classList.remove('drop-here');
  this.appendChild(draggedCard);
}


