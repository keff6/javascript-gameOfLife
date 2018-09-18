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
        // left
        if(j > 0 && row[j-1] === 1) {
          console.log('left')
          countNeighbors++;
        }
        // right
        if(j < rowLen - 1 && row[j+1] === 1) {
          console.log('right')
          countNeighbors++;
        }
        // up
        if(i > 0 && gridValues[i-1][j] === 1) {
          console.log('up')
          countNeighbors++;
        }
        // down
        if(i < colLen - 1 && gridValues[i+1][j] === 1) {
          console.log('down')
          countNeighbors++;
        }

        if(row[j] === 1) {
          newRow[j] = countNeighbors === 2 || countNeighbors === 3 ? 1 : 0;
        } else {
          console.log('vive', countNeighbors)
          newRow[j] = countNeighbors === 3 ? 1 : 0;
        }
      }
      console.log(newRow);
      nextGen[i] = newRow;
    }
    console.log(gridValues, nextGen)
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
        gridHtml += `<td><div class="${row[j] === 1 ? 'dot' : 'blank'}"></div></td>`
      }
      gridHtml += '</tr>'
    }

    const table = document.getElementById('table');

    table.innerHTML = gridHtml;

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