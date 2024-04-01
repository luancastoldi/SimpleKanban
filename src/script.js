
let draggedCard = null;

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('dragstart', dragStart);
  card.addEventListener('dragend', dragEnd);
});

function dragStart() {
  draggedCard = this;
  // console.log(this);
  this.classList.add('dragging');
}

function dragEnd() {
  this.classList.remove('dragging');
  // console.log('Acabou');
}

document.querySelectorAll('.column').forEach(column => {
  column.addEventListener('dragover', dragOver);
  column.addEventListener('dragenter', dragEnter);
  column.addEventListener('dragleave', dragLeave);
  column.addEventListener('drop', dragDrop);
});

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
  // console.log(this);
  this.classList.remove('drop-here');
  // console.log(this);  //coluna anterior
}

function dragDrop() {
  this.classList.remove('drop-here');
  this.appendChild(draggedCard);
  // console.log('foi'); // soltou na coluna
}


