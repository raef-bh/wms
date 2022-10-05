import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SweetAlert from 'react-bootstrap-sweetalert';
const Produit = props => (
  <tr>
    <td>{props.produit.reference}</td>
    <td>{props.produit.libelle}</td>
    <td>{props.produit.categorie}</td>
    <td>{props.produit.prixHT}</td>
    <td>{props.produit.prixTTC}</td>
    <td>
      <Link to={"/modifierlivreur/"+props.produit._id}>
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
      </Link>
      
      <a href="/produit" onClick={(e) => { props.deleteThisGoal(e,props.produit._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>

  </tr>
)

export default class ProduitList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduit = this.deleteProduit.bind(this)
    this.deleteThisGoal = this.deleteThisGoal.bind(this)
    this.onCancelDelete = this.onCancelDelete.bind(this)

    this.state = {
      produits: [],
    alert:null
  };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/produit')
      .then(response => {
        this.setState({ produits: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProduit(id) {
    axios.delete('http://localhost:3001/produit/'+id)
      .then(response => { console.log(response.data)});
     
    this.setState({
      produits: this.state.produits.filter(el => el._id !== id),
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
        title="Supprimer ce produit?"
        onCancel={() => this.onCancelDelete()}
        onConfirm={() => this.deleteProduit(id)}
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

 

  produitList() {
    return this.state.produits.map(currentproduit => {
      return <Produit produit={currentproduit} deleteThisGoal={this.deleteThisGoal} key={currentproduit._id}/>;
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
                    <h1 className="m-0 text-dark">Vente/produit</h1>
                  </div>
                  <div className="col-sm-11">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="/produit">Produit</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/AjouterProduit">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter produit</button>
                </Link> <br/><br/>                 
                <br/>
                <h1 >
                  <center>
                    <div >Produit</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>Réference</th>
                        <th>Libelle</th>
                        <th>Catégorie</th>
                        <th>PrixHT</th>
                        <th>PrixTTC</th>
                        <th>Actions</th>{this.state.alert}
                      </tr>
                    </thead>         
                    <tbody >
                      { this.produitList() }
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