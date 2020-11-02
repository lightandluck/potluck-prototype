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
      <Link to={"/edit/"+props.offering._id}>edit</Link> | <button onClick={() => { props.deleteOffering(props.offering._id) }}>delete</button>
    </td>
  </tr>
)

const PotluckItem = props => (
  <tr className="potluck-item">
    <td>{props.offering.playerName}</td>
    <td>{props.offering.officialName}</td>
    <td>{props.offering.title}</td>
    <td>{props.offering.description}</td>
    <td></td>
  </tr>
)

export default class OfferingsList extends Component {
  constructor(props) {
    super(props);

    this.deleteOffering = this.deleteOffering.bind(this)

    this.state = {
      playerName: '',
      offerings: [],
      players: []
    };

    this.currentPlayer = React.createRef();
    this.onChangePlayerName = this.onChangePlayerName.bind(this);
  }

  componentDidMount() {
    axios.get('/offerings')
      .then(response => {
        this.setState({ offerings: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      axios.get('/players')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            players: response.data.map(player => player.name),
            playerName: response.data[0].name
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteOffering(id) {
    axios.delete('/offerings/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      offerings: this.state.offerings.filter(el => el._id !== id)
    })
  }

  offeringsList() {
    let currentPlayerName = this.state.playerName;
    return this.state.offerings
      .filter(el => el.playerName === currentPlayerName)
      .map(currentoffering => {
        return <Offering offering={currentoffering} deleteOffering={this.deleteOffering} key={currentoffering._id}/>;
      })
  }

  potluckList () {
    let currentPlayerName = this.state.playerName;
    return this.state.offerings
      .filter(el => el.playerName !== currentPlayerName)
      .map(currentoffering => {
        return <PotluckItem offering={currentoffering} deleteOffering={this.deleteOffering} key={currentoffering._id}/>;
      })
  }

  onChangePlayerName(e) {
    this.setState({
      playerName: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Offerings</h3>
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
                    key={player}
                    value={player}>{player}
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
            <tr>&nbsp;</tr>
            { this.potluckList() }
          </tbody>
        </table>
      </div>
    )
  }
}