const botoes = document.querySelectorAll('.parametro-senha__botao');
const numeroSenha = document.querySelector('.parametro-senha__texto');
const campoSenha = document.getElementById('campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXWYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxwyz';
const numeros = '0123456789';
const simbolos = '!@#$%&*';
const forcaSenha = document.querySelector('.forca');
let tamanhoSenha = 12;
const valorEntropia = document.querySelector('.valorEntropia');
botoes[0].onclick = diminuirSenha;
botoes[1].onclick = aumentarSenha;


function diminuirSenha () {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
        numeroSenha.textContent = tamanhoSenha;
    }
    gerarSenha();
}

function aumentarSenha () {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
        numeroSenha.textContent = tamanhoSenha;
    }
    gerarSenha();
}

// -------------------------------------------------------------------




function gerarSenha () {
    let alfabeto = "";
    if (checkbox[0].checked){
        alfabeto = alfabeto + letrasMaiusculas;
    } if (checkbox[1].checked){
        alfabeto = alfabeto + letrasMinusculas;
    } if (checkbox[2].checked){
        alfabeto = alfabeto + numeros;
    } if (checkbox[3].checked){
        alfabeto = alfabeto + simbolos;

    }
    console.log(alfabeto);
    let senha = "";
    for (let i = 0; i < tamanhoSenha;i++){
        let numeroAleatorio = Math.random()*alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }
    campoSenha.value = senha;
    classificaSenha(alfabeto.length); 
}

gerarSenha();
// -----------------------------------------------------------------


function classificaSenha (tamanhoAlfabeto) {

    let entropia = tamanhoSenha*Math.log2(tamanhoAlfabeto);
    entropia = Math.ceil(entropia);

    console.log(entropia);
    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 49) {
        forcaSenha.classList.add('forte');
    } if (entropia < 50 && entropia > 35) {
        forcaSenha.classList.add('media');
    } if (entropia < 36) {
        forcaSenha.classList.add('fraca');
    }
    valorEntropia.textContent = "Um computador pode levar até " + Math.floor(2**entropia/(100e6*60*60*24)) + " dias para descobrir essa senha.";
}

