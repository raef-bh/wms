import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../css/LineItem.module.scss'

import axios from 'axios';
import moment from 'moment';



class LineItem extends Component {
  constructor(props) {
    super(props);
  this.state={
    nom:'',
    clients:[],
    TotalTTC:0,
    date:'',
    tresoreries:[]
  }
}
   componentDidMount() {
    axios.get('http://localhost:3001//commande',)
    .then(response => {
      if (response.data.length > 0) {
      this.setState({
        clients: response.data.map(client =>{
          this.setState({
            nom:client.client,
            TotalTTC:client.TotalTTC
          })
        })
      })
    }
    console.log(this.state.nom)
       
    })
    .catch(function (error) {
        console.log(error);
    })
      console.log(this.state.nom)
      axios.get('http://localhost:3001/stock/',)
      .then(response => {
        if (response.data.length > 0) {
        this.setState({
          clients: response.data.map(client =>{
            this.setState({
              nomf:client.fournisseur,
              TotalTTCf:client.TotalTTC
            })
          })
        })
      }
      console.log(this.state.nom)
         
      })
      .catch(function (error) {
          console.log(error);
      })
        //recupérer date tresoreire
        axios.get('http://localhost:3001/Tresorerie/',)
    .then(response => {
      if (response.data.length > 0) {
      this.setState({
        tresoreries: response.data.map(client =>{
          this.setState({
            date:client.date,
          })
        })
      })
    }
    console.log(this.state.date)
       
    })
    .catch(function (error) {
        console.log(error);
    })
        
  }
  render = () => {
    const { index, quantity, price } = this.props

    return (<div>
      <div className={styles.lineItemtre}>
        <div>{index + 1}</div>
        <div>{" client"}</div>    
        <div className={styles.currency} name="date">{this.state.date}</div>
        <div><input name="client" type="text" value={this.state.nom} /></div>
        <div><input name="TotalTTC" type="number" step="1" value={this.state.TotalTTC} onChange={this.props.changeHandler(index)} /></div>
        <div className={styles.currency}><input name="paye" type="number" onChange={this.props.changeHandler(index)} /></div>

        <div><i className="nav-icon fa fa-money" style={{"fontSize":"25px",color:"#00ff00"}}></i>
        </div> 
      </div>
      <div className={styles.lineItemtre}>
        <div>{2}</div>
        <div>{" fournisseur"}</div>    
        <div className={styles.currency}>{moment(Date()).format('YYYY-MM-DD')}</div>
        <div><input name="nom" type="text" value={this.state.nomf} /></div>
        <div><input name="TotalTTC" type="number" step="1" value={this.state.TotalTTCf} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /></div>
        <div className={styles.currency}><input name="price" type="number" step="0.01" min="0.00" max="9999999.99" value={price} onChange={this.props.changeHandler(index)} onFocus={this.props.focusHandler} /></div>

        <div><i className="nav-icon fa fa-money" style={{"fontSize":"25px",color:"#ff0000"}}></i>
        </div>
      </div></div>
    )
  }
}

export default LineItem

LineItem.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}


