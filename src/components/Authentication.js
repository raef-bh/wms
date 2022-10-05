import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import classnames from "classnames";

import './css/Formulaire.css';



class Login extends Component {
  constructor() {
    super();
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      errors: {},
      
      message: "",
      alert:null
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/Dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  

 
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData)

    this.setState({
      email:'',
      password:''
    })
  };

  render() {
    const { errors } = this.state;
    
    return (
      <div>

        
        <div className="content-header" >
                <div className="wrapper">
                    <div className="form-wrapperlog">
                        <center><h5>
                        <i className="fa fa-sign-in"></i>
                        Authentification
                        </h5></center>
                            <h3 style={{background:"#ffd7da",color:"#a8686e"}}>
                              <center>
                              {errors.email}
                              {errors.emailnotfound}
                              {errors.password}
                              {errors.passwordincorrect}</center>
                            </h3>
                        <form onSubmit={this.onSubmit} noValidate>
                          
                        <div className="emaillog">
                            <label htmlFor="email">Email :</label>                            
                            <input                             
                              style={{width:"100%"}}
                              onChange={this.onChange}
                              value={this.state.email}
                              error={errors.email}
                              id="email"
                              type="email"
                              placeholder="Email"
                              className={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                              })}
                            />
                        </div>
                        
                        <div className="passwordlog">
                            <label htmlFor="password">Mot de passe :</label>
                            
                            <input
                            style={{width:"100%"}}
                              onChange={this.onChange}
                              value={this.state.password}
                              error={errors.password}
                              id="password"
                              type="password"
                              placeholder="Mot de passe"
                              className={classnames("", {
                                invalid: errors.password || errors.passwordincorrect
                              })}
                            />
                            
                        </div>
                        <div className="createAccount">
                          <br/> 
                          <input type="submit" value="S'identifier" className="btn btn-primary btn-block" />
                        </div>
                        </form>                        
                        <br/>
                        <div className="text-center"><p>Vous n'avez pas de compte? {" "}
                          <Link to="/creecompte">
                            <button className="btn btn-danger" type="submit">S'inscrire</button>
                          </Link>
                        </p>
                          <a className="d-block small" href="forgot-password.html">Mot de passe oublié?</a>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
