const d = document
const button = d.querySelector('.button')
const container = d.querySelector('.form-container')
const textsContainer = d.querySelector('.texts-container')
let arrayTask = []

/* let dat = new Date().toLocaleDateString()
console.log(dat) */
container.addEventListener('submit', createTask)

window.addEventListener('DOMContentLoaded', getLs)

function getLs() {
   let taskLs =  JSON.parse(localStorage.getItem('arrayTask'))
   
    if(taskLs){
        arrayTask = taskLs
        console.log('entro a la funcion')
        add()
    }

}


function createTask(e) {
    e.preventDefault()
    let title = e.target.tarea.value
    let data = e.target.datos.value

     let task = {id : new Date().getTime(), title, data,fecha:new Date().toLocaleString()}
     console.log(task)
     arrayTask.push(task)
     console.log(arrayTask)
     
     e.target.tarea.value = ''
     e.target.datos.value = ''
     add()
}



function add () {
    let texto = ''
    for(let i = 0; i < arrayTask.length; i++){
        texto+=`<div id=${arrayTask[i].id} class = 'contenedor'> 
            <h1>${arrayTask[i].title}</h1>
            <span>tarea a realizar:</span>
            <p>${arrayTask[i].data}</p>
            <textarea class='toggle'></textarea>
            <h2>fecha de creacion: ${arrayTask[i].fecha}</h2>
            <button class = 'delete'>eliminar</button>
            <button class = 'edit'>editar</button>
        </div>`
    }
    textsContainer.innerHTML = texto

    localStorage.setItem('arrayTask', JSON.stringify(arrayTask))

     // Agregar eventos de eliminación a cada botón
     const deleteButtons = d.querySelectorAll('.delete');

     deleteButtons.forEach(button => {

         button.addEventListener('click', deleteTask);
         
     });

     // agregar eventos de edicion para cada boton
     const editButtons = d.querySelectorAll('.edit');

     editButtons.forEach(button => {

         button.addEventListener('click', editTask);
         
     });

}


function editTask(e){
        let target = e.target.parentNode
        console.log(target)
      //  console.log(e.target.parentNode.id)
        let contentTarea =  target.children[2]
        let textArea =  target.children[3]
        contentTarea.classList.toggle('toggle')
        textArea.classList.toggle('toggle')

        console.log(textArea.value)
        
        let objeto =  arrayTask.find(e => e.id == target.id)
        console.log(objeto)

        let indice = arrayTask.findIndex(e => e.id == target.id)
        console.log(indice)

        if(textArea.value.length > 0){
            objeto.data = textArea.value
            console.log(objeto)
            contentTarea.textContent = objeto.data;
            arrayTask.splice(indice,1,objeto)
            localStorage.setItem('arrayTask',JSON.stringify(arrayTask))
            getLs()
        }
     
    }



function deleteTask(e) {
    swal.fire({
        title:'eliminar',
        text:'deseas eliminar este mensaje?',
    
        icon:'question',
    
        confirmButtonText:'aceptar',
        confirmButtonColor:'green',
    
        showCancelButton:true,
        cancelButtonText:'cancelar',
        cancelButtonColor:'red',
    
        allowOutsideClick:false, // con esto evito que el usuario haga click afuera
        allowEscapeKey:false, // con esto evito que el usuario pueda salir de la alerta con la 
     
       
    }).then((result)=> {
        console.log(result)
        if(result.isConfirmed){
            console.log(result.isConfirmed)
            swal.fire('Éxito', 'El mensaje ha sido eliminado correctamente', 'success');
            filtrar(e)
        }
        else if(result.dismiss === swal.DismissReason.cancel){
            console.log(result.dismiss)
            console.log(swal.DismissReason)
            swal.fire('Error', 'La eliminación ha sido cancelada', 'error');
          
        }
        
    })
   
}


 function filtrar(e){
    let  id = e.target.parentNode.id
    console.log(id)
    let filtrado =  arrayTask.filter(element => element.id!= id)
    console.log(filtrado)
    arrayTask = filtrado
    console.log(arrayTask)
    localStorage.setItem('arrayTask',JSON.stringify(arrayTask))
    getLs()
}




/* 
    NOTA SOBRE EL ACCESO A LOS HIJOS QUE ESTEN OCULTOS EN EL DOM

    en ese caso específico, estás accediendo al cuarto hijo del elemento padre (e.target.parentNode.children[3]), lo cual puede funcionar incluso si el cuarto hijo está oculto mediante la propiedad display: none.

    El acceso directo a través de la propiedad children te permite acceder a todos los hijos, ya sean visibles u ocultos. Esto es diferente de querySelector, que se basa en selectores CSS y no seleccionaría elementos ocultos mediante display: none.
*/
