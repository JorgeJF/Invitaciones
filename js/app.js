const  entrada= document.getElementsByName("submit");
const  check= document.querySelectorAll("input[type=checkbox]");
const edit=document.querySelectorAll("li>button");
var invitados= new Array();


entrada[0].addEventListener('click', () => {
    const  nombre= document.getElementsByName("name")[0].value;
    if(comprobar_nombre(nombre)){
        var invitado=new Invitado(nombre);
        invitados.push(invitado);
        anadir(invitado);

    }
    
});

function comprobar_nombre(nombre, indice){
    if(nombre==""){
        alert("usuario sin nombre");
        return false;
    }else{

        for (let i=0; i<invitados.length; i++) {
           if (invitados[i].getname()==nombre){
               if(i==indice){
                   return true;
               }else{
                alert("usuario ya existe");
                return false;

               }
               
           }
        }
        return true;
    }
}


function anadir(invitado){

    var span = document.createElement("span");
    var textspan = document.createTextNode(invitado.getname());

    if(textspan==""){
        alert("texto vacio");
        
    }
    span.appendChild(textspan);

    var input = document.createElement("input");
    input.type= "checkbox";

    var label = document.createElement("label");
    var textlabel = document.createTextNode("Confirmed");
    label.appendChild(textlabel);
    label.appendChild(input);
    
    var button1 = document.createElement("button");
    var textbutton1 = document.createTextNode("edit");
    button1.appendChild(textbutton1); 

    button2 = document.createElement("button");
    textbutton2 = document.createTextNode("remove");
    button2.appendChild(textbutton2); 

    var li = document.createElement("li");
    li.appendChild(span);
    li.appendChild(label);     
    li.appendChild(button1); 
    li.appendChild(button2); 
    document.getElementById("invitedList").appendChild(li);
    confirmar(invitado);
    modificar(invitado);
    pulsar_eliminar(invitado);
    mostrar_confirmados();

}

function mostrar_confirmados(){
    
    const  check_confirmados= document.getElementById("confirmados");
        check_confirmados.addEventListener('click', () => {  
            ocultar_invitados(check_confirmados);
        });   
}

function ocultar_invitados(check_confirmados){
    

    const li= document.getElementsByTagName("li");

    if(check_confirmados.checked == true){
        for(let i=0; i<li.length;i++){
            if(invitados[i].getconfirmado()){
            }else{
                li[i].style.display="none";
                li[i].style.float="right";
            }
        }
    }else{
        for(let i=0; i<li.length;i++){
            li[i].style.display="";
        }
    }
}


/*funcion para confirmar o desconfirmar invitados*/
function confirmar(invitado){
    const indice=invitados.indexOf(invitado);
    console.l
    const  check= document.querySelectorAll("input[type=checkbox]")[indice+1];//+1 para saltarme el mostrar solo los confirmados
    console.log(check);
        check.addEventListener('click', () => {
            const li= document.getElementsByTagName("li");
            invitados[indice].setconfirmado();
            if(invitados[indice].getconfirmado()){
                li[indice].setAttribute("class", "responded");
            }else{
                li[indice].setAttribute("class", "");
            }   
        });   
}

function pulsar_eliminar(invitado){
    const indice=invitados.indexOf(invitado);
    const  edit= document.querySelectorAll("li>:nth-child(3)")[indice];
    const  remove= document.querySelectorAll("li>:nth-child(4)")[indice];
    remove.addEventListener('click', () =>{
        eliminar(invitado, remove, indice, edit);
    });

}

function eliminar(invitado, remove, indice, edit){
    invitado.cambiarBorrable();
    if(invitado.getborrable()){
        //funcion que me modifica el boton de borrar para que ponga cancelar
        poner_cancelar(remove,invitado, edit);
    }else{
        //funcion que cancela el borrado y pone de nuevo el boton a borrar
        poner_borrar(remove,invitado, edit);
    }
}

function poner_cancelar(remove,invitado, edit){
    remove.textContent="cancel"; 
    edit.textContent="yes"; 
    invitado.cambiarAceptar();
}

function poner_borrar(remove,invitado, edit){
    remove.textContent="remove"; 
    edit.textContent="edit"; 
    invitado.cambiarAceptar();
}

function borrar(invitado){
    const indice=invitados.indexOf(invitado);
    console.log(invitados);
    if(invitados.length<1){

        const elemento_unico =document.querySelectorAll("ul>:first-child").item(0) ;
        invitados.splice(0, 1);
        elemento_unico.remove();
    }else{

        const elemento =document.querySelectorAll("ul>:nth-child("+(indice+1)+")").item(0) ;
        invitados.splice(indice, 1);
        elemento.remove();
        console.log("lista de invitados tras eliminar");
        console.log(invitados);
        console.log("indice del invitado que se ha eliminado eliminar");
        console.log(indice);
        
    }
    
}

/*funcion que añade el listener de editar*/
function modificar(invitado){

    const indice=invitados.indexOf(invitado);
    const  edit= document.querySelectorAll("li>:nth-child(3)")[indice];
    edit.addEventListener('click', () =>{
        cambiar(invitado, edit, indice);
    });
}

/*funcion para decidir si debo editar , guardar confirmar el borrado al pulsar sobre la tecla*/
function cambiar(invitado, edit, indice){

    if(invitado.getaceptar()){
        /*funcion que borra el invitado, en este momento el boton edit mostrara "yes" para confirmar el borrado del elemento*/
        borrar(invitado);

    }else{

        invitado.cambiarEditable();

        if(invitado.geteditable()){
                editar(edit,indice);
        }else{
            guardar(edit,invitado, indice);
        }

    }
    
}

/*funcion que permite la edicion del nombre del invitado*/
function editar(edit, indice){
        const li= document.getElementsByTagName("li");
        const span = li[indice].querySelectorAll("span");
        span[0].setAttribute("contentEditable", "true");
        edit.textContent="save"; 

}

/*funcion que guarda el nombre del invitado*/
function guardar(edit,invitado, indice){
        
        const li= document.getElementsByTagName("li");
        const span = li[indice].querySelectorAll("span");
        if(comprobar_nombre(span[0].textContent, indice)==true){
            invitado.setname(span[0].textContent);
            span[0].setAttribute("contentEditable", "false");
            edit.textContent="edit";

        }
        
}