import {View} from '../view';
import {Motor} from '../../engines/motor'

export class Panel extends View{

    private sColor:string=null;
    
    
    public setColor(vsColor:string):void{
        this.sColor=vsColor;
    }
    
    paint(vctx:CanvasRenderingContext2D){
        
        if(this.sColor != null){
        vctx.fillStyle = this.sColor;  
        vctx.fillRect(this.x, this.y, this.w, this.h);
        }
    }


}