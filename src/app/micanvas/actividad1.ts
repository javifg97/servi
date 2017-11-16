
import {Panel} from '../milib/views/panels/panel';
import {EventsAdmin,EventsAdminListener} from '../milib/events/eventsadmin';
import {DataHolder} from '../milib/dataholder/dataholder';
import {Motor} from '../milib/engines/motor';
import {Imagen} from '../milib/views/imagenes/imagen';
import {Window} from '../milib/views/windows/window';
import {Button} from '../milib/views/buttons/button';
import {Text} from '../milib/views/texts/text';
import {Pieza} from '../milib/views/piezas/pieza'
export class Actividad1 implements EventsAdminListener{

    private motor:Motor;
    private panelMenu:Panel;
    private imagenFondo:Imagen;
    private btnInicio:Button;
    private btnContinuar:Button;
    private btnSalir:Button;
    private window:Window;
    private arParejas:Array<string[]>;
    private piezaDc1:Pieza;
    private piezaIz1:Pieza;
    private piezaDc2:Pieza;
    private piezaIz2:Pieza;
    private piezaDc3:Pieza;
    private piezaIz3:Pieza;
    private mainGameImg:Imagen;
    private posPareja1:number=-1;
    private posPareja2:number=-1;
    private posPrimera:number=-1;
    private posSegunda:number=-1;



    constructor(vMotor:Motor){
        this.motor=vMotor;
        this.imagenFondo=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.imagenFondo.setImg('./assets/fondo.jpg');
        this.motor.setRaiz(this.imagenFondo);
        this.window = new Window(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.window.btnSalir.setListener(this);
        this.crearEscenarioMenu();
        this.crearEscenarioJuego();
        //this.contador = -1;



    }

    /**
     * OJO!! AUNQUE EN ESTE EJEMPLO SE USE EL PANEL, ES OBLIGATORIO CREAR UN OBJETO WINDOW EN EL MILIB, Y AGREGARLE EL BOTON
     * DE SALIR EN LA ESQUINA COMO SALE EN EL LA PAGINA WEB. HABRA QUE QUITAR EL PANEL Y USAR WINDOW
     */
    private crearEscenarioMenu():void{
        let pmw=DataHolder.instance.nScreenWidth*0.6;
        let pmh=DataHolder.instance.nScreenHeight*0.6;
        let pmx=DataHolder.instance.nScreenWidth2-(pmw>>1);
        let pmy=DataHolder.instance.nScreenHeight2-(pmh>>1);
        this.panelMenu=new Panel(this.motor,pmx,pmy,pmw,pmh);


        this.motor.addViewToParentView(this.imagenFondo,this.panelMenu);

        this.btnInicio=new Button(this.motor,this.panelMenu.w/3,0,this.panelMenu.w/3,this.panelMenu.h/3);
        this.motor.addViewToParentView(this.panelMenu, this.btnInicio);
        this.btnInicio.setImagePath('./assets/images.png');
        this.btnInicio.setTexto("Inicio");
        this.btnInicio.setListener(this);

        this.btnContinuar=new Button(this.motor,this.panelMenu.w/3,this.panelMenu.h/3,this.panelMenu.w/3,this.panelMenu.h/3);
        this.motor.addViewToParentView(this.panelMenu, this.btnContinuar);
        this.btnContinuar.setImagePath('./assets/images.png');
        this.btnContinuar.setTexto("Continuar");
        this.btnContinuar.setListener(this);

        this.btnSalir=new Button(this.motor,this.panelMenu.w/3,this.panelMenu.h/3*2,this.panelMenu.w/3,this.panelMenu.h/3);
        this.motor.addViewToParentView(this.panelMenu, this.btnSalir);
        this.btnSalir.setImagePath('./assets/images.png');
        this.btnSalir.setTexto("Salir");
        this.btnSalir.setListener(this);

        this.motor.addViewToParentView(this.imagenFondo, this.window);
        this.motor.setViewVisibility(this.window.uid, false);

    }

    private crearEscenarioJuego():void{
        // PIEZAS
        this.arParejas= new Array<string[]>();
        this.piezaIz1 = new Pieza(this.motor,DataHolder.instance.nScreenWidth*0.2,DataHolder.instance.nScreenHeight*0.55,this.panelMenu.w/3,this.panelMenu.h/3, "iz");
        this.piezaDc1 = new Pieza(this.motor,DataHolder.instance.nScreenWidth*0.2,DataHolder.instance.nScreenHeight*0.55,this.panelMenu.w/3,this.panelMenu.h/3, "dc");
        this.motor.addViewToParentView(this.window, this.piezaIz1);
        this.motor.addViewToParentView(this.window, this.piezaDc1);
        
        this.piezaIz1.setListener(this);
        this.piezaDc1.setListener(this);

        this.piezaIz2 = new Pieza(this.motor,DataHolder.instance.nScreenWidth*0.2,DataHolder.instance.nScreenHeight*0.55,this.panelMenu.w/3,this.panelMenu.h/3, "iz");
        this.piezaDc2 = new Pieza(this.motor,DataHolder.instance.nScreenWidth*0.2,DataHolder.instance.nScreenHeight*0.55,this.panelMenu.w/3,this.panelMenu.h/3, "dc");
        this.motor.addViewToParentView(this.window, this.piezaIz2);
        this.motor.addViewToParentView(this.window, this.piezaDc2);
        
        this.piezaIz2.setListener(this);
        this.piezaDc2.setListener(this);

        this.piezaIz3 = new Pieza(this.motor,DataHolder.instance.nScreenWidth*0.2,DataHolder.instance.nScreenHeight*0.55,this.panelMenu.w/3,this.panelMenu.h/3, "iz");
        this.piezaDc3 = new Pieza(this.motor,DataHolder.instance.nScreenWidth*0.2,DataHolder.instance.nScreenHeight*0.55,this.panelMenu.w/3,this.panelMenu.h/3, "dc");
        this.motor.addViewToParentView(this.window, this.piezaIz3);
        this.motor.addViewToParentView(this.window, this.piezaDc3);

        this.piezaIz3.setListener(this);
        this.piezaDc3.setListener(this);

        this.mainGameImg=new Imagen(this.motor,0,0,DataHolder.instance.nScreenWidth,DataHolder.instance.nScreenHeight);
        this.mainGameImg.setImg('./assets/mainGameImg.jpg');
        this.motor.addViewToParentView(this.window, this.mainGameImg);
        


        //RESPUESTAS
        this.arParejas = new Array<string[]>();
        let arrAux :string[] = ["Un IceBerg","Un guiri en Mallorca"]
        this.arParejas[0] = arrAux;
        arrAux = ["0.5","2"];
        this.arParejas[1] = arrAux;
        arrAux = ["13 min","0 min"];
        this.arParejas[2] = arrAux;

        for (var i = 0; i < this.arParejas.length; i++) {
            let random:number = Math.floor(Math.random() * 3) + 1
            if (random == 1) {
                
                this.piezaIz1.setTexto(this.arParejas[i][0]);

            }else if (random == 2) {
                this.piezaIz2.setTexto(this.arParejas[i][0]);
            }else if (random == 3) {
                this.piezaIz3.setTexto(this.arParejas[i][0]);
            }
        }

        for (var i = 0; i < this.arParejas.length; i++) {
            let random:number = Math.floor(Math.random() * 3) + 1
            if (random == 1) {
                this.piezaDc1.setTexto(this.arParejas[i][1]);
            }else if (random == 2) {
                this.piezaDc2.setTexto(this.arParejas[i][1]);
            }else if (random == 3) {
                this.piezaDc3.setTexto(this.arParejas[i][1]);
            }
        }


        



    }


    screenSizeChanged?(vWidth:number,vHeight:number):void{
        console.log("SE HA ACTUALIZADO EL TEMAÑO DE LA PANTALLA");
      }

      piezaListenerOnClick?(pz:Pieza):void{
        if(pz == this.piezaDc1){
            for (var i = 0; i < this.arParejas.length; i++) {
                
                    var capa:string =  this.piezaDc1.getTexto();
                    var posAux:number = this.arParejas[i].indexOf(capa)
                if (this.posPrimera < 0 && posAux != -1) {
                    this.posPrimera = posAux;
                    this.posPareja1 = i;
                }else if(this.posPrimera !< 0 && posAux != -1){
                    this.posSegunda = posAux;
                    this.posPareja2 = i;
                    //Crear metodo para comprobar si 
                    this.comprobar();
                }
                
                
            }
            
            this.contador = 0;
            this.motor.setViewVisibility(this.panelMenu.uid,false);
            this.motor.setViewVisibility(this.window.uid,true);
            this.lblPregunta.setTexto(this.arPreguntas[0]);
            this.btnRes1.setTexto(this.arRespuestas[0][0]);
            this.btnRes2.setTexto(this.arRespuestas[0][1]);
            this.btnRes3.setTexto(this.arRespuestas[0][2]);
            this.btnRes4.setTexto(this.arRespuestas[0][3]);

        }else if (btn == this.btnRes4 && this.contador == 0) {
            this.contador = 1;
            this.lblPregunta.setTexto(this.arPreguntas[1]);
            this.btnRes1.setTexto(this.arRespuestas[1][0]);
            this.btnRes2.setTexto(this.arRespuestas[1][1]);
            this.btnRes3.setTexto(this.arRespuestas[1][2]);
            this.btnRes4.setTexto(this.arRespuestas[1][3]);




        }else if(btn == this.btnRes3 && this.contador == 1){
            this.contador = 2;
            this.lblPregunta.setTexto(this.arPreguntas[2]);
            this.btnRes1.setTexto(this.arRespuestas[2][0]);
            this.btnRes2.setTexto(this.arRespuestas[2][1]);
            this.btnRes3.setTexto(this.arRespuestas[2][2]);
            this.btnRes4.setTexto(this.arRespuestas[2][3]);
        }else if(btn == this.btnRes2 && this.contador == 2){
            this.imagenFondo.setImg('./assets/win.png');
            this.motor.setViewVisibility(this.panelMenu.uid,false);
            this.motor.setViewVisibility(this.window.uid,false);

        }else if(btn == this.window.btnSalir){
            this.motor.setViewVisibility(this.window.uid, false);
            this.motor.setViewVisibility(this.panelMenu.uid,true);
        }else if(btn == this.btnContinuar && this.contador != -1){

            this.motor.setViewVisibility(this.panelMenu.uid,false);
            this.motor.setViewVisibility(this.window.uid,true);
            this.lblPregunta.setTexto(this.arPreguntas[this.contador]);
            this.btnRes1.setTexto(this.arRespuestas[this.contador][0]);
            this.btnRes2.setTexto(this.arRespuestas[this.contador][1]);
            this.btnRes3.setTexto(this.arRespuestas[this.contador][2]);
            this.btnRes4.setTexto(this.arRespuestas[this.contador][3]);
        }else if(btn == this.btnSalir){
            this.motor.setViewVisibility(this.panelMenu.uid,false);
            this.imagenFondo.setImg('./assets/findejuego.jpg');
        }
        else{
            this.contador = -1;
            this.motor.setViewVisibility(this.window.uid, false);
            this.motor.setViewVisibility(this.panelMenu.uid,true);
        }



    }
}
}
