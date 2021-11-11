var corObs = "#708090";
var docs = localStorage;
window.onload = function () {
  jogoInicio();
  document.querySelector("#direita").addEventListener("click", function () {
    right();
    setTimeout(pare, 1000);
  });

  document.querySelector("#esquerda").addEventListener("click", function () {
    left();
    setTimeout(pare, 1000);
  });

  document.querySelector("#subir").addEventListener("click", function () {
    sobe();
    setTimeout(pare, 1000);
  });

  document.querySelector("#descer").addEventListener("click", function () {
    desce();
    setTimeout(pare, 1000);
  });

  document.querySelector("#white").addEventListener("click", function () {
    reload();
    docs.setItem("theme", "white");
    whiteTheme();
  });

  document.querySelector("#dark").addEventListener("click", function () {
    reload();
    docs.setItem("theme", "dark");
    darkTheme();
  });

  document.querySelector("#reset").addEventListener("click", function () {
    reload();
  });
}

var personagemObj;

var osbtaculos = [];

var pontos;

var theme = docs.getItem('theme');
function jogoInicio() {
  jogoArea.start();
  personagemObj = new componentes("#F5F5F5", 10, 220, 30, 30);
  pontos = new componentes("#FFFFFF", 30, 30, 'Consolas', '30px', 'texto');
  if (theme == 'dark') {
    darkTheme();
  } else {
    whiteTheme();
  }
}

let jogoArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.height = 300,
      this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frame = 0;
    this.intervalo = setInterval(jogoAtualizar, 20);
  },
  limpa: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  }
}

function contarI(n) {
  if ((jogoArea.frame / n) % 1 == 0) {
    return true;
  } else {
    return false;
  }
}

function componentes(cor, x, y, largura, altura, tipo) {
  this.tipo = tipo,
    this.altura = altura,
    this.largura = largura,
    this.texto = 0,
    this.x = x,
    this.y = y,
    this.veloX = 0,
    this.veloY = 0,
    this.atualizar = function () {
      contexto = jogoArea.context;
      if (this.tipo == 'texto') {
        contexto.font = this.altura + " " + this.largura;
        contexto.fillStyle = cor;
        contexto.fillText(this.texto, this.x, this.y);
      } else {
        contexto.fillStyle = cor,
          contexto.fillRect(this.x, this.y, this.altura, this.largura);
      }
    },
    this.posicaoNova = function () {
      this.x += this.veloX;
      this.y += this.veloY;
    },
    this.colisao = function (obj) {
      let esq = this.x;
      let dir = this.x + this.largura;
      let sup = this.y;
      let inf = this.y + this.altura;

      let objEsq = obj.x;
      let objDir = obj.x + obj.altura;
      let objSup = obj.y;
      let objInf = obj.y + obj.largura;

      let batida = true;

      if (
        (inf < objSup) || (sup > objInf) ||
        (dir < objEsq) || (esq > objDir)
      ) {
        batida = false;
      }
      return batida;
    }
}

function jogoAtualizar() {
  let x, y;

  for (i = 0; i < osbtaculos.length; i++) {
    if (personagemObj.colisao(osbtaculos[i])) {
      document.querySelector('canvas').style.backgroundImage = "url(https://static.wikia.nocookie.net/animal-jam-clans-1/images/7/7c/Tumblr_o1z100MQBP1tm0tuwo1_500.gif/revision/latest?cb=20180505182141)";

      jogoArea.stop();
      return;
    }
  }

  jogoArea.limpa();
  jogoArea.frame += 1;

  if (jogoArea.frame == 1 || contarI(100)) {
    x = jogoArea.canvas.width;
    miniAltura = 0;
    maxAltura = 200;
    altura = Math.floor(Math.random() * (maxAltura - miniAltura + 1) + miniAltura);
    minVazio = 50
    maxVazio = 200;
    vazio = Math.floor(Math.random() * (maxVazio - minVazio + 1) + minVazio);
    osbtaculos.push(new componentes(corObs, x, 0, altura, 10));
    osbtaculos.push(new componentes(corObs, x, altura + vazio, x - altura - vazio, 10));
  }

  for (i = 0; i < osbtaculos.length; i++) {
    osbtaculos[i].x += -1;
    osbtaculos[i].atualizar();
  }

  pontos.texto = "Score: " + jogoArea.frame;
  pontos.atualizar();
  personagemObj.posicaoNova();
  personagemObj.atualizar();
}


function sobe() {
  personagemObj.veloY -= 1.3;
}

function desce() {
  personagemObj.veloY += 1.3;
}

function right() {
  personagemObj.veloX += 1.3;
}

function left() {
  personagemObj.veloX -= 1.3;
}

function pare() {
  personagemObj.veloX = 0;
  personagemObj.veloY = 0;
}

function reload() {
  location.reload();
}

function whiteTheme() {
  corObs = null;
  corObs = "#e0ffff";
  document.body.style.backgroundColor = "#f8f8ff";
  document.querySelector('canvas').style.backgroundImage = "url(https://media0.giphy.com/media/xT9IgC2RzpbE7vBZ6M/giphy.gif?cid=ecf05e47n6r925pnqg7piuios8oys1ggz2ew08595gahdpa2&rid=giphy.gif&ct=g)";
}

function darkTheme() {
  corObs = null;
  corObs = "#708090";
  document.querySelector('canvas').style.backgroundImage = "url(https://64.media.tumblr.com/f32d431b36342ec918206f517c89893e/6b88e5e006296588-d3/s500x750/ffb837c564b8856c768ebe4a586b31fc6e119c03.gifv)";
  document.body.style.backgroundColor = "#c0c0c0"
}