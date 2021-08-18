import React, {Component} from 'react';
import PoolBack from '../../Images/poolback.jpeg';
import './DayEvent.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import Navbar from '../Navbar/Navbar1';
import { Divide as Hamburger } from 'hamburger-react'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Config from '../../config/config';
import axios from 'axios';
import Event from '../NewDayEvent/Event';
import { format } from 'date-fns';
import { isAuth } from '../../actions/auth';


export default class DayEvent extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
  event:[],
  add:false,
       

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleChangeSelect=this.handleChangeSelect.bind(this);
this.updateUser=this.updateUser.bind(this);
this.deleteDay=this.deleteDay.bind(this);



    }
    componentDidMount(){
      this.setState({event:this.props.day.events.reverse()})
      const sort=this.state.event;
      sort.reverse();
      // this.setState({event:sort})

    }
  date=format(new Date(this.props.day.date), 'dd/MM/yy')
  deleteDay(){
   
      axios.delete(Config.getServerPath()+'event/'+this.props.day._id)
      .then(res => {
  if(res.data.status===404){
  return
  }
  this.setState({delete:true})
  
      })
      .catch(() => {}   );
console.log('delete user')
    }
     handleClick = (event) => {
       this.setState({toggle:!this.state.toggle})
    };
  
    handleChangeSelect(event){
      if(event.target.value==this.props.user.type)
      this.setState({saveButoon:false});
      else this.setState({saveButoon:true});

      this.setState({userType:event.target.value});


    }
   
   
    updateUser(){

      const postData = {
        type: this.state.userType.trim(),
     
    };
      axios.post(Config.getServerPath()+'user/'+this.props.user._id,postData)
      .then(res => {
  if(res.data.status==='faild'){
  return
  }
  this.setState({saveButoon:false});

        // this.props.setUser(res.data.user)
  
      })
      .catch(() => {}   );
console.log('update user')
    }

      render() {
        if(this.state.add)
        return <Redirect to={{pathname:'/NewDayEvent' ,update:true, date:this.props.day.date}} />;;
     if(this.state.delete) return '';
    return (
      
    <div  className='day-event'>
     <button className='day-btn' onClick={this.handleClick}>{this.date}</button>
     {(isAuth().type=='0'||isAuth().type=='4')?  <button onClick={this.deleteDay} className='delete-event'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button>:''}

     {this.state.toggle?(<div className='event-details'>
       {/* <div style={{ position:'relative'}}> */}

      { this.state.event.map((item,index)=>{
          return  <Event event={item} big={false} day={this.props.day} />

        })}
      
      
       {/* </div> */}
       {(isAuth().type=='0'||isAuth().type=='4')? <button onClick={()=>this.setState({add:true})} className='add-to-event-day'><span id='plus-menu' class="iconify" data-icon="bi:plus-lg" data-inline="false" ></span>הוסף </button>:''}

     </div>):''}


    </div>

    );
  }
}
