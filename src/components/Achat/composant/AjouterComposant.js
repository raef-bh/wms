import React, { Component } from 'react';
import axios from 'axios';
import '../../css/Style.css';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SweetAlert from 'react-bootstrap-sweetalert';

export const add = prod => {
  
    return axios
      .post(' http://localhost:3001/Composant/ajouter', {
        libelle:prod.libelle,
        prixHT:prod.prixHT,
        prixTTc:prod.prixTTc,
        categorie:prod.categorie
  
      })
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err)
      });
  }
 class AjouterComposant extends Component {
  constructor(props){
      super(props);
      this.onChangeLibelle = this.onChangeLibelle.bind(this);
      this.onChangeprixHT = this.onChangeprixHT.bind(this);
      this.onChangeprixTTC = this.onChangeprixTTC.bind(this);
      this.onChangeCategorie = this.onChangeCategorie.bind(this);
      this.state = {
        libelle:'',
        prixHT:0,     
        prixTTC:0,
        alert:null,
        categorie:'',
           formErrors:{
            libelle:'',
            prixHT:0,
            prixTTC:0,
            categorie:''
          }
        };
  }
onChangeLibelle(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='libelle')
      formErrors.libelle =value.length < 3  ? "minimum 3 characters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      libelle: e.target.value
    })
  }
  onChangeprixHT(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='prixHT')
      formErrors.prix =value < 1 ? "prixHT non validé" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      prixHT: e.target.value
    })
  }
  onChangeprixTTC(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='prixTTC')
      formErrors.prix =value < 1 ? "prixTTC non validé" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      prixTTC: e.target.value
    })
  }
  onChangeCategorie(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='categorie')
      formErrors.categorie =value.length < 3  ? "minimum 3 characters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      categorie: e.target.value
    })
  }

  successAlert() {
    const getAlert = () => (
      <SweetAlert 
      success 
      title="Good job!" 
      onConfirm={()=>this.onConfirm} 
      onCancel={()=>this.onCancel}>
        You clicked the button!
    </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }
  
 onConfirm(){
   window.location = '/composant';       
 }
  onCancel(){
    this.setState({
        alert: null
    });
}
showAlert(err) {
  this.setState({
      alert: (
          <SweetAlert 
              danger
              showCancel
              cancelBtnText = "No"
              cancelBtnBsStyle = "default"
              customIcon = "thumbs-up.jpg"
              title ="Erreur"
              onCancel = {this.onCancel}
          >
              {err}
          </SweetAlert>
      )            
  });
}
erreurAlert() {
const getAlert = () => (
  <SweetAlert 
  warning 
  cancelBtnBsStyle="default"
  title="Vérifier votre saisie" 
  onConfirm={()=>this.onCancel()}>
</SweetAlert>
);

this.setState({
  alert: getAlert()
});}



onSubmit = (e) => {
    e.preventDefault();
    const produit = {
        libelle: this.state.libelle,
        prixHT:this.state.prixHT, 
        prixTTC: this.state.prixTTC,
        categorie:this.state.categorie
      }

      axios.post('http://localhost:3001/Composant/ajouter', produit)
              .then(res => {
                if(res){
                this.successAlert();
                
                window.location = '/composant'; }
              }).catch(err =>
                {console.log(err);
                if(err){

                  this.erreurAlert();
                
                  window.location = '/ajoutercomposant'; 
                }}

              );
              this.setState({
                libelle:'',
                prixHT:0,
                prixTTC:0,
                categorie:'',
              })
              
}

    render() {
        const { formErrors  } = this.state;
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
                            <li className="breadcrumb-item"><a href="/composant">Composant</a></li>
                            <li className="breadcrumb-item active">Ajouter composant</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </div>
                  <section className="content">
                    <div className="container-fluid">
                                    
                      <div className="content-header" >
                        <div className="wrapper">
                          <div className="form-wrapper">

                            <h1 >
                              <center>
                              
                                <div >Ajouter Composant</div>
                                
                  
                              </center>
                            </h1>

                            <form onSubmit={this.onSubmit}>
                            <div className="produit">
                                <label htmlFor="categorie">Categorie :</label>
                                <input 
                                  className={formErrors.categorie.length > 0 ? 'error' : null}
                                  required
                                  type="text"
                                  placeholder="Categorie"   
                                  name="categorie" 
                                  value={ this.state.categorie}
                                  onChange={this.onChangeCategorie}
                                />
                                {
                                  formErrors.categorie.length > 0 && (
                                    <span className="errorMessage">{formErrors.categorie}</span>
                                  )
                                }
                              </div>                  
                              <div className="produit">
                                <label htmlFor="libelle">Libelle :</label>
                                <input 
                                  className={formErrors.libelle.length > 0 ? 'error' : null}
                                  required
                                  type="text"
                                  placeholder="Libelle"   
                                  name="libelle" 
                                  value={ this.state.libelle}
                                  onChange={this.onChangeLibelle}
                                />
                                {
                                  formErrors.libelle.length > 0 && (
                                    <span className="errorMessage">{formErrors.libelle}</span>
                                  )
                                }
                              </div>                                           
                                                        
                              <div className="ref">

                                <label htmlFor="prixHT">PrixHT :</label>
                                <input 
                                className={formErrors.prixHT.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                name="prixHT"   
                                value={ this.state.prixHT}
                                onChange={this.onChangeprixHT} 
                                />
                                {
                                  formErrors.prixHT.length > 0 && (
                                    <span className="errorMessage">{formErrors.prixHT}</span>
                                  )
                                }
                              </div>
                              <div className="ref">

                                <label htmlFor="prixTTC">prixTTC :</label>
                                <input 
                                className={formErrors.prixTTC.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                name="prixTTC"   
                                value={ this.state.prixTTC}
                                onChange={this.onChangeprixTTC} 
                                />
                                {
                                  formErrors.prixTTC.length > 0 && (
                                    <span className="errorMessage">{formErrors.prixTTC}</span>
                                  )
                                }
                              </div>
                              {this.state.alert}
                              
                              <div className="ajouter">
                                  <input type="submit" value="Ajouter produit" className="btn btn-primary" />
                                </div>
                              
                            </form>
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
  
  export default AjouterComposant;