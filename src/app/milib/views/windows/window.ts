import {View} from '../view';
import {Motor} from '../../engines/motor';
import {EventsAdmin} from '../../events/eventsadmin';
import {DataHolder} from '../../dataholder/dataholder';
import {Imagen} from '../imagenes/imagen';
import {Button} from '../buttons/button';


/**
 * Clase que hereda de View y se encarga de pintar un elemento visual compuesto Boton por un Label y una Imagen.
 */
export class Window extends View {

    private sColor:string=null;
    public btnSalir:Button=null;




    constructor(vmotor:Motor,vX:number,vY:number,vW:number,vH:number){
        super(vmotor,vX,vY,vW,vH);

        this.btnSalir=new Button(this.motor,DataHolder.instance.nScreenWidth*0.7,0,DataHolder.instance.nScreenWidth*0.15,DataHolder.instance.nScreenHeight*0.1);
        this.motor.addViewToParentView(this,this.btnSalir);
        this.btnSalir.setImagePath('./assets/images.png');
        this.btnSalir.setTexto("Salir");



    }

    /**
     * Metodo paint del boton (ademas de pintar los hijos, label e imagen, aqui iria el codigo que queramos dar al boton (padre)
     * para pintarse)
     * @param vctx Contexto donde se va a pintar
     */
    paint(vctx:CanvasRenderingContext2D){

        //console.log(this.xa+"========== "+this.ya);
    }



}
