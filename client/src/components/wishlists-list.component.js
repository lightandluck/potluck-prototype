import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Offering = props => (
  <tr className="offering">
    <td>{props.offering.playerName}</td>
    <td>{props.offering.officialName}</td>
    <td>{props.offering.title}</td>
    <td>{props.offering.description}</td>
    <td>
      <Link to={"/edit/"+props.offering._id}>edit</Link> 
    </td>
  </tr>
)

// TODO: Figure out how to show only items not on wishlist ---- further, already viewed maybe
const WishlistItem = props => (
  <tr className="potluck-item">
    <td>{props.offering.playerName}</td>
    <td>{props.offering.officialName}</td>
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
      offerings: [],
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

          axios.get('/offerings/byPlayer/' + playerName)
            .then(response => {
              if (response.data.length > 0) {
                this.setState({
                  offerings: response.data,
                  players: playerData.map(player => { return { "name": player.name, "_id": player._id }}),
                  playerName: playerName,
                  playerId: playerId
                })
              }
            })
            .catch((error) => {
              console.log(error)
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
                  wishlistItems: response.data.potluckItems
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

  offeringsList() {
    return this.state.offerings
      .map(currentoffering => {
        return <Offering offering={currentoffering} deleteOffering={this.deleteOffering} key={currentoffering._id}/>;
      })
  }

  wishlistList () {
    return this.state.wishlistItems
      .map(currentoffering => {
        return <WishlistItem offering={currentoffering} addToWishlist={this.addToWishlist} key={currentoffering._id}/>;
      })
  }

  onChangePlayerName(e) {
    let idx = e.target.selectedIndex;
	  let dataset = e.target.options[idx].dataset;
    
    axios.get('/offerings/byPlayer/' + e.target.value)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            offerings: response.data
          })
        }
      })
      .catch((error) => {
        console.log(error)
      })

    axios.get('/wishlists/' + dataset.playerid)
      .then(response => {
        if (response.data === null) {
          this.setState({ 
            wishlistItems: []
          })
        }
        else {
          this.setState({
            wishlistItems: response.data.potluckItems
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
              <th>Official name</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.offeringsList() }
            { this.wishlistList() }
          </tbody>
        </table>
      </div>
    )
  }
}