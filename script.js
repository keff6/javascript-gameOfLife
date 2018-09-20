var App = (function (document) {
  // Global variables
  let heightValueUI = document.getElementById('input-height');
  let widthValueUI = document.getElementById('input-width');
  let heightVal = 0;
  let widthVal = 0;
  let gridValues = [];

  // const canvas = document.getElementById('canvas');
  const btnGenerate = document.getElementById('btn-generate');
  const btnPlay = document.getElementById('btn-play');


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


  function getNextGeneration() {
    let nextGen = [];    

    for (let i = 0, colLen = gridValues.length; i < colLen; i++) {
      let row = gridValues[i];
      let newRow = [];
      //console.log('fila', i)
      for (let j = 0, rowLen = row.length; j < rowLen; j++) {
        //console.log('col', j)
        let countNeighbors = 0;

        // --- count neighbours ----

        if(i>0 && j>0) { gridValues[i-1][j-1] === 1 && countNeighbors++ }
        if(i>0) { gridValues[i-1][j] === 1 && countNeighbors++ }
        if(i>0 && j < rowLen - 1) { gridValues[i-1][j+1] === 1 && countNeighbors++ }
        if(j>0) { gridValues[i][j-1] === 1 && countNeighbors++ }
        if(j < rowLen - 1) { gridValues[i][j+1] === 1 && countNeighbors++ }
        if(i < colLen -1 && j > 0) { gridValues[i+1][j-1] === 1 && countNeighbors++ }
        if(i < colLen -1) { gridValues[i+1][j] === 1 && countNeighbors++ }
        if(i < colLen -1 && j < rowLen - 1) { gridValues[i+1][j+1] === 1 && countNeighbors++ }

        //--------------------------

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
    getNextGeneration();
  }

  function generateInitialGen(){
    heightVal = heightValueUI.value || 5;
    widthVal = widthValueUI.value || 5;

    gridValues = generateValuesGrid(heightVal,widthVal);

    // gridValues = [
    //   [0,0,0,0,0],
    //   [0,0,1,0,0],
    //   [0,0,1,0,0],
    //   [0,0,1,0,0],
    //   [0,0,0,0,0]
    // ];

    paintGrill(); 
  }

  function paintGrill() {
    // const heightVal = document.getElementById('input-height').value;
    // const widthVal = document.getElementById('input-width').value;

    // const customHeight = heightVal || 5;
    // const customWidth = widthVal || 5;   

    let gridHtml = '';

    // console.log(gridValues);

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
      
      console.log(gridValues)
    }));

    // setTimeout(paintGrill,1500);
  }

  function setEventListeners() {
    btnGenerate.addEventListener('click', generateInitialGen);
    btnPlay.addEventListener('click', start);    
  }

  return {
    init: function () {
      console.log('app started');
      setEventListeners();
    }
  }

})(document);

App.init();