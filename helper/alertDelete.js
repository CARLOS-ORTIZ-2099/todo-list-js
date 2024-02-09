export async function alertDelete(e) {
   
    let boolean = await swal.fire({
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
     
       
    })
    
    if(boolean.isConfirmed){
        console.log(boolean.isConfirmed)
        swal.fire('Éxito', 'El mensaje ha sido eliminado correctamente', 'success');
        return true
    }
    else if(boolean.dismiss === swal.DismissReason.cancel){
        console.log(boolean.dismiss)
        console.log(swal.DismissReason)
        swal.fire('Error', 'La eliminación ha sido cancelada', 'error');
        return false
    }

  
   
}
