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
    




    }
 

      render() {
      
     if(this.state.delete) return '';
    return (
      
  


    <div className='products-details-e'>
       {/* <div style={{ position:'relative'}}> */}

      { this.props.products.map((item,index)=>{
          return  <Event product={item} user={this.props.user} setTotal={this.props.setTotal} updateUser={this.props.updateUser} updateShopProduct={this.props.updateShopProduct}/>

        })}
      
      
       {/* </div> */}

     


    </div>

    );
  }
}
