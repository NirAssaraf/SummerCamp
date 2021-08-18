import React, { Component } from 'react';
import './NewFoodMenuEvent.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import ImageUploading from '../ImageUploading/SingleFileUploadComponent';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Divide as Hamburger } from 'hamburger-react'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Config from '../../config/config';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { isAuth } from '../../actions/auth';

registerLocale('es', es)
export default class Event extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
     

delete:false,
      menu:'',

    }

  
this.getMenu=this.getMenu.bind(this);
this.deleteEvent=this.deleteEvent.bind(this);


  }

componentDidMount(){
  this.setState({menu:this.getMenu(this.props.event.category)})

  

}
deleteEvent(){
   
  axios.delete(Config.getServerPath()+'menu/'+this.props.event._id+'/'+this.props.day._id)
  .then(res => {
    console.log(res.data.status)
if(res.data.status===404){
return
}
this.setState({delete:true})

  })
  .catch(() => {}   );
}

getMenu(menu){
  if(menu==10)
  return 'ארוחת בוקר';

  if(menu==20)
  return 'ארוחת צהריים';
  
  if(menu==30)
  return 'ארוחת אחר הצהריים';

  
}
  render() {
    // if(this.props.user===null)
    // return <Redirect to={'/'}/>;
    if (this.state.exit)
      return <Redirect to={'/FoodMenu'} />;
      if(this.state.delete) return '';
    return (

      <div className={this.props.big?'event-menu':'event-menu-small'} style={{display:'flex'}} dir="rtl">
        
            {/* <p className={this.props.big?'time':'time-small'}>{this.state.menu} -</p> */}
        <p className={this.props.big?'discription-menu':'discription-menu-small'}> <span class="iconify" data-icon="ic:baseline-restaurant-menu" data-inline="false"></span>  {this.props.event.discription}</p>
        {(isAuth().type=='0'||isAuth().type=='2') &&!this.props.big?  <button onClick={this.deleteEvent} className='delete-event-b'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>:''}



      

     
      </div>
    );
  }
}
