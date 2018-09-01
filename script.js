var App = (function (document) {
  const canvas = document.getElementById('canvas');
  const btnGenerate = document.getElementById('btn-generate');

  function generateRandomBit() {
    return Math.round(Math.random())
  }

  function paintGrill() {
    const heightVal = document.getElementById('input-height').value;
    const widthVal = document.getElementById('input-width').value;

    const customHeight = heightVal || 15;
    const customWidth = widthVal || 15;

    let gridHtml = '';

    for (let i = 0; i < customHeight; i++) {
      gridHtml += '<tr>'
      for (let j = 0; j < customWidth; j++) {
        const bit = generateRandomBit();
        gridHtml += `<td><div class="${bit ? 'dot' : 'blank'}"></div></td>`
      }
      gridHtml += '</tr>'
    }

    const table = document.getElementById('table');

    table.innerHTML = gridHtml;

    setTimeout(paintGrill,1500);
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