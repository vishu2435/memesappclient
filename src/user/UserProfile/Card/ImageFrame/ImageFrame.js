import style from './Image.module.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'; 
import Fab from '@material-ui/core/Fab';
import React, {Component} from 'react' 





class ImageFrame extends Component{


componentDidMount(){

      this.counter=0
 this.coruselSlide=document.querySelector('#'+this.props.uniqueid)
 this.courouselImages=document.querySelector('#'+this.props.uniqueid+' img')
 this.size=this.courouselImages.clientWidth
    
console.log('#'+this.props.uniqueid," element ",this.courouselImages)
}

onClickLeft=(event)=>{
   
   if(this.counter===0){
       this.counter=0
       return;
   }
   console.log(this.coruselSlide)
   this.counter--
   
   this.coruselSlide.style.transition="transform 0.2s ease-in-out"
   this.coruselSlide.style.transform="translateX("+(-this.size*this.counter)+"px)"
}
onClickRight=(event)=>{
   if(this.counter===this.props.src.length-1){
       this.counter===this.props.src.length-1
       return;
   }
   this.counter++
   this.coruselSlide.style.transition="transform 0.2s ease-in-out"
   
   this.coruselSlide.style.transform="translateX("+(-this.size*this.counter)+"px)"
  
}


render(){
    return( <React.Fragment>
        {/* {
            this.props.src.length>1?
                <div className={style.arrow} style={{left:'-27px'}}>
                    <Fab onClick={this.onClickLeft} style={{textAlign:'center',backgroundColor:'#ffffff'}}>
                     <ArrowBackIosIcon className={style.leftIcon}/>
                     </Fab>
                    </div>
                     :null   
        } */}
        <div style={{width:"100%","overflow":"hidden"}}>
        <div id={this.props.uniqueid} className={style.image} style={{maxHeight:this.props.maxHeight}}>
        <img style={{height:"auto",width:"100%"}} src={this.props.src}/> 
        {/* {this.props.src.map((s,i)=>{
            
           
            return(
                <img key={i} style={{height:"auto",width:"100%"}} src={s}/> 
            )
             
        }
        )} */}
        
      
        </div>
        </div>
          {/* {
            this.props.src.length>1?
        <div className={style.arrow}  style={{right:'-27px'}}>
            <Fab onClick={this.onClickRight} style={{textAlign:'center',backgroundColor:'#ffffff'}}>
            <ArrowForwardIosIcon className={style.rightIcon}/>
            </Fab>
        </div>
        :null   
        } */}
        </React.Fragment>
    )

}
 

}
export default ImageFrame