import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
const Commande = props => (
  
  <tr>
    <td>{ 1}</td>
    <td>{moment(props.commande.date_livraison).format('YYYY-MM-DD')}</td>
    <td>{props.commande.livreur}</td>
    <td>{props.commande.totale}</td>
    <td>{props.commande.etat}</td>
    <td>
      <Link to={"/modifierlivreur/"+props.commande._id}>
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
      </Link>
      
      <a href="/commande" onClick={(e) => { props.deleteThisGoal(e,props.commande._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>

    
  </tr>
)

export default class CommandeList extends Component {
  constructor(props) {
    super(props);

    this.deleteCommande = this.deleteCommande.bind(this)
    this.deleteThisGoal = this.deleteThisGoal.bind(this)
    this.onCancelDelete = this.onCancelDelete.bind(this)

    this.state = {commandel: [],
      alert:null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Commande/')
      .then(response => {
        this.setState({ commandel: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCommande(id) {
    axios.delete('http://localhost:3001/Commande/'+id)
      .then(response => { console.log(response.data)});
    this.setState({
      commandel: this.state.commandel.filter(el => el._id !== id),
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
        title="Supprimer cette commande?"
        onCancel={() => this.onCancelDelete()}
        onConfirm={() => this.deleteCommande(id)}
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

  commandeList() {
    return this.state.commandel.map(currentcommande=> {
      return <Commande commande={currentcommande} deleteThisGoal={this.deleteThisGoal} key={currentcommande._id}/>;
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
                    <h1 className="m-0 text-dark">Dashboard</h1>
                  </div>
                  <div className="col-sm-11">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="/produit">Commande</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/AjouterCommande">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter Commande</button>
                </Link> <br/>
                <br/>
                <h1 >
                  <center>
                    <div >Commande</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Date</th>
                        <th>Livreur</th>
                        <th>Totale</th>
                        <th>etat</th>
                        <th>Action</th>{this.state.alert}
                      </tr>
                    </thead>         
                    <tbody >
                      { this.commandeList() }
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