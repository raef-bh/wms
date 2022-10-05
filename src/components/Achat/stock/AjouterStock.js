import React, { Component } from 'react'
import styles from '../../css/Invoice.module.scss'
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import CoordonneesProduit from './CoordonneesComposants'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
export const add = Stocks => {
  
    return axios
      .post(' http://localhost:3001/Stocks/ajouter', {
        date_achat: Stocks.date_achat,
        fournissuer: Stocks.fournissuer,
        totale: Stocks.totale,
      })
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err)
      });
  }
class AjouterStock extends Component {
    

    constructor(props){
        super(props);
        this.onChangeNom = this.onChangeNom.bind(this);
        this.onChangeDate_achat = this.onChangeDate_achat.bind(this);
        this.onSubmitMessage = this.onSubmitMessage.bind(this);
       
   

//averifier add etat 
        this.state = {
          fournisseurs:[],
          nom:'',
          id:0,
          totale:0,
          date_achat:moment(new Date(),'YYYY-MM-DD').format(),//moment.utc('YYYY-MM-DD').inspect(),//moment.utc().inspect() // 'moment.utc("2016-11-10T06:24:10.638+00:00")'
         

          note:'',
          lineItems: [
            {
              id: 'initial',      // react-beautiful-dnd unique key
              libelle: '',
              categorie:'',
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
          onChangeDate_achat(e) {
            this.setState({
                date_achat: e.target.value
            })
          }
          componentDidMount() {
            axios.get('http://localhost:3001/fournissuer/')
              .then(response => {
                console.log(response.data)
                if (response.data.length > 0) {
                  this.setState({
                    fournisseurs: response.data.map(fournisseur => fournisseur.nom)
                  })
                }
              })
              .catch((error) => {
                console.log(error);
              })
              this.renderSelectedFournisseur(this.state.nom)
          }
          componentDidUpdate(prevProps, prevState) {
            if (prevState.nom !== this.state.nom) {
              console.log('pokemons state has changed to :',this.state.nom)
              
            }
          }
          
          onSubmit = (e) => {
            e.preventDefault();
           
            const stock = {
                Date_achat : this.state.date_achat,
                fournisseur : this.state.nom,
                totale : this.state.totale,
                
              }
              console.log(stock);
              
           axios.post('http://localhost:3001/stocks/ajouter', stock)
              .then(res => { console.log(res.data)
            
                window.location = '/stock';});
              
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
                                        {this.renderFournisseurSelector()}
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        {this.renderSelectedFournisseur(this.state.nom)}
                        </form>
                </div>
            </section>
        </div>
        <Footer/>
    </div>






      
    )
  }


  renderFournisseurSelector(){
    return( 
        <div className="produit"> 
            <Link to="/ajouterclient"> 
                <button className="btn btn-primary" type="submit" 
                    style={{"float":"right","position": "relative","fontSize":"10px"}}>
                    <i className="fa fa-user-plus" ></i>
                </button>
            </Link>
            <label htmlFor="nom">
                <h1><i className="nav-icon fa fa-user"></i> Fournisseur</h1>
            </label>
            <select name="nom"
                className="form-control"
                value={this.state.nom}
                onChange={this.onChangeNom}> 
                <option></option>                                   
                {
                    this.state.fournisseurs.map((nom,index)=> {
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


renderSelectedFournisseur =(nom)=>{
    console.log(nom)
    let token = localStorage.getItem('jwt');
    const headers= { 'Authorization': token };
     axios.get('http://localhost:3001/fournissuer/'+nom,headers)
    .then(response => {
        this.setState({
        id:response.data._id,
        nom: response.data.nom,
        email: response.data.email,
        tel: response.data.tel,
       
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
                                        <td>email:</td>
                                        <td>{this.state.email}</td>
                                    </tr>
                                    <tr>
                                        <td>tel:</td>
                                        <td>{this.state.tel}</td>
                                    </tr>
                                </tbody>
                            </table>
          
            <div className={`${styles.valueTable} ${styles.to}`}>
           
            <div className={styles.label} >
                    <label className="required">Date du document :</label>
            </div>
                    
            <div className={styles.value}>
                    <input type="date"  name="DateDoc" value={this.state.date_achat} onChange={this.onChangeDate_achat}/>
            </div> 
                
            </div>
          </div>
          
        <CoordonneesProduit onSubmitMessage={this.onSubmitMessage}/>
        
        </div>

        </div>
            
            
    )
}
  
}
export default AjouterStock

