var App = (function (document) {
  const canvas = document.getElementById('canvas');
  const btnGenerate = document.getElementById('btn-generate');

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

  function paintGrill() {
    const heightVal = document.getElementById('input-height').value;
    const widthVal = document.getElementById('input-width').value;

    const customHeight = heightVal || 10;
    const customWidth = widthVal || 10;

    let gridValues = generateValuesGrid(10,10);

    let gridHtml = '';

    console.log(gridValues);

    for (let i = 0; i < customHeight; i++) {
      let row = gridValues[i];
      gridHtml += '<tr>'
      for (let j = 0; j < customWidth; j++) {
        gridHtml += `<td><div class="${row[j] === 1 ? 'dot' : 'blank'}"></div></td>`
      }
      gridHtml += '</tr>'
    }

    const table = document.getElementById('table');

    table.innerHTML = gridHtml;

    // setTimeout(paintGrill,1500);
  }

  function setEventListeners() {
    btnGenerate.addEventListener('click', paintGrill);
  }

  return {
    init: function () {
      console.log('app started');
      setEventListeners();
    }
  }

})(document);

App.init();