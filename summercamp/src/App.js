import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Navbar from './components/Navbar/Navbar1';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import FoodMenuPlan from './components/FoodMenuPlan/FoodMenuPlan';
import ChildRegistration from './components/ChildRegistration/ChildRegistration';
import DailyPlan from './components/DailyPlan/DailyPlan';
import GalleryPlan from './components/GalleryPlan/GalleryPlan';
import Shop from './components/Shop/Shop';
import {isAuth} from './actions/auth';

import NewShopProduct from './components/NewShopProduct/NewShopProduct';
import ShopCart from './components/ShopCart/ShopCart';

import NewDayEvent from './components/NewDayEvent/NewDayEvent';
import NewFoodMenuEvent from './components/NewFoodMenuEvent/NewFoodMenuEvent';
import NewGalleryEvent from './components/NewGalleryEvent/NewGalleryEvent';
import PaymentForm from './components/PaymentForm/Stepper';
import UserDashboardNav from './components/UserDashboardNav/UserDashboardNav';

import axios from 'axios';
import Config from './config/config';

import React, {Fragment} from 'react';
class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
       user: isAuth(),
       loginStatus:false,
       loaded:false,
       dayEvent:[],
       menuEvent:[],
       galleryEvent:[],
        


      };
      this.getAppContent=this.getAppContent.bind(this);
      this.setUser=this.setUser.bind(this);
      this.updateUser=this.updateUser.bind(this);
      this.updateDayEvent=this.updateDayEvent.bind(this);
      this.updateMenuEvent=this.updateMenuEvent.bind(this);
      this.updateGalleryEvent=this.updateGalleryEvent.bind(this);


    
    
    }
   
    componentDidMount(){
      axios.get(Config.getServerPath()+'events')
      .then(res => {
        
        this.setState({dayEvent:res.data.day})
  
      })
      axios.get(Config.getServerPath()+'menu')
      .then(res => {
        console.log(res.data.day)
        this.setState({menuEvent:res.data.day})
  
      })
      axios.get(Config.getServerPath()+'photo')
      .then(res => {
        console.log(res.data.day)
        this.setState({galleryEvent:res.data.day})
  
      })

    
    }
    updateDayEvent(day){
          this.setState({dayEvent:day})
    }
    updateMenuEvent(menu){
      console.log('menu')

      console.log(menu)
      this.setState({menuEvent:menu})
}
updateGalleryEvent(gallery){
  this.setState({galleryEvent:gallery})
}
  updateUser(){
      axios.get(Config.getServerPath()+'user/'+isAuth()._id)
      .then(res => {
        if(res.data.status===404)//mail
        return false;
        if(res.data.status===400)//pasaawor
        return false;
        localStorage.setItem('user',JSON.stringify(res.data.user))
        //this.setUser(res.data.user)
        return true;
  
  
      })
      .catch(() => {    console.log('send')
    }   );
  }
  
  
    
    setUser(user1){
      console.log(user1)
      console.log('setUser')

      // this.setState({user:user1})
      // this.setState({loginStatus:true});
      // localStorage.setItem("id", user1._id);


    }
   getAppContent() { 
 
    return (
        
        <div className={''}>

            <Switch>

                <Route path={'/'} exact
                       render={(props) =>
                           <Login {...props}
                           setUser={this.setUser}
                           loginStatus={this.state.loginStatus}

                                 />} />
                                  <Route path={'/Register'} exact
                       render={(props) =>
                           <Register {...props}
                           setUser={this.setUser}
                           user={this.state.user}
                           loginStatus={this.state.loginStatus}
                                 />} />
                                        <Route path={'/UserDashboard'} exact
                       render={(props) =>isAuth().type===('1')?
                           <UserDashboard {...props}
                           user={this.state.user}
                                 />
                                 :(isAuth().type===('0')||isAuth().type===('2'))?
                  
                           <AdminDashboard {...props}
                           user={this.state.user}
                           updateUser={this.updateUser}
                                 />:isAuth().type===('3')? <Shop {...props}
                                 loginStatus={this.state.loginStatus}
                                 user={this.state.user}
                                 updateUser={this.updateUser}/>: <DailyPlan {...props}
                                 loginStatus={this.state.loginStatus}
                                 user={this.state.user}
                                 updateUser={this.updateUser}
                                 dayEvent={this.state.dayEvent}
      
      
                                       />} />

<Route path={'/FoodMenu'} exact
                       render={(props) =>
                           <FoodMenuPlan {...props}
                           user={this.state.user}
                           updateUser={this.updateUser}
                           menuEvent={this.state.menuEvent}

                                 />} />

<Route path={'/ChildRegistration'} exact
                       render={(props) =>
                           <ChildRegistration {...props}
                           user={this.state.user}
                           setUser={this.setUser}

                                 />} />
                                  <Route path={'/DailyPlan'} exact
                       render={(props) =>
                           <DailyPlan {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateUser={this.updateUser}
                           dayEvent={this.state.dayEvent}


                                 />} />
                                        <Route path={'/NewDayEvent'} exact
                       render={(props) =>
                           <NewDayEvent {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateDayEvent={this.updateDayEvent}


                                 />} />
                                       <Route path={'/NewFoodMenuEvent'} exact
                       render={(props) =>
                           <NewFoodMenuEvent {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateMenuEvent={this.updateMenuEvent}

                                 />} />
                                     <Route path={'/NewGalleryEvent'} exact
                       render={(props) =>
                           <NewGalleryEvent {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateGalleryEvent={this.updateGalleryEvent}

                                 />} />
                                         <Route path={'/GalleryPlan'} exact
                       render={(props) =>
                           <GalleryPlan {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateUser={this.updateUser}
                           galleryEvent={this.state.galleryEvent}


                                 />} />
                                                   <Route path={'/NewShopProduct'} exact
                       render={(props) =>
                           <NewShopProduct {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateUser={this.updateUser}


                                 />} />
  
  <Route path={'/shop'} exact
                       render={(props) =>
                        
                           <Shop {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateUser={this.updateUser}


                                 />} />
                                 <Route path={'/shopcart'} exact
                       render={(props) =>
                           <ShopCart {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateUser={this.updateUser}


                                 />} />
                                       <Route path={'/PaymentForm'} exact
                       render={(props) =>
                           <PaymentForm {...props}
                           loginStatus={this.state.loginStatus}
                           user={this.state.user}
                           updateUser={this.updateUser}
                           price={50}


                                 />} />
            </Switch>
            
        </div>
    );
  }
 render(){
  return (

    <div className='App-background'>

   <Router>
   <div >
     
    <Fragment>
    {this.getAppContent()}
        </Fragment>
        </div>
        {/* <hr className='hr'/> */}
  </Router>

  </div>
  );
  

  }
}
export default App;
