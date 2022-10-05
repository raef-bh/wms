import React, { Component } from 'react';
import axios from 'axios';
import '../../css/Style.css';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SweetAlert from 'react-bootstrap-sweetalert';

export const add = four => {
  
    return axios
      .post(' http://localhost:3001/fournissuer/ajouter', {
        nom:four.nom,
        prenom:four.prenom,
        tel:four.tel,
        email:four.email
  
      })
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err)
      });
  }
 class AjouterFournisseur extends Component {
  constructor(props){
      super(props);
      this.onChangeNom= this.onChangeNom.bind(this);
      this.onChangePrenom = this.onChangePrenom.bind(this);
      this.onChangeTel= this.onChangeTel.bind(this);
      this.onChangeEmail = this.onChangeEmail.bind(this);
      this.state = {
        nom:'',
        prenom:'',
        email:'',
        tel:'',
        alert:null,
           formErrors:{
            nom:'',
            prenom:'',
            email:'',
            tel:'',
          }
        };
  }
onChangeNom(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='nom')
      formErrors.nom =value.length < 3  ? "minimum 3 characters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      nom: e.target.value
    })
  }
  onChangePrenom(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='prenom')
      formErrors.prenom =value.length < 3  ? "minimum 3 characters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      prenom: e.target.value
    })
  }
  onChangeEmail(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='email')
      formErrors.email =value.length < 3  ? "minimum 3 characters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      email: e.target.value
    })
  }
 
  onChangeTel(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='tel')
      formErrors.tel =value < 1 ? "tel non validé" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      tel: e.target.value
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
    const fournisseur = {
        nom: this.state.nom,
        prenom:this.state.prenom, 
        email: this.state.email,
        tel:this.state.tel
      }

      axios.post('http://localhost:3001/fournissuer/ajouter', fournisseur)
              .then(res => {
                if(res){
                this.successAlert();
                
                window.location = '/fournisseur'; }
              }).catch(err =>
                {console.log(err);
                if(err){

                  this.erreurAlert();
                
                  window.location = '/ajouterfournisseur'; 
                }}

              );
              this.setState({
                nom:'',
                prenom:'',
                email:'',
                tel:'',
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
                            <li className="breadcrumb-item"><a href="/fournisseur">Fournisseur</a></li>
                            <li className="breadcrumb-item active">Ajouter fournisseur</li>
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
                              
                                <div >Ajouter Fournisseur</div>
                                
                  
                              </center>
                            </h1>

                            <form onSubmit={this.onSubmit}>
                            <div className="produit">
                                <label htmlFor="nom">Nom :</label>
                                <input 
                                  className={formErrors.nom.length > 0 ? 'error' : null}
                                  required
                                  type="text"
                                  placeholder="nom"   
                                  name="nom" 
                                  value={ this.state.nom}
                                  onChange={this.onChangeNom}
                                />
                                {
                                  formErrors.nom.length > 0 && (
                                    <span className="errorMessage">{formErrors.nom}</span>
                                  )
                                }
                              </div>                  
                              <div className="produit">
                                <label htmlFor="prenom">Prenom :</label>
                                <input 
                                  className={formErrors.prenom.length > 0 ? 'error' : null}
                                  required
                                  type="text"
                                  placeholder="prenom"   
                                  name="prenom" 
                                  value={ this.state.prenom}
                                  onChange={this.onChangePrenom}
                                />
                                {
                                  formErrors.prenom.length > 0 && (
                                    <span className="errorMessage">{formErrors.prenom}</span>
                                  )
                                }
                              </div>                                           
                                                        
                              <div className="produit">

                                <label htmlFor="tel">Tel :</label>
                                <input 
                                className={formErrors.tel.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                placeholder="tel"   
                                name="tel"   
                                value={ this.state.tel}
                                onChange={this.onChangeTel} 
                                />
                                {
                                  formErrors.tel.length > 0 && (
                                    <span className="errorMessage">{formErrors.tel}</span>
                                  )
                                }
                              </div>
                              <div className="produit">

                                <label htmlFor="email">Email :</label>
                                <input 
                                className={formErrors.email.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                placeholder="email"   
                                name="email"   
                                value={ this.state.email}
                                onChange={this.onChangeEmail} 
                                />
                                {
                                  formErrors.email.length > 0 && (
                                    <span className="errorMessage">{formErrors.email}</span>
                                  )
                                }
                              </div>
                              {this.state.alert}
                              
                              <div className="ajouter">
                                  <input type="submit" value="Ajouter fournisseur" className="btn btn-primary" />
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
  
  export default AjouterFournisseur;