import React, {Component} from 'react';
import PoolBack from '../../Images/poolback.jpeg';
import './GalleryPlan.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import GalleryEvent from '../GalleryEvent/GalleryEvent';
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import Config from '../../config/config';
import axios from 'axios';
import { Divide as Hamburger } from 'hamburger-react'
import { isAuth } from '../../actions/auth';
import { format } from 'date-fns';
import DatePicker from "react-datepicker";
export default class GalleryPlan extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
        GalleryPlan:[],
        newGalleryDay:false,
        startDate:'',
        showMenu:true,
      

       }
    
this.handleClickAddGalleryDay=this.handleClickAddGalleryDay.bind(this);
this.cleanDateSelect=this.cleanDateSelect.bind(this);
this.setShowMenu=this.setShowMenu.bind(this);



    }
     today = new Date();

    date =  this.today.getDate()  + '/' + (this.today.getMonth() + 1) + '/' +this.today.getFullYear();

     handleClickAddGalleryDay = (event) => {
       this.setState({GalleryDay:true})
    };
    setShowMenu(){
this.setState({showMenu:!this.state.showMenu})
    }
  
    cleanDateSelect(){
      this.setState({startDate:''})
    }

      render() {
        if(this.props.user===null){
          this.props.updateUser();
          return '';
          }
       if(this.state.GalleryDay)
        return <Redirect to={'/NewGalleryEvent'}/>;
    return (
      
    <div  className='DailyPlan'>
<UserDashboardNav user={this.props.user} showMenu={this.state.showMenu}/>
<div className='daily-plan'>
<p className='shop-titles'> גלרייה</p>

{(isAuth().type=='0'||isAuth().type=='2')?<button onClick={this.handleClickAddGalleryDay} className='GalleryPlan-add-btn'>הוסף אלבום חדש</button>:''}
<div className='date-select'>
{this.state.startDate!==''?<button  onClick={this.cleanDateSelect} className='date-select-btn-clean' ><span class="iconify" data-icon="ph:x" data-inline="false" ></span></button>:''}

<DatePicker placeholderText='בחר תאריך לסינון' id='date-piker-select'   dateFormat="dd/MM/yy" selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})} />
</div>
</div>
<div className='all-photo'>
{ this.props.galleryEvent.map((item,index)=>{
                if(this.state.startDate!==''){
                  const dateState=format(new Date(this.state.startDate), 'dd/MM/yy')
                  const dateItem=format(new Date(item.date), 'dd/MM/yy')
               
                       if(dateState===dateItem)
                              return <GalleryEvent  key={index} day={item} setShowMenu={this.setShowMenu}/>
                 }else       return <GalleryEvent key={index}  day={item} setShowMenu={this.setShowMenu} />
    

        })}
</div>

    </div>

    );
  }
}
