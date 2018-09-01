var App = (function (document) {
  const canvas = document.getElementById('canvas');
  const btnGenerate = document.getElementById('btn-generate');

  function generateRandomBit() {
    return Math.round(Math.random())
  }

  function paintGrill() {
    const heightVal = document.getElementById('input-height').value;
    const widthVal = document.getElementById('input-width').value;

    const customHeight = heightVal || 300;
    const customWidth = widthVal || 300;
    const intial = 10;

    console.log(customHeight, customWidth);

    let gridHtml = '';

    for (let i = 0; i < customHeight; i++) {
      gridHtml += '<tr>'
      for (let j = 0; j < customWidth; j++) {
        gridHtml += `<td>${generateRandomBit()}</td>`
      }
      gridHtml += '</tr>'
    }

    const table = document.getElementById('table');

    console.log(table)

    table.innerHTML = gridHtml;

//     const ctx = canvas.getContext('2d');
//     canvas.height = customHeight * 20;
//     canvas.width = customWidth * 20;
//     ctx.strokeStyle = 'lightgrey';

//     for (let i = 0; i <= canvas.width; i = i + 20) {
//       ctx.moveTo(i, 0);
//       ctx.lineTo(i, canvas.height);
//       ctx.font = "10px Arial";
// ctx.strokeText("1",intial+ 20, intial+ 20);
//       ctx.lineWidth = 1;
//       ctx.stroke();
//     }

//     for (let j = 0; j <= canvas.height; j = j + 20) {
//       ctx.moveTo(0, j);
//       ctx.lineTo(canvas.width, j);
//       ctx.lineWidth = 1;
//       ctx.font = "10px Arial";
// ctx.strokeText("1",intial + 20, intial +20);
//       ctx.stroke();
//     }
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