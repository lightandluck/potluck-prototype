import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// const Offering = props => (
//   <tr className="offering">
//     <td>{props.offering.playerName}</td>
//     <td>{props.offering.title}</td>
//     <td>{props.offering.description}</td>
//     <td>
//       <Link to={"/edit/"+props.offering._id}>edit</Link> 
//     </td>
//   </tr>
// )

// TODO: Add ability to edit stewarded items in this list?
const WishlistItem = props => (
  <tr className={props.isSteward ? 'offering' : 'potluck-item'}>
    <td>{props.offering.playerName}</td>
    <td>{props.offering.title}</td>
    <td>{props.offering.description}</td>
    <td>
      
    </td>
  </tr>
)

export default class OfferingsList extends Component {
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
                })
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

  // offeringsList() {
  //   return this.state.offerings
  //     .map(currentoffering => {
  //       return <Offering offering={currentoffering} deleteOffering={this.deleteOffering} key={currentoffering._id}/>;
  //     })
  // }

  wishlistList () {
    return this.state.wishlistItems
      .map(offering => {
        return <WishlistItem isSteward={offering.isSteward} offering={offering.offeringId} key={offering._id}/>;
      })
  }

  onChangePlayerName(e) {
    let idx = e.target.selectedIndex;
	  let dataset = e.target.options[idx].dataset;
    
    // TODO: get this by Player id, is it set in the select option?
    // axios.get('/offerings/byPlayer/' + e.target.value)
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         offerings: response.data
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

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

  render() {
    return (
      <div>
        <h3>Wishlist</h3>
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
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Player name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.wishlistList() }
          </tbody>
        </table>
      </div>
    )
  }
}