import React, { Component } from 'react';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import {getCurrentUser} from '../actions/authActions'


class Profil extends Component {


  constructor(props) {
    super(props);

    this.state = {
      currentUser: getCurrentUser()
    };
  }


  render() {
    
    const { currentUser } = this.state;
    
    return (
       
    
    
        <div>
      <Header/>
      <Sidebar/>
      <div className="container"style={{width:"70%" ,marginRight:"70px"}}>
        <div className="jumbotron mt-5" >
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto" style={{width:"100%" }}>
            <tbody>
              <tr>
                <td>Nom:</td>
                <td>{currentUser.user.nom}</td>
              </tr>
              <tr>
                <td>Prenom:</td>
                <td>{currentUser.user.prenom}</td>
              </tr>
              <tr>
                <td>Email:</td><td>{currentUser.user.email}</td>
              </tr>
              <tr>
                <td>Télephone:</td><td>{currentUser.user.tel}</td>
              </tr>
              
              <tr>
                <td>Nom entreprise:</td><td>{currentUser.user.nomentreprise}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
      
    
  
      
    )
  }
}
export default Profil;