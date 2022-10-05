import React, { Component } from 'react'
import styles from '../../css/Invoice.module.scss'
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import CoordonneesProduit from './CoordonneesProduits'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

class AjouterCommande extends Component {
    

    constructor(props){
        super(props);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDate_livraison = this.onChangeDate_livraison.bind(this);
        this.onSubmitMessage = this.onSubmitMessage.bind(this);
       
   

//averifier add etat 
        this.state = {
          livreurs:[],
          nom:'',
          id:0,
          totale:0,
          date_livraison:moment(new Date(),'YYYY-MM-DD').format(),//moment.utc('YYYY-MM-DD').inspect(),//moment.utc().inspect() // 'moment.utc("2016-11-10T06:24:10.638+00:00")'
         
          lineItems: [
            {
              id: 'initial',      // react-beautiful-dnd unique key
              libelle: '',
              etat:'',
              quantite: 0,
              prixht: 0.00,
            },
          ]
          };
       
        }
          onChangeNom(e) {
            this.setState({
              nom: e.target.value
            })
          } 
          onSubmitMessage(ttc,etat){
            this.setState({
                totale:ttc,
                etat :etat
            })
            console.log(etat)
        }
          onChangeDate_livraison(e) {
            this.setState({
                date_livraison: e.target.value
            })
          }
          componentDidMount() {
            axios.get('http://localhost:3001/Livreur/')
              .then(response => {
                console.log(response.data)
                if (response.data.length > 0) {
                  this.setState({
                    livreurs: response.data.map(livreur => livreur.nom)
                  })
                }
              })
              .catch((error) => {
                console.log(error);
              })
              this.renderSelectedLivreur(this.state.nom)
          }
          componentDidUpdate(prevProps, prevState) {
            if (prevState.nom !== this.state.nom) {
              console.log('livreur state has changed to :',this.state.nom)
              
            }
          }
          
          onSubmit = (e) => {
            e.preventDefault();
           
            const commande = {
                Date_livraison : this.state.date_livraison,
                livreur : this.state.nom,
                description : this.state.description,
                prix: this.state.prix,
                etat : this.state.etat,
                reference : this.state.reference,
                quantite : this.state.quantite,
                totale : this.state.totale,
                libelle :this.state.libelle,
              
              }
              console.log(commande);
              
           axios.post('http://localhost:3001/commande/ajouter', commande)
              .then(res => { console.log(res.data)
            
                window.location = '/commande';});
              
          }

  render = () => {
    return (
        <div >
        <Header/>
        <Sidebar/>
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-1">
                            <h1 className="m-0 text-dark">Dashboard</h1>
                        </div>
                        <div className="col-sm-11">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="/commandelisl">Commande</a></li>
                                <li className="breadcrumb-item"><a href="/ajoutercommande">Ajouter commande</a></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        
            <section className="content" >
                <div className="container-fluid">
                    <div className="row">         
                        <div className="col-lg-3 col-6" >
                            <div className="small-box rg-info">
                                <div className="inner">
                                    <div>
                                        {this.renderLivreurSelector()}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        {this.renderSelectedLivreur(this.state.nom)}
                        </form>
                </div>
            </section>
        </div>
        <Footer/>
    </div>






      
    )
  }


  renderLivreurSelector(){
    return( 
        <div className="produit"> 
            <Link to="/ajouterclient"> 
                <button className="btn btn-primary" type="submit" 
                    style={{"float":"right","position": "relative","fontSize":"10px"}}>
                    <i className="fa fa-user-plus" ></i>
                </button>
            </Link>
            <label htmlFor="nom">
                <h1><i className="nav-icon fa fa-user"></i> Livreur</h1>
            </label>
            <select name="nom"
                className="form-control"
                value={this.state.nom}
                onChange={this.onChangeNom}> 
                <option></option>                                   
                {
                    this.state.livreurs.map((nom,index)=> {
                    return <option 
                        key={index}
                        value={nom}>{nom}
                        </option>
                    })
                }
            </select>
        </div>
    )
}


renderSelectedLivreur =(nom)=>{
  
    let token = localStorage.getItem('jwt');
    const headers= { 'Authorization': token };
     axios.get('http://localhost:3001/Livreur/nom/'+nom,headers)
    .then(response => {
        this.setState({
        id:response.data._id,
        nom: response.data.nom,
        num_tel: response.data.num_tel,
        vehicule_id: response.data.vehicule_id,
       
    })  
    })
    .catch(function (error) {
        console.log(error);
    })
    if(!nom){
        return(
            <div></div>
        )
    }

    return(
        <div><div className={styles.invoice}>
        <div className={styles.addresses}>
              <table className="table col-md-6 mx-auto" style={{"float":"left","position": "relative","width":"50%"}}>
                                <tbody>
                                    <tr>
                                        <td>Nom:</td>
                                        <td>{this.state.nom}</td>
                                    </tr>
                                    <tr>
                                        <td>Numéro:</td>
                                        <td>{this.state.num_tel}</td>
                                    </tr>
                                    <tr>
                                        <td>Véhicule id:</td>
                                        <td>{this.state.vehicule_id}</td>
                                    </tr>
                                </tbody>
                            </table>
          
            <div className={`${styles.valueTable} ${styles.to}`}>
           
            <div className={styles.label} >
                    <label className="required">Date du document :</label>
            </div>
                    
            <div className={styles.value}>
                    <input type="date"  name="DateDoc" value={this.state.date_livraison} onChange={this.onChangeDate_livraison}/>
            </div> 
                
            </div>
          </div>
          
        <CoordonneesProduit onSubmitMessage={this.onSubmitMessage}/>
        
        </div>

        </div>
            
            
    )
}
  
}
export default AjouterCommande

