var App = (function (document) {
  const canvas = document.getElementById('canvas');
  const btnGenerate = document.getElementById('btn-generate');

  function paintGrill() {
    const heightVal = document.getElementById('input-height').value;
    const widthVal = document.getElementById('input-width').value;

    const customHeight = heightVal || 300;
    const customWidth = widthVal || 300;

    console.log(customHeight, customWidth);

    const ctx = canvas.getContext('2d');
    canvas.height = customHeight;
    canvas.width = customWidth;
    ctx.strokeStyle = 'black';

    for (let i = 0; i <= 500; i = i + 20) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 500);
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    for (let j = 0; j <= 500; j = j + 20) {
      ctx.moveTo(0, j);
      ctx.lineTo(500, j);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
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