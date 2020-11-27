import style from './AddModalImage.module.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'; 
import Fab from '@material-ui/core/Fab';
import {Component} from 'react' 
import CancelIcon from '@material-ui/icons/Cancel';




class AddModalImage extends Component{

state={
    imageInView:null
}
componentDidMount(){

      this.counter=0
 this.coruselSlide=document.querySelector('#'+this.props.uniqueid)
 this.courouselImages=document.querySelectorAll('#'+this.props.uniqueid+' img')
 this.size=this.courouselImages[0].clientWidth
    
//  coruselSlide.style.transform="translateX("+(-size*counter)+"px)"
//  console.log("Corousel Image Length",courouselImages.length)
console.log('#'+this.props.uniqueid," element ",this.courouselImages)
}

onClickLeft=(event)=>{
    this.courouselImages=document.querySelectorAll('#'+this.props.uniqueid+' img')
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
    this.courouselImages=document.querySelectorAll('#'+this.props.uniqueid+' img')
   if(this.counter===this.props.src.length-1){
       this.counter===this.props.src.length-1
        return;
   }
   this.counter++
   this.coruselSlide.style.transition="transform 0.2s ease-in-out"
   this.coruselSlide.style.transform="translateX("+(-this.size*this.counter)+"px)"
  
}

render(){
    console.log("AddImageView Rendered")
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
        <div  className={style.image} style={{maxHeight:this.props.maxHeight}}>
        
        {/* {this.props.src.map((s,i)=>{
            
           
            return(
                <img  key={s['id']} style={{height:"auto",width:"100%"}} imageid={s['id']} src={s['src']}/> 
                
                
            )
             
        }
        )} */}
        
      
        </div>
        </div>
          {
            this.props.src.length>1?
        <div className={style.arrow}  style={{right:'-27px'}}>
            <Fab onClick={this.onClickRight} style={{textAlign:'center',backgroundColor:'#ffffff'}}>
            <ArrowForwardIosIcon className={style.rightIcon}/>
            </Fab>
        </div>
        :null   
        }
        </React.Fragment>
    )

}
 

}
export default AddModalImage