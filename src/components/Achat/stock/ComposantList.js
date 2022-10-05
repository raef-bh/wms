import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MdCancel as DeleteIcon } from 'react-icons/md'
import styles from '../../css/LineItem.module.scss'

import axios from 'axios';

class LineItem extends Component {
constructor(props){
    super(props);
    this.state={   
        composants:[],
        libelle:'',
        prixht:0.00,

    }
  }
componentDidMount() {
    axios.get('http://localhost:3001/Composant/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            composants: response.data.map(composant => composant.libelle)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
  

  render = () => {
    const { index, quantite,libelle, categorie ,prixht} = this.props

    return (
      <div className={styles.lineItem}>
        <div>{index + 1}</div>
        <div>
        <select 
            name="libelle"
            value={libelle}
            type="text"
            onChange={this.props.changeHandler(index)}
                > 
                    <option></option>                                   
                    {
                        this.state.composants.map((libelle,i)=> {
                        return <option 
                            key={i}
                            value={libelle}>{libelle}
                            </option>
                        })
                    }
                </select>
            
        </div>
        
        <div><input name="quantite" type="number" value={quantite} onChange={this.props.changeHandler(index)}  /></div>
        <div>
        <input name="categorie" type="text" value={categorie} onChange={this.props.changeHandler(index)}  /> 
        </div>
        <div className={styles.currency}>{/*this.renderSelectedClient(libelle) value={this.state.prixht}*/}
        <input name="prixht" type="number" value={prixht} onChange={this.props.changeHandler(index)} /></div>
        <div className={styles.currency}>{this.props.currencyFormatter( prixht *quantite)}</div>
        <div>
          <button type="button"
            className={styles.deleteItem}
            onClick={this.props.deleteHandler(index)}
          ><DeleteIcon size="1.25em" /></button>
        </div>
      </div>
    )
  }
}

export default LineItem

LineItem.propTypes = {
  index: PropTypes.number.isRequired,
  libelle: PropTypes.string,
  categorie: PropTypes.string,
  quantite: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prixht: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
