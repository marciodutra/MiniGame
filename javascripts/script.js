const vidaExtra = document.getElementById("vidaextra");
const cogumelo = document.getElementById("cogumelo");
const inscreva = document.getElementById("inscreva");
const jogador = document.getElementById("jogador");
const ganhouv = document.getElementById("ganhouv");
const bloco1 = document.getElementById("bloco1");
const bloco2 = document.getElementById("bloco2");
const bloco3 = document.getElementById("bloco3");
const pontos = document.getElementById("pontos");
const moedas = document.getElementById("moedas");
const tempo = document.getElementById("tempo");
const vidas = document.getElementById("vidas");
const bonus = document.getElementById("bonus");

const audioColisao = document.getElementById("audiocolisao");
const audioMissao = document.getElementById("audiomissao");
const audioefeito = document.getElementById("audioefeito");
const audioMoeda = document.getElementById("audiomoeda");
const audioPulo = document.getElementById("audiopulo");
const audiove = document.getElementById("audiove");
const audioid = document.getElementById("audioid");
const audioci = document.getElementById("audioci");
const audiopm = document.getElementById("audiopm");

const game = document.getElementById("game");

const larguraGame = game.offsetWidth;
const larguraJogador = jogador.offsetWidth;

let tempoAtual = 10;
let vidasAtual = 0;
let moedasAtual = 0;
let pontosAtual = 0;

let colisaoMaxima = 0;

let posicao = 280;
let direcao = 0;
let velocidade = 10;

let qualLado = "direito";

let estaPressionada = false;
let estaPulando = false;

let checarColisaoBloco1Vazio;
let checarColisaoBloco2Vazio;
let checarColisaoBloco1;
let checarColisaoBloco2;
let checarColisaoBloco3;
let checarColisaoItens;
let checarMovimentos;
let bonusAleatorio;
let checarBonus;
let checarTempo;

function relogio() {
    tempoAtual--;
    tempo.textContent = tempoAtual;
    if (tempoAtual <= 0) {
        removerTeclas();
        clearInterval(checarTempo);
        clearInterval(checarMovimentos);
        tempoAtual = 0;
        tempo.textContent = tempoAtual;
        jogador.src = "/imagens/passou.png";
        audioMissao.pause();
        audiopm.play();
        checarBonus = setInterval(() => {
            bonusFinal();
            }, 100);
            setTimeout(() => {
                clearInterval(checarBonus);
                if (bonusAleatorio >= 99) {
                    vidasAtual = 99;
                    vidas.textContent = vidasAtual;
                    audiove.play();
                    pontosAtual = 999;
                    pontos.textContent = pontosAtual;
                    moedasAtual = 99;
                    moedas.textContent = moedasAtual;
                    audioMoeda.play();
                    tempoAtual = 999;
                    tempo.textContent = tempoAtual;
                }
            }, 1500);
        setTimeout(() => {
            inscreva.style.left = posicao + "px";
            inscreva.style.display = "block";
            audioefeito.play();
        }, 8800);
    }
}

function bonusFinal() {
    bonusAleatorio = Math.floor(Math.random() * 99 + 1);
    bonus.textContent = bonusAleatorio;
}

function teclaPressionada(tecla) {
    if (!estaPressionada && tecla.key === "ArrowRight") {
        direcao = 1;
        jogador.src = "/imagens/jogadorandandoladodireito.gif";
        qualLado = "direito";
        estaPressionada = true;
    } else if (!estaPressionada && tecla.key === "ArrowLeft") {
        direcao = -1;
        jogador.src = "/imagens/jogadorandandoladoesquerdo.gif";
        qualLado = "esquerdo";
        estaPressionada = true;
    } else if (!estaPressionada && tecla.key === "ArrowUp") {
        if (qualLado === "direito") {
        jogador.src = "/imagens/jogadorcimadireito.png";
        estaPressionada = true;
        } else if (qualLado === "esquerdo") {
            jogador.src = "/imagens/jogadorcimaesquerdo.png";
            estaPressionada = true; 
        }
    } else if (!estaPressionada && tecla.key === "ArrowDown") {
        if (qualLado === "direito") {
        jogador.src = "/imagens/jogadoragachadoladodireito.png";
        jogador.style.width = "40px";
        jogador.style.height = "35px";
        estaPressionada = true;
        } else if (qualLado === "esquerdo") {
            jogador.src = "/imagens/jogadoragachadoladoesquerdo.png";
            jogador.style.width = "40px";
            jogador.style.height = "35px";
            estaPressionada = true; 
        }
    } else if (!estaPulando && tecla.key === " ") {
        if (qualLado === "direito") {
            jogador.src = "/imagens/jogadorandandoladodireito.gif";
        jogador.classList.add("puloJogador");
        audioPulo.play();
        estaPulando = true;
        } else if (qualLado === "esquerdo") {
            jogador.src = "/imagens/jogadorandandoladoesquerdo.gif";
            jogador.classList.add("puloJogador");
            audioPulo.play();
            estaPulando = true;
        }
        setTimeout(() => {
            if (qualLado === "direito") {
                jogador.src = "/imagens/jogadorparadoladodireito.png";
            jogador.classList.remove("puloJogador");
            estaPulando = false;
            } else if (qualLado === "esquerdo") {
                jogador.src = "/imagens/jogadorparadoladoesquerdo.png";
                jogador.classList.remove("puloJogador");
                estaPulando = false;
            }
            depoisPulo();
        }, 500);
    }
}

function teclaSolta(tecla) {
    if (estaPressionada && tecla.key === "ArrowRight") {
        direcao = 0;
        jogador.src = "/imagens/jogadorparadoladodireito.png";
        estaPressionada = false;
    } else if (estaPressionada && tecla.key === "ArrowLeft") {
        direcao = 0;
        jogador.src = "/imagens/jogadorparadoladoesquerdo.png";
        estaPressionada = false;
    } else if (estaPressionada && tecla.key === "ArrowUp") {
        if (qualLado === "direito") {
        jogador.src = "/imagens/jogadorparadoladodireito.png";
        estaPressionada = false;
        } else if (qualLado === "esquerdo") {
            jogador.src = "/imagens/jogadorparadoladoesquerdo.png";
            estaPressionada = false; 
        }
    } else if (estaPressionada && tecla.key === "ArrowDown") {
        if (qualLado === "direito") {
        jogador.src = "/imagens/jogadorparadoladodireito.png";
        jogador.style.width = "45px";
        jogador.style.height = "45px";
        estaPressionada = false;
        } else if (qualLado === "esquerdo") {
            jogador.src = "/imagens/jogadorparadoladoesquerdo.png";
            jogador.style.width = "45px";
            jogador.style.height = "45px";
            estaPressionada = false; 
        }
    }
}

function depoisPulo() {
    if(estaPressionada && qualLado === "direito") {
        jogador.src = "/imagens/jogadorandandoladodireito.gif";
    } else if(estaPressionada && qualLado === "esquerdo") {
        jogador.src = "/imagens/jogadorandandoladoesquerdo.gif";
    }
}

function atualizarMovimentos() {
    posicao += direcao * velocidade;
    if (posicao < 0) {
        posicao = 0;
    } else if (posicao + larguraJogador > larguraGame) {
        posicao = larguraGame - larguraJogador;
    }
    jogador.style.left = posicao + "px";
}

function removerTeclas() {
    document.removeEventListener("keydown", teclaPressionada);
    document.removeEventListener("keyup", teclaSolta);
}

function colisaoBloco1() {
    const checarBloco1 = bloco1.getBoundingClientRect();
    const checarJogador = jogador.getBoundingClientRect();
    if (
        checarBloco1.left < checarJogador.right &&
        checarBloco1.right > checarJogador.left &&
        checarBloco1.top < checarJogador.bottom &&
        checarBloco1.bottom > checarJogador.top
    ) {
        clearInterval(checarColisaoBloco1);
        bloco1.src = "/imagens/blocovazio.png";
        audioid.play();
        const ItemAleatoria = Math.floor(Math.random() * 2 + 1);
        if (ItemAleatoria === 1) {
            vidaExtra.classList.add("animaItens");
            vidaExtra.style.display = "block";
        } else if (ItemAleatoria === 2) {
            cogumelo.classList.add("animaItens");
            cogumelo.style.display = "block";
        }
        bloco1.style.top = "160px";
        setTimeout(() => {
            bloco1.style.top = "170px";   
        }, 90);
            setTimeout(() => {
                checarColisaoBloco1Vazio = setInterval(colisaoBloco1Vazio, 10);
            }, 500);
    }
}

vidaExtra.addEventListener("animationend", function () {
    vidaExtra.style.animation = "animaContinua 5s linear forwards";
});

cogumelo.addEventListener("animationend", function () {
    cogumelo.style.animation = "animaContinua 5s linear forwards";
});

function colisaoItens() {
    const checarCogumelo = cogumelo.getBoundingClientRect();
    const checarVidaExtra = vidaExtra.getBoundingClientRect();
    const checarJogador = jogador.getBoundingClientRect();
    if (
        checarVidaExtra.left < checarJogador.right &&
        checarVidaExtra.right > checarJogador.left &&
        checarVidaExtra.top < checarJogador.bottom &&
        checarVidaExtra.bottom > checarJogador.top
    ) {
        clearInterval(checarColisaoItens);
        vidasAtual++;
        vidas.textContent = vidasAtual;
        audiove.play();
        pontosAtual += +100;
        pontos.textContent = pontosAtual;
        vidaExtra.remove();
        cogumelo.remove();
        ganhouv.classList.add("animaImagemVida");
        ganhouv.style.display = "block";
        ganhouv.style.left = posicao + "px";
        setTimeout(() => {
            ganhouv.classList.remove("animaImagemVida");
            ganhouv.style.display = "none";
        }, 1000);
}
    if (
        checarCogumelo.left < checarJogador.right &&
        checarCogumelo.right > checarJogador.left &&
        checarCogumelo.top < checarJogador.bottom &&
        checarCogumelo.bottom > checarJogador.top
) {
    clearInterval(checarColisaoItens);
    pontosAtual += +100;
    pontos.textContent = pontosAtual;
    audioci.play();
    vidaExtra.remove();
    cogumelo.remove();
}
}

function colisaoBloco1Vazio() {
    const checarBloco1 = bloco1.getBoundingClientRect();
    const checarJogador = jogador.getBoundingClientRect();
    if (
        checarBloco1.left < checarJogador.right &&
        checarBloco1.right > checarJogador.left &&
        checarBloco1.top < checarJogador.bottom &&
        checarBloco1.bottom > checarJogador.top
    ) {
        clearInterval(checarColisaoBloco1Vazio);
        bloco1.src = "/imagens/blocovazio.png";
        audioColisao.play();
        bloco1.style.top = "160px";
        setTimeout(() => {
            bloco1.style.top = "170px";   
        }, 90);
        setTimeout(() => {
            checarColisaoBloco1Vazio = setInterval(colisaoBloco1Vazio, 10);
        }, 500);
    }
}

function colisaoBloco2() {
    const checarBloco2 = bloco2.getBoundingClientRect();
    const checarJogador = jogador.getBoundingClientRect();
    if (
        checarBloco2.left < checarJogador.right &&
        checarBloco2.right > checarJogador.left &&
        checarBloco2.top < checarJogador.bottom &&
        checarBloco2.bottom > checarJogador.top
    ) {
        clearInterval(checarColisaoBloco2);
        colisaoMaxima++;
        moedasAtual++;
        moedas.textContent = moedasAtual;
        audioMoeda.play();
        pontosAtual += +10;
        pontos.textContent = pontosAtual;
        if (moedasAtual >= 5) {
            vidasAtual++;
            vidas.textContent = vidasAtual;
            audiove.play();
            moedasAtual = 0;
            moedas.textContent = moedasAtual;
        }
        bloco2.style.top = "160px";
        setTimeout(() => {
            bloco2.style.top = "170px";   
        }, 90);
        if (colisaoMaxima < 5) {
            setTimeout(() => {
                checarColisaoBloco2 = setInterval(colisaoBloco2, 10);
            }, 500);
        } else if (colisaoMaxima >= 5) {
            clearInterval(checarColisaoBloco2);
            checarColisaoBloco2Vazio = setInterval(colisaoBloco2Vazio, 10);
        }
    }
}

function colisaoBloco2Vazio() {
    const checarBloco2 = bloco2.getBoundingClientRect();
    const checarJogador = jogador.getBoundingClientRect();
    if (
        checarBloco2.left < checarJogador.right &&
        checarBloco2.right > checarJogador.left &&
        checarBloco2.top < checarJogador.bottom &&
        checarBloco2.bottom > checarJogador.top
    ) {
        clearInterval(checarColisaoBloco2Vazio);
        bloco2.src = "/imagens/blocovazio.png";
        audioColisao.play();
        bloco2.style.top = "160px";
        setTimeout(() => {
            bloco2.style.top = "170px";   
        }, 90);
        setTimeout(() => {
            checarColisaoBloco2Vazio = setInterval(colisaoBloco2Vazio, 10);
        }, 500);
    }
}

function colisaoBloco3() {
    const checarBloco3 = bloco3.getBoundingClientRect();
    const checarJogador = jogador.getBoundingClientRect();
    if (
        checarBloco3.left < checarJogador.right &&
        checarBloco3.right > checarJogador.left &&
        checarBloco3.top < checarJogador.bottom &&
        checarBloco3.bottom > checarJogador.top
    ) {
        clearInterval(checarColisaoBloco3);
        bloco3.src = "/imagens/blocovazio.png";
        audioColisao.play();
        bloco3.style.top = "160px";
        setTimeout(() => {
            bloco3.style.top = "170px";   
        }, 90);
        setTimeout(() => {
            checarColisaoBloco3 = setInterval(colisaoBloco3, 10);
        }, 500);
    }
}

function carregarJogo() {
    clearInterval(checarTempo);
    document.addEventListener("keydown", teclaPressionada);
    document.addEventListener("keyup", teclaSolta);
   checarMovimentos = setInterval(atualizarMovimentos, 50);
   checarTempo = setInterval(relogio, 1000);
   checarColisaoBloco1 = setInterval(colisaoBloco1, 10);
   checarColisaoBloco2 = setInterval(colisaoBloco2, 10);
   checarColisaoBloco3 = setInterval(colisaoBloco3, 10);
   checarColisaoItens = setInterval(colisaoItens, 10);
}

window.addEventListener("DOMContentLoaded", carregarJogo);
