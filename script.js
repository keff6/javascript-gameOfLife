var App = (function (document) {
  const canvas = document.getElementById('canvas');

  function paintGrill() {
    const ctx = canvas.getContext('2d');
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

  return {
    init: function () {
      console.log('app started');
      paintGrill();
    }
  }

})(document);

App.init();