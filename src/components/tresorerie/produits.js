import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import LineItem from './produitList'
import styles from '../css/LineItems.module.scss'



class LineItems extends Component {

  handleDragEnd = (result) => {

    if (!result.destination) return

    // helper function to reorder result (src: react-beautiful-dnd docs)
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    }

    // perform reorder
    const lineItems = reorder(
      this.props.items,
      result.source.index,
      result.destination.index
    )

    // call parent handler with new state representation
    this.props.reorderHandler(lineItems)

  }

  render = () => {

    const {items, addHandler, reorderHandler, ...functions} = this.props

    return (
      <form>

        <div className={styles.lineItems}>
          <center><h1>Trésorerie</h1></center>
          <div className={`${styles.gridTabletre}`}>

            <div className={`${styles.row} ${styles.header}`}>
              <div>#</div>
              <div>Type</div>
              <div>Date</div>
              <div>Intitule</div>
              <div>Montant TTC</div>
              <div>Montant à payer</div>
              <div>Action</div>
            </div>

            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={snapshot.isDraggingOver ? styles.listDraggingOver : ''}
                  >
                    {this.props.items.map((item, i) => (
                      <Draggable key={item.id} draggableId={item.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={provided.draggableProps.style}
                            className={snapshot.isDragging ? styles.listItemDragging : ''}
                          >
                            <LineItem
                              style={{color: 'red'}}
                              key={i + item.id} index={i} date={item.date}
                              client={item.client} TotalTTC={item.TotalTTC} paye={item.paye}
                              {...functions}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
            </Droppable>
          </DragDropContext>

          </div>

        </div>
      </form>

    )
  }
}

export default LineItems

LineItems.propTypes = {
  items: PropTypes.array.isRequired,
  currencyFormatter: PropTypes.func.isRequired,
  addHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  focusHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  reorderHandler: PropTypes.func.isRequired,
}

