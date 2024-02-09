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
     render()
}


function filtrar(e){
    let  id = e.target.parentNode.id
    console.log(arrayTask)
    arrayTask =  arrayTask.filter(element => element.id!= id)
    console.log(arrayTask);
    localStorage.setItem('arrayTask',JSON.stringify(arrayTask))
    render()
}


function render () {
    let texto = ''
    for(let i = 0; i < arrayTask.length; i++){
        texto+=`<div id=${arrayTask[i].id} class = 'contenedor'> 
            <h1>${arrayTask[i].title}</h1>
            <span>tarea a realizar:</span>
            <p>${arrayTask[i].data}</p>
            <textarea class='toggle'></textarea>
            <h2>fecha de creacion: ${arrayTask[i].fecha}</h2>
            <button class = 'delete btn btn-danger'>eliminar</button>
            <button class = 'edit btn btn-success'>editar</button>
        </div>`
    }
    textsContainer.innerHTML = texto

     // Agregar eventos de eliminación a cada botón
     const deleteButtons = d.querySelectorAll('.delete');

     deleteButtons.forEach(button => button.addEventListener('click',async (e) => {
        const isDelete = await alertDelete()
        isDelete ? filtrar(e) : ''
       
     }));

     // agregar eventos de edicion para cada boton
     const editButtons = d.querySelectorAll('.edit');
     editButtons.forEach(button => button.addEventListener('click', editTask));

}


function editTask(e){
    let target = e.target.parentNode
    console.log(target);
    let contentTarea =  target.children[2]
    let textArea =  target.children[3]
    contentTarea.classList.toggle('toggle')
    textArea.classList.toggle('toggle')
    if(textArea.value.length > 0){
        arrayTask = arrayTask.map((task) => task.id == target.id ? {...task, data : textArea.value} : task)
        console.log(arrayTask);
        localStorage.setItem('arrayTask',JSON.stringify(arrayTask))
        render()
    }
     
}








/* 
    NOTA SOBRE EL ACCESO A LOS HIJOS QUE ESTEN OCULTOS EN EL DOM

    en ese caso específico, estás accediendo al cuarto hijo del elemento padre (e.target.parentNode.children[3]), lo cual puede funcionar incluso si el cuarto hijo está oculto mediante la propiedad display: none.

    El acceso directo a través de la propiedad children te permite acceder a todos los hijos, ya sean visibles u ocultos. Esto es diferente de querySelector, que se basa en selectores CSS y no seleccionaría elementos ocultos mediante display: none.
*/
