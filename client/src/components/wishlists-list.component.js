import React from 'react';
import axios from 'axios';
import {
  Table,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell
} from '@zendeskgarden/react-tables';
import styled from 'styled-components';

const { DragDropContext, Droppable, Draggable } = require('react-beautiful-dnd');
// const GripIcon = require('@zendeskgarden/svg-icons/src/12/grip.svg').default;

const DraggableRow = styled(Row)`
  ${props =>
    props.isDraggingOver
      ? `
    :hover {
      background-color: inherit !important;
    }
  `
      : ''};
`;

class DraggableCell extends React.Component {
  constructor() {
    super();

    this.setRef = this.setRef.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (!this.ref) {
      return null;
    }

    const isDragStarting = this.props.isDragOccurring && !prevProps.isDragOccurring;

    if (!isDragStarting) {
      return null;
    }

    const { width, height } = this.ref.getBoundingClientRect();

    const snapshot = {
      width,
      height
    };

    return snapshot;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const ref = this.ref;

    if (!ref) {
      return;
    }

    if (snapshot) {
      if (ref.style.width === snapshot.width) {
        return;
      }
      ref.style.width = `${snapshot.width}px`;
      ref.style.maxWidth = `${snapshot.width}px`;
      ref.style.height = `${snapshot.height}px`;
      return;
    }

    if (this.props.isDragOccurring) {
      return;
    }

    // inline styles not applied
    if (ref.style.width == null) {
      return;
    }

    // no snapshot and drag is finished - clear the inline styles
    ref.style.removeProperty('height');
    ref.style.removeProperty('width');
    ref.style.removeProperty('maxWidth');
  }

  setRef(ref) {
    this.ref = ref;
  }

  render() {
    return <Cell ref={this.setRef}>{this.props.children}</Cell>;
  }
}

const DraggableContainer = styled.div`
  :focus {
    outline: none;
  }
`;

// const getItems = count =>
//   Array.from({ length: count }, (v, k) => k).map(k => ({
//     id: `item-${k}`,
//     content: `item ${k}`
//   }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class DraggableExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerName: '',
      playerId: '',
      players: [],
      wishlistItems: []
    };

    this.currentPlayer = React.createRef();
    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  
  componentDidMount() {    
    axios.get('/players')
    .then(response => {
      if (response.data.length > 0) {
        let playerData = response.data,
            playerId = playerData[0]._id,
            playerName = playerData[0].name
        
          this.setState({
            players: playerData.map(player => { 
              return { "name": player.name, "_id": player._id }
            }),
            playerName: playerName,
            playerId: playerId
          })

        axios.get('/wishlists/' + playerId)
          .then(response => {
            if (response.data === null) {
              this.setState({ 
                wishlistItems: []
              })
            }
            else {
              this.setState({ 
                wishlistItems: response.data.offerings
              });
            }
          })
          .catch((error) => {
            console.log(error);
          }) 
      }
    })
    .catch((error) => {
      console.log(error);
    })   
  }

  onChangePlayerName(e) {
    let idx = e.target.selectedIndex;
	  let dataset = e.target.options[idx].dataset;

    axios.get('/wishlists/' + dataset.playerid)
      .then(response => {
        if (response.data === null) {
          this.setState({ 
            wishlistItems: []
          })
        }
        else {
          this.setState({
            wishlistItems: response.data.offerings
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

    this.setState({
      playerName: e.target.value,
      playerId: dataset.playerid
    })
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const wishlistItems = reorder(
      this.state.wishlistItems, 
      result.source.index, 
      result.destination.index
    );
    
    // Create an array of only fields needed to update wishlist
    let updateWishlist = wishlistItems.map(function(item) { 
      return { 
        "isSteward": item["isSteward"], 
        "offeringId": item["offeringId"]._id
    }})

    axios.put('/wishlists/update/' + this.state.playerId, updateWishlist)
      .then(res => {
        console.log(res.data);
      })

    this.setState(
      {
        wishlistItems
      },
      () => {
        document.getElementById(result.draggableId).focus();
      }
    );
  }

  // TODO: Add ability to delete from wishlist

  render() {
    return (
      <React.Fragment>
        <div className="form-group"> 
          <label>Player name: </label>
          <select ref={this.currentPlayer}
              required
              className="form-control"
              value={this.state.playerName}
              onChange={this.onChangePlayerName}>
              {
                this.state.players.map(function(player) {
                  return <option 
                    key={player.name}
                    value={player.name}
                    data-playerid={player._id}
                    >
                      {player.name}
                    </option>;
                })
              }
          </select>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Table>
            <Head>
              <HeaderRow>
                {/* <HeaderCell isMinimum /> */}
                <HeaderCell>Title</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Player</HeaderCell>
              </HeaderRow>
            </Head>
            <Droppable droppableId="droppable">
              {(provided, droppableSnapshot) => {
                return (
                  <Body ref={provided.innerRef} isDraggingOver={droppableSnapshot.isDraggingOver}>
                    {this.state.wishlistItems.map((item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided, snapshot) => (
                          <DraggableRow
                            className={item.isSteward ? "offering" : "potluck-item"}
                            ref={provided.innerRef}
                            // isDragging={snapshot.isDragging}
                            // isDraggingOver={droppableSnapshot.isDraggingOver}
                            // isHovered={snapshot.isDragging}
                            // isFocused={
                            //   droppableSnapshot.isDraggingOver ? snapshot.isDragging : undefined
                            // }
                            {...provided.draggableProps.style}
                            {...provided.draggableProps}
                            id={item._id}
                            {...provided.dragHandleProps}
                          >
                            {/* <DraggableCell isMinimum isDragOccurring={snapshot.isDragging}>
                              <DraggableContainer id={item._id} {...provided.dragHandleProps}>
                                <span>:::</span>
                              </DraggableContainer>
                            </DraggableCell> */}
                            <DraggableCell isDragOccurring={snapshot.isDragging}>
                              {item.offeringId.title}
                            </DraggableCell>                          
                            <DraggableCell isDragOccurring={snapshot.isDragging}>
                              {item.offeringId.description}
                            </DraggableCell>
                            <DraggableCell isDragOccurring={snapshot.isDragging}>
                              {item.offeringId.playerName}
                            </DraggableCell>
                          </DraggableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Body>
                );
              }}
            </Droppable>
          </Table>
        </DragDropContext>
      </React.Fragment>
    );
  }
}
<DraggableExample />;