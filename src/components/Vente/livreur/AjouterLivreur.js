import React, { Component } from 'react';
import axios from 'axios';
import '../../css/Style.css';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SweetAlert from 'react-bootstrap-sweetalert';

export const add = liv => {
  
    return axios
      .post(' http://localhost:3001/livreur/ajouter', {
        nom:liv.nom,
        num_tel:liv.num_tel,
        vehicule_id:liv.vehicule_id
  
      })
      .then(res => console.log(res.data))
      .catch(err => {
        console.log(err)
      });
  }
 class AjouterLivreur extends Component {
  constructor(props){
      super(props);
      this.onChangeNom= this.onChangeNom.bind(this);
      this.onChangeTel= this.onChangeTel.bind(this);
      this.onChangeVehicule = this.onChangeVehicule.bind(this);
      this.state = {
        nom:'',
        num_tel:'',
        vehicule_id:'',
        alert:null,
           formErrors:{
            nom:'',
            num_tel:'',
            vehicule_id:'',
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
  onChangeVehicule(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='vehicule_id')
      formErrors.vehicule_id =value.length < 3  ? "minimum 3 characters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      vehicule_id: e.target.value
    })
  }
 
  onChangeTel(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='num_tel')
      formErrors.num_tel =value < 1 ? "tel non validé" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      num_tel: e.target.value
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
   window.location = '/livreurs';       
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
    const livreur = {
        nom: this.state.nom,
        vehicule_id: this.state.vehicule_id,
        num_tel:this.state.num_tel
      }

      axios.post('http://localhost:3001/livreur/ajouter', livreur)
              .then(res => {
                if(res){
                this.successAlert();
                
                window.location = '/livreur'; }
              }).catch(err =>
                {console.log(err);
                if(err){

                  this.erreurAlert();
                
                  window.location = '/ajouterlivreur'; 
                }}

              );
              this.setState({
                nom:'',
                vehicule_id:'',
                num_tel:'',
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
                            <li className="breadcrumb-item"><a href="/livreur">Livreur</a></li>
                            <li className="breadcrumb-item active">Ajouter livreur</li>
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
                              
                                <div >Ajouter Livreur</div>
                                
                  
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

                                <label htmlFor="num_tel">Tel :</label>
                                <input 
                                className={formErrors.num_tel.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                placeholder="num_tel"   
                                name="num_tel"   
                                value={ this.state.num_tel}
                                onChange={this.onChangeTel} 
                                />
                                {
                                  formErrors.num_tel.length > 0 && (
                                    <span className="errorMessage">{formErrors.num_tel}</span>
                                  )
                                }
                              </div>
                              <div className="produit">

                                <label htmlFor="vehicule_id">Vehicule_id :</label>
                                <input 
                                className={formErrors.vehicule_id.length > 0 ? 'error' : null}
                                required
                                type="text" 
                                placeholder="vehicule_id"   
                                name="vehicule_id"   
                                value={ this.state.vehicule_id}
                                onChange={this.onChangeVehicule} 
                                />
                                {
                                  formErrors.vehicule_id.length > 0 && (
                                    <span className="errorMessage">{formErrors.vehicule_id}</span>
                                  )
                                }
                              </div>
                              {this.state.alert}
                              
                              <div className="ajouter">
                                  <input type="submit" value="Ajouter livreur" className="btn btn-primary" />
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
  
  export default AjouterLivreur;