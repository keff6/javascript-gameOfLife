/*---------------------------------------------------------------------------------------
                                        UIController     
/*---------------------------------------------------------------------------------------*/
const UI = ((document) => {
  const table = document.getElementById('table'),
        nodes = document.getElementsByTagName('td'),
        variables = {
          heightValue: document.getElementById('input-height'),
          widthValue: document.getElementById('input-width'),
          speedInfo: document.getElementById('speed-info'),
          speedControl: document.getElementById('speed-control'),
          btnGenerate: document.getElementById('btn-generate'),
          btnClear: document.getElementById('btn-clear'),
          btnPlay: document.getElementById('btn-play'),
          btnStep: document.getElementById('btn-step'),
        }

  function setCellEvents(gridValues) {    
    const spots = Array.prototype.slice.call(nodes,0);
    spots.forEach(spot => spot.addEventListener('click', (event) => {
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

  function drawGrid(height, width, gridValues) {
    let gridHtml = '';

    for (let i = 0; i < height; i++) {
      let row = gridValues[i];
      gridHtml += '<tr>'
      for (let j = 0; j < width; j++) {
        gridHtml += `<td data-i="${i}" data-j="${j}"><div class="${row[j] === 1 ? 'dot' : 'blank'}"></div></td>`
      }
      gridHtml += '</tr>'
    }

    table.innerHTML = gridHtml;
    setCellEvents(gridValues);   
  }

  return {
    variables: variables,
    drawGrid: drawGrid
  }

})(document);

/*---------------------------------------------------------------------------------------
                                        LogicController     
/*---------------------------------------------------------------------------------------*/
const Controller = ((UI) => {
  let gridValues = [];

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
    return gridValues;
  }

  function getClearGrid(height, width) {
    gridValues = generateClearGrid(height, width);
    return gridValues;
  }

  function generateInitialGen(height, width){    
    gridValues = generateValuesGrid(height, width);
    return gridValues;      
  }

  return {
    generateInitialGen: generateInitialGen,
    getClearGrid: getClearGrid,
    getNextGeneration: getNextGeneration,
  }

})(UI);

/*---------------------------------------------------------------------------------------
                                        AppController     
/*---------------------------------------------------------------------------------------*/

const App = ((UI, Controller) => { 
  const speed = {
    0: { ms: 2000, info: '-2x'}, 
    1: { ms: 1500, info: '-1.5x'}, 
    2: { ms: 1000, info: '1x'}, 
    3: { ms: 500, info: '1.5x'}, 
    4: { ms: 250, info: '1.75x'}
  };
  let height = 30,
      width = 50,
      currentSpeed = 1000,
      play;

  function generate() {
    height = UI.variables.heightValue.value || 30,
    width = UI.variables.widthValue.value || 50;
    const gridValues = Controller.generateInitialGen(height, width);
    UI.drawGrid(height, width, gridValues);
  }

  function clear() {
    clearInterval(play);
    const gridValues = Controller.getClearGrid(height, width);
    UI.drawGrid(height, width, gridValues);
  }

  function start() {
    play = setInterval(
      () => UI.drawGrid(height, width, Controller.getNextGeneration()), 
      currentSpeed
    );
  }

  function step() {
    clearInterval(play);
    UI.drawGrid(height, width, Controller.getNextGeneration());
  }

  function setSpeed(value) {
    clearInterval(play);
    currentSpeed = speed[+value].ms;
    UI.variables.speedInfo.innerHTML = speed[+value].info;
    play = setInterval(
      () => UI.drawGrid(height, width, Controller.getNextGeneration()), 
      currentSpeed
    );
  }
  
  function setEventListeners() {
    UI.variables.btnGenerate.addEventListener('click', generate);
    UI.variables.btnClear.addEventListener('click', clear);
    UI.variables.btnPlay.addEventListener('click', start);    
    UI.variables.btnStep.addEventListener('click', step);
    UI.variables.speedControl.addEventListener('input', () => setSpeed(event.target.value)); 
  }

  return {
    init: function () {
      console.log('app started');
      setEventListeners();
    }
  }

})(UI, Controller);

App.init();