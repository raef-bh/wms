import React, { Component } from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

 class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
    render() {
        return (
          <nav className="main-header navbar navbar-expand navbar-dark navbar-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="/" role="button">
                <i className="fa fa-bars "></i></a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="/dashboard" className="nav-link">Home</a>
              </li>
              <li className="nav-item d-none d-sm-inline-block">
                <a href="/" className="nav-link">Contact</a>
              </li>
            </ul>  
            <form className="form-inline ml-3">
              <div className="input-group input-group-sm">
                <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>  
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <a className="nav-link" href="/profil" role="button">
                  <i className="fa fa-user"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link"  href="/" onClick={this.onLogoutClick} role="button">
                  <i className="fa fa-sign-out"></i>
                </a>
              </li>
            </ul>
          </nav>
        );
        }
  }

  Header.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Header);

