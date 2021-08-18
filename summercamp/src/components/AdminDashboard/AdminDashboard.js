import React, {Component} from 'react';
import PoolBack from '../../Images/poolback.jpeg';
import './AdminDashboard.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import Icon from '@material-ui/core/Icon';
import Users from '../Users/Users';
import Navbar from '../Navbar/Navbar1';
import Config from '../../config/config';
import Child from '../Child/Child';
import UserDashboardNav from '../UserDashboardNav/UserDashboardNav';

import { Divide as Hamburger } from 'hamburger-react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { isAuth } from '../../actions/auth';

export default class AdminDashboard extends Component {
    constructor(props, context) {
        super(props, context);
       this.state={
       menuStatus: 0,
       openMenu:false,
       Users:[],
       userType:'',
       showList:10,
       children:[],




       }
    
this.handleClick=this.handleClick.bind(this);
this.handleClose=this.handleClose.bind(this);

this.handleChangeSelect=this.handleChangeSelect.bind(this);
this.handleChangeSelectList=this.handleChangeSelectList.bind(this);



    }
    componentDidMount(){
      if(isAuth().type!='0') 
      this.setState({showList:20});

      axios.get(Config.getServerPath()+'users')
      .then(res => {
        this.setState({Users:res.data})
  
      })
      axios.get(Config.getServerPath()+'children')
      .then(res => {
        this.setState({children:res.data})
  
      })
    }
    handleChangeSelectList(event){
      this.setState({showList:event.target.value});
    }
    handleChangeSelect(event){
      console.log(event.target.value)
      this.setState({userType:event.target.value});

    }
     handleClick = (event) => {
      this.setState({anchorEl:event.currentTarget});
    };
  
     handleClose = () => {
       this.setState({anchorEl:null});
      
    };
   


      render() {
        if(this.props.user===null){
          if(!this.props.updateUser())
            //  return <Redirect to={'/'}/>;
            return '';
        }
     
    return (
      
    <div  className='UserDashboard'>
    <UserDashboardNav user={this.props.user}/>

     
      {/* <p className='admin-Dashboard'>דף מנהל</p> */}

      <div className='my-children-admin'> 
      <div className='title-children'>


       {isAuth().type!='0'? <h3> חניכים</h3>:
        <FormControl  variant="standard" id='List-select-admin-e'>
        <Select
        required
        labelId="demo-simple-select-placeholder-label-label"
        id="val-admin"
          value={this.state.showList}
          onChange={this.handleChangeSelectList}
          displayEmpty
        >

          <MenuItem id='val'value={10}>משתמשים</MenuItem>

          <MenuItem id='val' value={20}>חניכים</MenuItem>
        </Select>
      </FormControl>
      }
      {this.state.showList===10?(
           <FormControl  variant="standard" id='userType-select-admin'>
        <Select
        required
        labelId="demo-simple-select-placeholder-label-label"
        id="demo-simple-select-placeholder-label"
          value={this.state.userType}
          onChange={this.handleChangeSelect}
          displayEmpty
        >
    <MenuItem value="">
            <em>סינון לפי</em>
          </MenuItem>
          <MenuItem value='1'>הורה</MenuItem>
          <MenuItem value='0'>מנהל</MenuItem>
          <MenuItem value='3'>אחראי מוצרים</MenuItem>
          <MenuItem value='4'>אחראי לוז</MenuItem>
          <MenuItem value='2'>מדריך</MenuItem>
          
        </Select>
      </FormControl>
      ):''}
        </div>
        <br/>
        {this.state.Users.length===0?(<p>אין משתמשים</p>):''}
       {this.state.showList==10?( this.state.Users.map((item,index)=>{
          if(this.state.userType===''||item.type===this.state.userType)
          return <Users user={item} />
        })
        ):(
         this.state.children.map((item,index)=>{
          return <Child child={item} />
        })
)}

      </div>

    </div>

    );
  }
}
