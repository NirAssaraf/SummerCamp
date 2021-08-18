import React, {Component} from 'react';
import PoolBack from '../../Images/poolback.jpeg';
import './ShopProducts.css';
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
import Event from '../NewShopProduct/Event';
import { format } from 'date-fns';


export default class ShopProducts extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
        products:[]
       

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleChangeSelect=this.handleChangeSelect.bind(this);
this.updateUser=this.updateUser.bind(this);
this.deleteDay=this.deleteDay.bind(this);



    }
    componentDidMount(){
      this.setState({products:this.props.products})
      // let items=[];
      // let url='https://media.terminalx.com/pub/media/catalog/product/cache/92af6b9c945798a7e3b64d91033084b3/z/0/z050540022-11625141185_1.jpg';
      // let name='אופניים'
      // let price='12.0'
      // items.push({url,name,price})
      // this.setState({products:items})

     
      // this.setState({event:sort})

    }
  // date=format(new Date(this.props.day.date), 'dd/MM/yy')


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
      
     if(this.state.delete) return '';
    return (
      
  


    <div className='products-details'>
       {/* <div style={{ position:'relative'}}> */}

      { this.props.products.map((item,index)=>{
          return  <Event product={item} user={this.props.user} updateUser={this.props.updateUser} />

        })}
      
      
       {/* </div> */}

     


    </div>

    );
  }
}
