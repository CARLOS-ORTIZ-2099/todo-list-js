import { alertDelete } from "../helper/alertDelete.js"
const d = document
const container = d.querySelector('.form-container')
const textsContainer = d.querySelector('.texts-container')
let arrayTask = []

container.addEventListener('submit', createTask)
document.addEventListener('DOMContentLoaded', getLs)

function getLs() {
   let taskLs =  JSON.parse(localStorage.getItem('arrayTask'))
    if(taskLs){
        arrayTask = taskLs
        render()
    }
}

function createTask(e) {
    e.preventDefault()
    let title = e.target.tarea.value
    let data = e.target.datos.value
    if(title.length < 1 || data.length < 1){
        alert('ambos campos son requeridos')
        return
    }
     let task = {id : new Date().getTime(), title, data,fecha:new Date().toLocaleString()}
     arrayTask.push(task)
     localStorage.setItem('arrayTask', JSON.stringify(arrayTask))
     console.log(arrayTask)
     container.reset()
     createHtml(task)
}

function createHtml(task) {
    let div = document.createElement('div')
    div.id = task.id, div.classList.add('contenedor')
    div.innerHTML= `
        <h1 class = 'text'>${task.title}</h1>
        <textarea class='textarea toggle'></textarea>
        <span>tarea a realizar:</span>
        <p class = 'text' >${task.data}</p>
        <textarea class='textarea toggle'></textarea>
        <h2>fecha de creacion: ${task.fecha}</h2>
        <button class = 'delete btn btn-danger'>eliminar</button>
        <button class = 'edit btn btn-success'>editar</button>
    `
    textsContainer.appendChild(div)
}

function filtrar(e){
    let  parentNode = e.target.parentNode
    console.log(arrayTask)
    arrayTask =  arrayTask.filter(element => element.id!= parentNode.id)
    console.log(arrayTask);
    localStorage.setItem('arrayTask',JSON.stringify(arrayTask))
    parentNode.remove()
}

function render () {
    let texto = ''
    for(let i = 0; i < arrayTask.length; i++){
        texto+=`<div id=${arrayTask[i].id} class = 'contenedor'> 
            <h1 class = 'text'>${arrayTask[i].title}</h1>
            <textarea class='textarea toggle'></textarea>
            <span>tarea a realizar:</span>
            <p class = 'text' >${arrayTask[i].data}</p>
            <textarea class='textarea toggle'></textarea>
            <h2>fecha de creacion: ${arrayTask[i].fecha}</h2>
            <button class = 'delete btn btn-danger'>eliminar</button>
            <button class = 'edit btn btn-success'>editar</button>
        </div>`
    }
    textsContainer.innerHTML = texto
     // Agregar eventos de eliminación a cada botón
}

function editTask(e){
    let target = e.target.parentNode
    console.log(target);
    const contentTarea =  target.querySelectorAll('.textarea')
    const texts = target.querySelectorAll('.text')
    contentTarea.forEach((element, index) => {
        element.classList.toggle('toggle')
        texts[index].classList.toggle('toggle')
    })
    if(contentTarea[0].value.length > 0 && contentTarea[1].value.length > 0){
        alert('editando')
        arrayTask = arrayTask.map((task) => task.id == target.id ? {...task,title : contentTarea[0].value, data : contentTarea[1].value} : task)
        console.log(arrayTask);
        localStorage.setItem('arrayTask',JSON.stringify(arrayTask))
        texts[0].textContent = contentTarea[0].value, texts[1].textContent = contentTarea[1].value 
    }
    contentTarea[0].value = '', contentTarea[1].value = ''
}

document.addEventListener('click', async (e) => {
    if(e.target.matches('.delete')){
        const isDelete = await alertDelete()
        isDelete ? filtrar(e) : ''
    }
    else if(e.target.matches('.edit')){
        editTask(e)
    }
})





/* 
    NOTA SOBRE EL ACCESO A LOS HIJOS QUE ESTEN OCULTOS EN EL DOM

    en ese caso específico, estás accediendo al cuarto hijo del elemento padre (e.target.parentNode.children[3]), lo cual puede funcionar incluso si el cuarto hijo está oculto mediante la propiedad display: none.

    El acceso directo a través de la propiedad children te permite acceder a todos los hijos, ya sean visibles u ocultos. Esto es diferente de querySelector, que se basa en selectores CSS y no seleccionaría elementos ocultos mediante display: none.
*/
