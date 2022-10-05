import React, { Component } from 'react';
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import axios from 'axios';

class Dashboard extends Component {
    constructor(props){
        super(props);
       
        this.onChangeNbfournisseur = this.onChangeNbfournisseur.bind(this);
        this.onChangeNbproduit = this.onChangeNbproduit.bind(this);
      
        
            this.state ={
                
                nbfournisseur:0,
                nbproduit:0,
        
            };
          }
    
 
      onChangeNbfournisseur(e) {
        this.setState({
          nbfournisseur: e.target.value
        })
      }
      onChangeNbproduit(e) {
        this.setState({
          nbproduit: e.target.value
        })
      }
     
      componentDidMount() {
     
          axios
          .get('http://localhost:3001/Fournisseur/countfournisseur')
          .then(res => {
              this.setState({
                  nbfournisseur:res.data,
              })
          })
          .catch(err => {
            console.log(err);        
          });
          axios
          .get('http://localhost:3001/Produit/countproduit')
          .then(res => {
              this.setState({
                  nbproduit:res.data,
              })
          })
          .catch(err => {
            console.log(err);        
          });
      }
    render(){
        return(
            <div>
                <Header/>
                <Sidebar/>
                <div className="content-wrapper">
                <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-1">
                            <h2 className="m-0 text-dark">Tableau de bord</h2>
                        </div>
                        <div className="col-sm-11">
                            <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                            <li className="breadcrumb-item active">Tableau de bord </li>
                            </ol>
                        </div>
                    </div>
                </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">         
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3 
                                        name="nbfournisseur" 
                                        onChange={this.onChangeNbfournisseur}
                                        >
                                            {this.state.nbfournisseur}
                                        </h3>
                                        <p>Fournisseurs</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="/fournisseur" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>         



                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3 
                                        name="nbproduit" 
                                        onChange={this.onChangeNbproduit}
                                        >
                                            {this.state.nbproduit}
                                        </h3>
                                        <p>Produits</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="/produit" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>  

                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3 
                                        name="nbproduit" 
                                        onChange={this.onChangeNbproduit}
                                        >
                                            {this.state.nbproduit}
                                        </h3>
                                        <p>Clients</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="/produit" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>     
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3 
                                        name="nbfournisseur" 
                                        onChange={this.onChangeNbfournisseur}
                                        >
                                            {this.state.nbfournisseur}
                                        </h3>
                                        <p>Livreurs</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-bag"></i>
                                    </div>
                                    <a href="/fournisseur" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
                                </div>
                            </div>            
                            
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
        )
    }
}
export default Dashboard;