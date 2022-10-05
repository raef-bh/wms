import React, { Component } from "react";
import {withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";


import './css/Formulaire.css';

class Register extends Component {
  constructor() {
    super();
    
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeTel = this.onChangeTel.bind(this);
    this.onChangeNomentreprise = this.onChangeNomentreprise.bind(this);
    this.onChangeActivite = this.onChangeActivite.bind(this);
 

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      nom:'',
      prenom:'',
      email:'',
      password:'',
      tel:0,
      nomentreprise:'',
      activite:'',
      formErrors:{
        nom:'',
        prenom:'',
        email:"",
        password:'',
        tel:0,
        nomentreprise:'',
        activite:'',
     
      },
      errors: {}
    };
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  
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
    this.setState({
      email: e.target.value
    })
  }
  onChangeTel(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='tel')
      formErrors.tel =value.length === 8 ? "" :"minimum 8 characters required"; 
    this.setState({ formErrors, [name]: value });
    this.setState({
      tel: e.target.value
    })
  }
  onChangePassword(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='password')
      formErrors.password =value.length < 6  ? "minimum 6 characters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      password: e.target.value
    })
  }
  
  onChangeNomentreprise(e) {
    const {name,value } = e.target;    
    let formErrors ={ ...this.state.formErrors };
    if(name==='nomentreprise')
      formErrors.nomentreprise =value.length < 3 ? "minimum 3 characaters required" :"";
    this.setState({ formErrors, [name]: value });
    this.setState({
      nomentreprise: e.target.value
    })
  }
  onChangeActivite(e) {
    this.setState({
      activite: e.target.value
    })
  }
 
  


  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      nom: this.state.nom,
      prenom: this.state.prenom,
      email: this.state.email,
      password: this.state.password,
      tel: this.state.tel,
      nomentreprise:this.state.nomentreprise,
      activite : this.state.activite,

    };
    console.log(newUser)
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors ,formErrors} = this.state;
    return (
              <div className="content-header" >
                <div className="wrapper">
                  <div className="form-wrapper">

                    <h5 >
                      <form>
                        <div className="ip"><i className="fa fa-user "> </i>Personnelle</div>
                        <div className="ie"><i className="fa fa-building fa-x"></i>Entreprise</div>
                      </form>
                    </h5>
                    
                    <form noValidate onSubmit={this.onSubmit}>
                      <div className="nom">
                        <label htmlFor="nom">Nom :</label>
                        <input 
                          className={formErrors.nom.length > 0 ? 'error' : null}
                          required
                          type="text"
                          placeholder="Nom"   
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

                      <div className="entreprise">
                        <label htmlFor="nomentreprise">Nom d'entreprise:</label>
                        <input 
                          className={formErrors.nomentreprise.length > 0 ? "error" : null}
                          required
                          type="text" 
                          placeholder="Nom d'entreprise"  
                          name="nomentreprise"
                          value={this.state.nomentreprise}
                          onChange={this.onChangeNomentreprise} 
                        />
                        {
                          formErrors.nomentreprise.length > 0 && (
                            <span className="errorMessage">{formErrors.nomentreprise}</span>
                          )
                        }
                      </div>
                      
                      <div className="prenom">

                        <label htmlFor="nom">Prenom :</label>
                        <input 
                        className={formErrors.prenom.length > 0 ? 'error' : null}
                        required
                        type="text"  
                        placeholder="Prenom" 
                        name="prenom"  
                        value={this.state.prenom}                
                        onChange={this.onChangePrenom} 
                        />
                        {
                          formErrors.nom.length > 0 && (
                            <span className="errorMessage">{formErrors.prenom}</span>
                          )
                        }
                        </div>
                        <div className="entreprise">
                        <label htmlFor="activite">Activité d'entreprise :</label>
                        <input 
                          className="form-control"
                          onChange={this.onChangeActivite}
                          value={this.state.activite}  
                          name="activite" />
                      </div>

                      
                      <div className="email">

                        <label htmlFor="email">Email :</label>
                        <input 
                        className="form-control" 
                        required
                        type="email" 
                        placeholder="Email" 
                        name="email"     
                        value={ this.state.email}             
                        onChange={this.onChangeEmail} 
                        />
                        </div>

                        
                   
                      
                   
                      <div className="password">

                        <label htmlFor="password">Mot de passe :</label>
                        <input 
                        className={formErrors.password.length > 0 ? 'error' : null}
                        required
                        type="password" 
                        placeholder="Password"  
                        name="password"   
                        value={ this.state.password}
                        onChange={this.onChangePassword} 
                        />
                        {
                          formErrors.nom.length > 0 && (
                            <span className="errorMessage">{formErrors.password}</span>
                          )
                        }
                      </div>

                      
                  
                      
                      <div className="tel">

                        <label htmlFor="tel">Téléphone :</label>
                        <input 
                        className={formErrors.tel.length > 0 ? 'error' : null }
                        required
                        type="text"  
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

                        
                   
                      
                      <div className="createAccount">
                          <input type="submit" value="cree compte" className="btn btn-primary" />
                        </div>
                    </form>
          </div>
        </div>
      </div>
      
      
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));


