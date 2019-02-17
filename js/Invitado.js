class Invitado{

    constructor(name){
        this.name=name;
        this.confirmado=false;
        this.editable=false;
        this.aceptar=false;
        this.borrable=false;//false=remove true=cancelar
    }

    setname(name){
        this.name=name;
    }

    getname(){
        return this.name;
    }

    getconfirmado(){
        return this.confirmado;
    }

    geteditable(){
        return this.editable;
    }

    getaceptar(){
        return this.aceptar;
    }

    getborrable(){
        return this.borrable;
    }

    setconfirmado(){
        if(this.confirmado==false){
            this.confirmado=true;
        }else{
            this.confirmado=false;
        }
    }

    cambiarEditable(){
        this.editable=!this.editable;
    }

    cambiarAceptar(){
        this.aceptar=!this.aceptar;
    }

    cambiarBorrable(){
        this.borrable=!this.borrable;
    }   


}