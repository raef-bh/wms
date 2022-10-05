import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SweetAlert from 'react-bootstrap-sweetalert';
const Composant = props => (
  <tr>
    <td>{props.composant.libelle}</td>
    <td>{props.composant.categorie}</td>
    <td>{props.composant.prixHT}</td>
    <td>{props.composant.prixTTC}</td>
    <td>
      <Link to={"/modifierlivreur/"+props.composant._id}>
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
      </Link>
      
      <a href="/composant" onClick={(e) => { props.deleteThisGoal(e,props.composant._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>

  </tr>
)

export default class ComposantList extends Component {
  constructor(props) {
    super(props);

    this.deleteComposant = this.deleteComposant.bind(this)
    this.deleteThisGoal = this.deleteThisGoal.bind(this)
    this.onCancelDelete = this.onCancelDelete.bind(this)

    this.state = {
      composants: [],
    alert:null
  };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/composant')
      .then(response => {
        this.setState({ composants: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteComposant(id) {
    axios.delete('http://localhost:3001/composant/'+id)
      .then(response => { console.log(response.data)});
     
    this.setState({
      composants: this.state.composants.filter(el => el._id !== id),
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
        title="Supprimer ce composant ?"
        onCancel={() => this.onCancelDelete()}
        onConfirm={() => this.deleteComposant(id)}
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

 

  composantList() {
    return this.state.composants.map(currentcomposant => {
      return <Composant composant={currentcomposant} deleteThisGoal={this.deleteThisGoal} key={currentcomposant._id}/>;
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
                    <h1 className="m-0 text-dark">Achat/composant</h1>
                  </div>
                  <div className="col-sm-11">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="/composant">Composant</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/AjouterComposant">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter composant</button>
                </Link> <br/><br/>                 
                <br/>
                <h1 >
                  <center>
                    <div >composant</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>Libelle</th>
                        <th>Catégorie</th>
                        <th>PrixHT</th>
                        <th>PrixTTC</th>
                        <th>Actions</th>{this.state.alert}
                      </tr>
                    </thead>         
                    <tbody >
                      { this.composantList() }
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

