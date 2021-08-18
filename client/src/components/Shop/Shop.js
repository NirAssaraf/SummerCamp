import React, {Component} from 'react';
import PoolBack from '../../Images/poolback.jpeg';
import './Shop.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import ShopProducts from '../ShopProducts/ShopProducts';
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';
import Config from '../../config/config';
import axios from 'axios';
import {isAuth} from '../../actions/auth';

export default class Shop extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
        ShopProducts:[],
        newProduct:false,
      

       }
    
this.handleClickAddProduct=this.handleClickAddProduct.bind(this);



    }


    handleClickAddProduct = (event) => {
       this.setState({newProduct:true})
    };
  
   
    componentDidMount(){
      axios.get(Config.getServerPath()+'product')
      .then(res => {
        this.setState({ShopProducts:res.data})
  
      })
    }

      render() {
        if(this.props.user===null){
          return <Redirect to={'/'}/>;
        }
       if(this.state.newProduct)
        return <Redirect to={'/NewShopProduct'}/>;
    return (
      
    <div >
<UserDashboardNav user={this.props.user}/>
<div className='daily-plan'>
<p className='shop-titles'>חנות מוצרים</p>

{(isAuth().type=='0'||isAuth().type=='3')?<button onClick={this.handleClickAddProduct} className='DailyPlan-add-btn'>הוסף מוצר חדש</button>:''}


<div className='all-days'>

          {        console.log(this.state.ShopProducts)
}
         <ShopProducts products={this.state.ShopProducts} child={false} user={this.props.user} updateUser={this.props.updateUser}/>

       
</div>
</div>
    </div>

    );
  }
}
