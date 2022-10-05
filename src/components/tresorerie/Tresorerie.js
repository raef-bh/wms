import React, { Component } from 'react'
import styles from '../css/Invoice.module.scss'

import LineItems from './produits'

import { v4 as uuidv4 } from 'uuid';


import axios from 'axios';
import Sidebar from '../layouts/Sidebar';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
class TresorerieList extends Component {

  locale = 'en-US'
  currency = 'USD'

   constructor(props){
    super(props);

    this.state = {
      caisse:0.00,
      tresoreries:[],
      lineItems: [
        {
          id: 'initial',      // react-beautiful-dnd unique key
          client: '',
          date:'',
          TotalTTC: 0.00,
          paye: 0.00,
        },
      ]
    };
  }componentDidMount() {
    axios.get('http://localhost:3001/Tresorerie/',)
    .then(response => {
      if (response.data.length > 0) {
      this.setState({
        tresoreries: response.data.map(client =>{
          this.setState({
            caisse:client.caisse,
            date:client.date,
          })
        })
      })
    }
    console.log(this.state.date)
       
    })
    .catch(function (error) {
        console.log(error);
    })}
  handleInvoiceChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })
    this.setState({lineItems})
  }

  handleAddLineItem = (event) => {
    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id
      lineItems: this.state.lineItems.concat(
        [{ id: uuidv4(), date: this.state.date, client: '', TotalTTC: 0.00, paye: 0.00 }]
      )
    })
  }

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  handleReorderLineItems = (newLineItems) => {
    this.setState({
      lineItems: newLineItems,
    })
  }

  handleFocusSelect = (event) => {
    event.target.select()
  }

  handlePayButtonClick = () => {
    alert('Not implemented')
  }

  formatCurrency = (amount) => {
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.paye )), 0)
  }
  calcaisse = () => {
    return this.state.caisse+this.calcLineItemsTotal()
  }



  render = () => {
    return (

      <div >
      <Header/>
      <Sidebar/>
          <br/><br/><div className={styles.invoice}>
          <LineItems
            items={this.state.lineItems}
            currencyFormatter={this.formatCurrency}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
          />

        <div className={styles.totalContainer}>
        <form>
          </form>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Caisse</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcaisse())}</div>
              </div>
              
            </div>
          </form>
        </div>
        <br/>
        <center><div >
          <button className="btn btn-primary" >Valider</button>
        </div></center>
</div>
      <Footer/>
      </div>

    )
  }

}

export default TresorerieList

