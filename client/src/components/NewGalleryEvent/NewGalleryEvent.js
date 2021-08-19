import React, { Component,Fragment } from 'react';
import './NewGalleryEvent.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import ImageUploading from '../ImageUploading/MultiFileUploadComponent';
import Event from './Event';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Config from '../../config/config';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
registerLocale('es', es)
export default class NewGalleryEvent extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
  
      exit: false,



      startDate:new Date(),
      Photos:[],
     
      updateMode:false,
      add:false,
      

 

    }

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeSelectMenu = this.handleChangeSelectMenu.bind(this);

    this.addEvet = this.addEvet.bind(this);
    this.openNew = this.openNew.bind(this);
    this.handleAddEvent = this.handleAddEvent.bind(this);
    this.ClearError = this.ClearError.bind(this);



  }
  componentDidMount(){
    if(this.props.location.update){

      this.setState({updateMode:true})
      let date=this.props.location.date
      let d=new Date(date);
      this.setState({startDate:d})
    
   
    }
  }
  handl
  handleAddEvent(item){

    const postData = {
      date: this.state.startDate,
      photos: item,
  };
    axios.post(Config.getServerPath()+'photo',postData)
    .then(res => {
if(res.data.status===400){
  console.log('error')
return
}
console.log(res.data)
this.props.updateGalleryEvent(res.data.day);

this.setState({ exit: true });


    })
    .catch(() => {    console.log('send')
  }   );



  }
  ClearError(){

    this.setState({discriptionE:false})
    this.setState({menuE:false})
 


  }
  addEvet(url) {
   let item=this.state.Photos;
   url.map((img,index)=>{
    item.push( img);

   })
    // use.push(this.state.startTime)
    console.log(item)
   this.setState({Photos:item})
   this.handleAddEvent(item);
  //  this.setState({add:!this.state.add});
  this.setState({ exit: true });


  }
  
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ exit: true });

  };
  handleChangeSelectMenu(event) {
    this.setState({ menu: event.target.value });

  }
 
  openNew(){

    this.setState({add:!this.state.add});
  }


  render() {
    if(this.props.user.type!=='0'&&this.props.user.type!=='2')
    return <Redirect to={'/'}/>;
    if (this.state.exit)
      return <Redirect to={'/GalleryPlan'} />;
    return (

      <div className='new-img-event' dir="rtl">

        <h3 className='titel-new-event'><u>הוספת אלבום תמונות</u> </h3>
        <DatePicker disabled={this.state.updateMode} id='date-piker'   dateFormat="dd/MM/yy" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
        {/* <button  onClick={this.openNew} className='menu-add-btn'>הוספת תמונה </button> */}
        {/* {this.state.add?( */}
<div id='form-event-div-g'>
       <ImageUploading addEvet={this.addEvet} close={this.handleClose}/>
      {/* <button onClick={this.addEvet} className='event-add-btn'>הוספה</button> */}
      </div>
      {/* ):''} */}
        <br />
        {/* <div className='menu-type'>
        { this.state.Photos.map((item,index)=>{
          return  <Event key={index} event={item} big={true}/>

        })}
        </div> */}
       
      {/* <div className='btn' >
        <Button onClick={this.handleAddEvent} id='Gallery-submit-event' >שליחה</Button>
        <Button onClick={this.handleClose} id='Gallery-submit-event-cancel' >ביטול</Button>
        </div> */}
      </div>

    );
  }
}
