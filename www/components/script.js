window.onload = function(){
  jogoInicio();
  document.querySelector("#direita").addEventListener("click", function(){
     right();
     setTimeout(pare, 1000);
  });

   document.querySelector("#esquerda").addEventListener("click", function(){
     left();
     setTimeout(pare, 1000);
  });

   document.querySelector("#subir").addEventListener("click", function(){
     sobe();
     setTimeout(pare, 1000);
  });

   document.querySelector("#descer").addEventListener("click", function(){
     desce();
     setTimeout(pare, 1000);
  });

  document.querySelector("#reset").addEventListener("click", function(){
     reload();
  });
}

var personagemObj;

var osbtaculos = [];

var pontos;


function jogoInicio(){
  jogoArea.start();
  personagemObj = new componentes("#F5F5F5", 10, 220, 30, 30);
  pontos = new componentes("#0000FF", 30, 30, 'Consolas', '30px', 'texto');
}

let jogoArea = {
   canvas : document.createElement("canvas"),
   start: function(){
     this.canvas.height = 300,
     this.context = this.canvas.getContext("2d");
     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
     this.frame = 0;
     this.intervalo = setInterval(jogoAtualizar, 20);
   },
   limpa: function(){
     this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
   },
   stop: function(){
     clearInterval(this.interval);
   }
}

function contarI(n){
  if((jogoArea.frame / n ) % 1 == 0) {
    return true;
  }else {
    return false;
  }
}

function componentes(cor, x, y, largura, altura, tipo){
      this.tipo = tipo,
      this.altura = altura,
      this.largura = largura,
      this.texto = 0,
      this.x = x,
      this.y = y,
      this.veloX = 0,
      this.veloY = 0,
      this.atualizar = function(){
      contexto = jogoArea.context;
      if(this.tipo == 'texto'){
      contexto.font = this.altura + " " + this.largura;  
      contexto.fillStyle = cor;
      contexto.fillText(this.texto, this.x, this.y);
      }else{
      contexto.fillStyle = cor,
      contexto.fillRect(this.x, this.y, this.altura, this.largura);
      }
      },
      this.posicaoNova = function(){
        this.x += this.veloX;
        this.y += this.veloY; 
      },
      this.colisao = function(obj){
        let esq = this.x;
        let dir = this.x + this.largura;
        let sup = this.y;
        let inf = this.y + this.altura;
        
        let objEsq = obj.x;
        let objDir = obj.x + obj.altura;
        let objSup = obj.y;
        let objInf = obj.y + obj.largura;

        let batida = true;

        if(
          (inf < objSup) || (sup > objInf) ||
          (dir < objEsq) || (esq > objDir)
          ){
          batida = false;

          }
          return batida;
      }
}

function jogoAtualizar(){
  let x, y;

  for(i = 0 ; i < osbtaculos.length; i++){
    if(personagemObj.colisao(osbtaculos[i])){
    jogoArea.stop();
    return;
     }
  }
  
  jogoArea.limpa();
  jogoArea.frame += 1;

  if(jogoArea.frame == 1 || contarI(150)) {
   x = jogoArea.canvas.width;
   miniAltura = 20;
   maxAltura = 200; 
   altura = Math.floor (Math.random() * (maxAltura - miniAltura + 1 ) + miniAltura);
   minVazio = 50
   maxVazio = 200;
   vazio = Math.floor(Math.random() * (maxVazio - minVazio + 1) + minVazio);
   osbtaculos.push(new componentes('#6959CD', x, 0 , altura, 10));
   osbtaculos.push(new componentes('#6959CD', x, altura  + vazio , x - altura - vazio, 10));
  }

  for(i = 0; i < osbtaculos.length; i++) {
    osbtaculos[i].x += -1;
    osbtaculos[i].atualizar();
  }

  pontos.texto = "Score: " + jogoArea.frame;
  pontos.atualizar();
  personagemObj.posicaoNova();
  personagemObj.atualizar();
 

}


function sobe(){
  personagemObj.veloY -= 1;
}

function desce(){
  personagemObj.veloY += 1;
}

function right(){
  personagemObj.veloX += 1;
}

function left(){
  personagemObj.veloX -= 1;
}

function pare() {
  personagemObj.veloX = 0;
  personagemObj.veloY = 0;
}

function reload() {
location.reload();
}