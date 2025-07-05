"use strict";

const original = document.getElementById('original')
const destino = document.getElementById('container-list')
const textoInput = document.getElementById('texto-input')
const copias = []
let copiasDados = []
let contador = 1

document.getElementById('btn-submit').addEventListener("click", () => {
    if(textoInput.value == "") return;

    // Clona conteudo
    const copia = original.cloneNode(true);
    copia.style.display = "flex";
    
    const idUnico = "Card-" + contador++;

    // Muda o conteudo o texto
    copia.querySelector('.msg').textContent = textoInput.value
    copia.id = idUnico

    copia.querySelector('.btn-delete').addEventListener('click', () => {
        copia.remove()

        const index = copias.findIndex(el => el.id === idUnico);
        if(index !== -1){
            copias.splice(index,1)
            copiasDados.splice(index,1)
            localStorage.setItem('copiasSalvas', JSON.stringify(copiasDados))
        }
    })

    copia.querySelector('.btn-edit').addEventListener('click', () => {
        copia.querySelector('.msg').textContent = window.prompt("Editar Tarefa", copia.querySelector('.msg').textContent)

        const index = copias.findIndex(el => el.id === idUnico);
        if(index !== -1){

            copias[index] = copia;
            
            copiasDados = copias.map(el => {
                return{
                    id: el.id,
                    msg: el.querySelector('.msg').textContent
                }
            })
            localStorage.setItem('copiasSalvas', JSON.stringify(copiasDados))
        }
    })

    // Adiciona ao DOM
    destino.appendChild(copia);
    // Adicona ao array
    copias.push(copia)

    copiasDados = copias.map(el => {
        return{
            id: el.id,
            msg: el.querySelector('.msg').textContent
        }
    })

    textoInput.value = ''

    localStorage.setItem('copiasSalvas', JSON.stringify(copiasDados))
})

function carregarCopias(){
    copiasDados = JSON.parse(localStorage.getItem('copiasSalvas') || '[]')

    copiasDados.forEach(dado => {
        criarCopiaComDado(dado)
    });
}

function criarCopiaComDado(dado){
    const copia = original.cloneNode(true);
    copia.style.display = "flex";

    // Muda o conteudo o texto
    copia.querySelector('.msg').textContent = dado.msg
    copia.id = dado.id

    copia.querySelector('.btn-delete').addEventListener('click', () => {
        copia.remove()

        const index = copias.findIndex(el => el.id === copia.id);
        if(index !== -1){
            copias.splice(index,1)
            copiasDados.splice(index,1)
            localStorage.setItem('copiasSalvas', JSON.stringify(copiasDados))
        }
    })

    copia.querySelector('.btn-edit').addEventListener('click', () => {
        copia.querySelector('.msg').textContent = window.prompt("Editar Tarefa", copia.querySelector('.msg').textContent)

        const index = copias.findIndex(el => el.id === copia.id);
        if(index !== -1){
            copias[index] = copia;
            
            copiasDados = copias.map(el => {
                return{
                    id: el.id,
                    msg: el.querySelector('.msg').textContent
                }
            })

            localStorage.setItem('copiasSalvas', JSON.stringify(copiasDados))
        }
    })

    // Adiciona ao DOM
    destino.appendChild(copia);
    // Adicona ao array
    copias.push(copia)
}

document.addEventListener("DOMContentLoaded", () => {
    carregarCopias();
})