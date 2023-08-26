let n=16;
let color = "black";
let pastColor = "";
let savedColor = color;
let cells;

let pressed=false; let isDragging=false; let clicked=false; let amEnde=false;

const grid = document.getElementById('grid');
let height = grid.clientHeight; //480px in this case, another if changed

const colorPicker = document.getElementById('input');
colorPicker.addEventListener('input', () => {color = colorPicker.value;
  document.documentElement.style.setProperty('--fromJs', color);
});

function draw(order) { //order: mathematical language
  grid.innerHTML = "";
  let a=(height/order)+"px";
  grid.style.backgroundSize = a+" "+a;
  for (let i=0;i<order;i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.height = a;
    grid.appendChild(line);
    for (let j=0;j<order;j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.style.width = a;
      line.appendChild(cell);
    }
  };
  const cells = document.getElementsByClassName('cell');
  
  for (let cell of cells) {
    cell.addEventListener('mousedown', () => {
      clicked=true; pressed=true;
      cell.style.background=color;
    });

    cell.addEventListener('mousemove', () => {if (pressed) {isDragging=true}});

    cell.addEventListener('mouseup', () => {isDragging=false; amEnde=true; pressed=false;});

    cell.addEventListener('mouseenter', () => {
      pastColor = cell.style.background;
      cell.style.background = color;
    });
    cell.addEventListener('mouseleave', () => {
      if (clicked) {cell.style.background = color; clicked=false};
      if (isDragging) {cell.style.background = color} else {cell.style.background = pastColor};
      if (amEnde) {cell.style.background = color; amEnde=false};
    });
  };
  const clean = document.getElementById('clean');
  clean.addEventListener('click', () => {for (let cell of cells) {cell.style.backgroundColor=""}});
};

draw(16);

const eight = document.getElementById('eight');
const onesix = document.getElementById('sixteen');
const twothree = document.getElementById('thirtytwo');
const sixfour = document.getElementById('sixtyfour');

eight.addEventListener('click', () => {if (n!==8) {draw(8);n=8}});
onesix.addEventListener('click', () => {if (n!==16) {draw(16);n=16}});
twothree.addEventListener('click', () => {if (n!==32) {draw(32);n=32}});
sixfour.addEventListener('click', () => {if (n!==48) {draw(48);n=48}});

grid.addEventListener('mouseleave', () => {pressed=false; isDragging=false; clicked=false; amEnde=false});
  
const eraser=document.getElementById('eraser');
eraser.addEventListener('click', () => {savedColor=color; color=""});

const pencil=document.getElementById('pencil');
pencil.addEventListener('click', () => {if (color=="") {color=savedColor}});

function getRandomColor() {return `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`};
const randomizer = document.getElementById('randomizer');
randomizer.addEventListener('click', () => {color = getRandomColor()});