import React, {Component} from 'react';
import PoolBack from '../../Images/poolback.jpeg';
import './ShopCart.css';
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
import ShopCartProduct from './ShopCartProduct';
import { format } from 'date-fns';
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import PaymentForm from '../PaymentForm/Forms/PaymentForm';
import { isAuth } from '../../actions/auth';


export default class ShopCart extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
        products:[],
        totalPrice:null,
        Payment:false,
        total:isAuth().cart.length
       

       }
    
this.handleClick=this.handleClick.bind(this);
this.handleChangeSelect=this.handleChangeSelect.bind(this);

this.getTotal=this.getTotal.bind(this);
this.handlePay=this.handlePay.bind(this);
this.setTotal=this.setTotal.bind(this);



    }
 
    componentDidMount(){
      if(isAuth()!=null){
      this.setState({products: isAuth().cart })  

      this.getTotal();
      
    }

  }
  async handlePay(){
  await  this.props.updateUser();
  this.setState({total:0});
  return true;

  }
  getTotal(){
    console.log(this.props.user._id)
    axios.post(Config.getServerPath()+'priceTotal/'+this.props.user._id)
    .then(res => {
      console.log(res.data)
if(res.data.status==='faild'){
return
}
console.log()
this.setState({totalPrice:res.data.sum})


    })
    .catch(() => {}   );
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
   
    
    setTotal(){
      this.setState({total:this.state.total-1})
    }
      render() {
       
        if(this.props.user===null){
          return '';
          }
     if(this.state.delete) return '';
    return (
      <div>
        <UserDashboardNav user={this.props.user} ShopCart={true} total={this.state.total}/>
        {/* {this.props.user!=null?this.setState({products: this.props.user.cart}):''} */}
    <div  className='cart'>
     {/* <button className='user-btn' onClick={this.handleClick}>{this.date}</button> */}
     {/* <button onClick={this.deleteDay} className='delete-event'><span class="iconify" data-icon="fluent:delete-dismiss-24-regular" data-inline="false" ></span></button> */}

    {/* <div className='event-details'> */}
       {/* <div style={{ position:'relative'}}> */}
       {!this.state.Payment?(<><p className='cart-titles'>הפריטים שלי</p>

      { this.state.products.map((item,index)=>{
          return  <ShopCartProduct product={item} user={this.props.user} getTotal={this.getTotal} updateUser={this.props.updateUser} setTotal={this.setTotal} index={index}/>

        })}
      {this.state.totalPrice!=0?(<> <div className='cart-total'>
<p className='cart-total-txt'>סה״כ לתשלום:  </p>
<p className='cart-total-price'> {this.state.totalPrice} ₪</p>

</div>
<Button  onClick={()=>this.setState({Payment:true})} id='cart-payment' >לתשלום</Button> 
</>):<div className='cart-no-product'>
  <p >לא נמצאו פרטים </p>
  <a href='/shop'>למעבר לחנות</a>
  </div>} 
  </>):     
     (<div className='payment-table'><PaymentForm price={this.state.totalPrice} updateUser={this.props.updateUser} user={this.props.user} handleAddChild={this.handlePay}/></div>)}
       {/* </div> */}

     {/* </div> */}
     </div>


    </div>

    );
  }
}
