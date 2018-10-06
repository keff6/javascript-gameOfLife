var App = (function (document) {
  // Global variables
  let heightValueUI = document.getElementById('input-height');
  let widthValueUI = document.getElementById('input-width');
  let speedInfo = document.getElementById('speed-info');
  let heightVal = 0;
  let widthVal = 0;
  let gridValues = [];
  let play;
  const speedControl = document.getElementById('speed-control');  
  const speed = {
    0: { ms: 2000, info: '-2x'}, 
    1: { ms: 1500, info: '-1.5x'}, 
    2: { ms: 1000, info: '1x'}, 
    3: { ms: 500, info: '1.5x'}, 
    4: { ms: 250, info: '1.75x'}
  };
  let currentSpeed = 1000;

  // const canvas = document.getElementById('canvas');
  const btnGenerate = document.getElementById('btn-generate');
  const btnClear = document.getElementById('btn-clear');
  const btnPlay = document.getElementById('btn-play');
  const btnStep = document.getElementById('btn-step');

  function generateRandomBit() {
    return Math.round(Math.random())
  }

  function generateValuesGrid(x, y) {
    let valuesGrid = [x];

    for (let i = 0; i < x; i++) {      
      const row = [y]
      for (let j = 0; j < y; j++) {        
        const bit = generateRandomBit();
        row[j] = (bit);
      }
      valuesGrid[i] = row;
    }

    return valuesGrid;
  }

  function generateClearGrid(x, y) {
    let valuesGrid = [x];

    for (let i = 0; i < x; i++) {      
      const row = [y]
      for (let j = 0; j < y; j++) {     
        row[j] = 0;
      }
      valuesGrid[i] = row;
    }
    return valuesGrid;
  }

  function neighboursCount(i,j,rowLen, colLen){
    let countNeighbors = 0;
    if(i>0 && j>0) { gridValues[i-1][j-1] === 1 && countNeighbors++ }
    if(i>0) { gridValues[i-1][j] === 1 && countNeighbors++ }
    if(i>0 && j < rowLen - 1) { gridValues[i-1][j+1] === 1 && countNeighbors++ }
    if(j>0) { gridValues[i][j-1] === 1 && countNeighbors++ }
    if(j < rowLen - 1) { gridValues[i][j+1] === 1 && countNeighbors++ }
    if(i < colLen -1 && j > 0) { gridValues[i+1][j-1] === 1 && countNeighbors++ }
    if(i < colLen -1) { gridValues[i+1][j] === 1 && countNeighbors++ }
    if(i < colLen -1 && j < rowLen - 1) { gridValues[i+1][j+1] === 1 && countNeighbors++ }
    return countNeighbors;
  }

  function getNextGeneration() {
    let nextGen = [];    

    for (let i = 0, colLen = gridValues.length; i < colLen; i++) {
      let row = gridValues[i];
      let newRow = [];
      for (let j = 0, rowLen = row.length; j < rowLen; j++) {
        let countNeighbors = neighboursCount(i,j,rowLen, colLen);

        if(row[j] === 1) {
          newRow[j] = countNeighbors === 2 || countNeighbors === 3 ? 1 : 0;
        } else {
          newRow[j] = countNeighbors === 3 ? 1 : 0;
        }
      }
      nextGen[i] = newRow;
    }
    gridValues = nextGen;    
    paintGrill();
  }

  function start() {
    play = setInterval(getNextGeneration, currentSpeed);
  }

  function step() {
    clearInterval(play)
    getNextGeneration(); 
  }

  function getClearGrid() {
    clearInterval(play)
    heightVal = heightValueUI.value || 5;
    widthVal = widthValueUI.value || 5;

    gridValues = generateClearGrid(heightVal,widthVal);
    paintGrill(); 
  }

  function generateInitialGen(){
    clearInterval(play)
    heightVal = heightValueUI.value || 5;
    widthVal = widthValueUI.value || 5;

    gridValues = generateValuesGrid(heightVal,widthVal);
    paintGrill(); 
  }

  function paintGrill() {
    let gridHtml = '';

    for (let i = 0; i < heightVal; i++) {
      let row = gridValues[i];
      gridHtml += '<tr>'
      for (let j = 0; j < widthVal; j++) {
        gridHtml += `<td data-i="${i}" data-j="${j}"><div class="${row[j] === 1 ? 'dot' : 'blank'}"></div></td>`
      }
      gridHtml += '</tr>'
    }

    const table = document.getElementById('table');
    table.innerHTML = gridHtml;
    setCellEvents()
  }

  function outputUpdate(vol) {
    clearInterval(play)
    console.log(speed, vol)
    currentSpeed = speed[+vol].ms;
    speedInfo.innerHTML = speed[+vol].info;
    console.log(currentSpeed)
    play = setInterval(getNextGeneration, currentSpeed);
  }

  function setCellEvents() {
    const tdNodes = document.getElementsByTagName('td');
    const spots = Array.prototype.slice.call(tdNodes,0);
    spots.forEach(spot => spot.addEventListener('click', (event) => {
      console.log(spot)
      const isBlank = spot.getElementsByClassName("blank")[0] ? true : false;
      const positionI = event.path[1].dataset.i;      
      const positionJ = event.path[1].dataset.j;      
      let d = '';
      
      if(positionI && positionJ) {
        if(isBlank) {
          d = spot.getElementsByClassName("blank")[0];
          d.classList.remove('blank');
          d.classList.add('dot');
          
          gridValues[positionI][positionJ] = 1;
        }else {
          d = spot.getElementsByClassName("dot")[0];
          d.classList.remove('dot');
          d.classList.add('blank');
          gridValues[positionI][positionJ] = 0;
        }
      }      
    }));
  }  
  
  function setEventListeners() {
    btnGenerate.addEventListener('click', generateInitialGen);
    btnClear.addEventListener('click', getClearGrid);
    btnPlay.addEventListener('click', start);    
    btnStep.addEventListener('click', step);
    speedControl.addEventListener('input', () => outputUpdate(event.target.value)); 
  }

  return {
    init: function () {
      console.log('app started');
      setEventListeners();
    }
  }

})(document);

App.init();