import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SweetAlert from 'react-bootstrap-sweetalert';
const Livreur = props => (
  <tr>
    <td>{props.livreur.nom}</td>
    <td>{props.livreur.num_tel}</td>
    <td>{props.livreur.vehicule_id}</td>

    <td>
      <Link to={"/modifierlivreur/"+props.livreur._id}>
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
      </Link>
      
      <a href="/livreur" onClick={(e) => { props.deleteThisGoal(e,props.livreur._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>


  </tr>
)

export default class LivreurList extends Component {
  constructor(props) {
    super(props);

    this.deleteLivreur = this.deleteLivreur.bind(this)
    this.deleteThisGoal = this.deleteThisGoal.bind(this)
    this.onCancelDelete = this.onCancelDelete.bind(this)

    this.state = {
        livreurs: [],
    alert:null
  };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/livreur')
      .then(response => {
        this.setState({ livreurs: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteLivreur(id) {
    axios.delete('http://localhost:3001/livreur/'+id)
      .then(response => { console.log(response.data)});
     
    this.setState({
        livreurs: this.state.livreurs.filter(el => el._id !== id),
      alert:null
    })

  }
  deleteThisGoal(e,id) {
    e.preventDefault();
    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Supprimer"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Supprimer ce fournisseur?"
        onCancel={() => this.onCancelDelete()}
        onConfirm={() => this.deleteLivreur(id)}
        >
        </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }
  onCancelDelete(){
    this.setState({
        alert: null
    });
}

 

  livreurList() {
    return this.state.livreurs.map(currentlivreur => {
      return <Livreur livreur={currentlivreur} deleteThisGoal={this.deleteThisGoal} key={currentlivreur._id}/>;
    })
  }

    render() {
      return (
        <div>
          <Header/>
          <Sidebar/>
          <div className="content-wrapper">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-1">
                    <h1 className="m-0 text-dark">Livreur</h1>
                  </div>
                  <div className="col-sm-11">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="/livreur">Livreur</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/AjouterLivreur">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter livreur</button>
                </Link> <br/><br/>                 
                <br/>
                <h1 >
                  <center>
                    <div >livreur</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>nom</th>
                        <th>numero</th>
                        <th>véhicule id</th>
                        <th>Actions</th>{this.state.alert}
                      </tr>
                    </thead>         
                    <tbody >
                      { this.livreurList() }
                    </tbody>
                  </table>
                </form>
              </div>
            </section>
          </div>
          <Footer/>
        </div>
      )
    }
  }

