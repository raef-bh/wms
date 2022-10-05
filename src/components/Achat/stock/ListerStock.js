import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../../layouts/Sidebar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import moment from 'moment';
import SweetAlert from 'react-bootstrap-sweetalert';
const Stocks = props => (
  
  <tr>
    <td>{ 1}</td>
    <td>{moment(props.stock.date_achat).format('YYYY-MM-DD')}</td>
    <td>{props.stock.fournisseur}</td>
    <td>{props.stock.totale}</td>

    <td>
      <Link to={"/modifierlivreur/"+props.stock._id}>
        <i className="nav-icon fa fa-edit" style={{"fontSize":"25px"}}></i>
      </Link>
      
      <a href="/stock" onClick={(e) => { props.deleteThisGoal(e,props.stock._id) }}>
        <i className="nav-icon fa fa-trash" style={{"fontSize":"25px"}}></i>
      </a>
    </td>
  </tr>
)

export default class StockList extends Component {
  constructor(props) {
    super(props);

    this.deleteStock = this.deleteStock.bind(this)
    this.deleteThisGoal = this.deleteThisGoal.bind(this)
    this.onCancelDelete = this.onCancelDelete.bind(this)

    this.state = {stockl: [],
      alert:null
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/Stocks/')
      .then(response => {
        this.setState({ stockl: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteStock(id) {
    axios.delete('http://localhost:3001/Stocks/'+id)
      .then(response => { console.log(response.data)});
    this.setState({
      stockl: this.state.stockl.filter(el => el._id !== id),
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
        title="Supprimer ce stock ?"
        onCancel={() => this.onCancelDelete()}
        onConfirm={() => this.deleteStock(id)}
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

  stockList() {
    return this.state.stockl.map(currentstock=> {
      return <Stocks stock={currentstock} deleteThisGoal={this.deleteThisGoal} key={currentstock._id}/>;
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
                      <li className="breadcrumb-item"><a href="/produit">Stock</a></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <section className="content">
              <div className="container-fluid">                      
                <Link to="/ajouterstock">
                  <button className="btn btn-danger" type="submit" 
                  style={{"float":"right","position": "relative"}}>
                  Ajouter Stock</button>
                </Link> <br/>
                <br/>
                <h1 >
                  <center>
                    <div >Stock</div>    
                  </center>
                </h1>
                <br/>
                <form>
                  <table style={{width:"100%"}} className="table  mx-auto">
                    <thead>
                      <tr>
                        <th>Index</th>
                        <th>Date</th>
                        <th>Fournisseur</th>
                        <th>Totale</th>
                        <th>Action</th>{this.state.alert}
                      </tr>
                    </thead>         
                    <tbody >
                      { this.stockList() }
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