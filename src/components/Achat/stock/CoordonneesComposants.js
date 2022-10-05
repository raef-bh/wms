import React, { Component } from 'react'
import styles from '../../css/Invoice.module.scss'

import LineItems from './Composant'

import { v4 as uuidv4 } from 'uuid';

class CoordonneesComposant extends Component {
  currency = 'USD'
 
   constructor(props){
    super(props);

    this.sendTTC= this.sendTTC.bind(this);
  
    this.onSubmit= this.onSubmit.bind(this);
    this.state = {
      totale:0.00,
      lineItems: [
        {
          id: 'initial',      // react-beautiful-dnd unique key
          libelle: '',
          categorie:'',
          quantite: 0,
          prixht: 0.00,
        },
      ]
    };
  }
  onSubmit=()=>{
    this.sendTTC();
    
  }
  sendTTC = () => {
    this.props.onSubmitMessage( this.calcLineItemsTotal());
  }
   
  onChangeTotalTTC(e) {
    this.setState({
        totalTTC: e.target.value
    })
  }
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
        [{ id: uuidv4(), libelle: '', categorie: '', quantite: 0, prixht: 0.00 }]
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
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantite * cur.prixht)), 0)
  }

  render = () => {
    return (

      <div >
          <br/><br/>

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
                <div className={styles.label}>TotaleTTC</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
              </div>
              </div>
              </form>
        </div>
        <br/>
        <center><div >
          <button className="btn btn-primary"  onClick={this.sendTTC}>Valider</button>
        </div></center>


      </div>

    )
  }

}

export default CoordonneesComposant





