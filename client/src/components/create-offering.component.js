import React, { Component } from 'react';
import axios from 'axios';


export default class CreateOffering extends Component {
  constructor(props) {
    super(props);

    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.onChangeOfficialName = this.onChangeOfficialName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      playerName: '',
      playerId: '',
      officialName: '',
      title: '',
      description: '',
      players: []
    }

    this.playerInput = React.createRef();
  }

  componentDidMount() {
    axios.get('/players')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            players: response.data.map(player => player.name),
            playerName: response.data[0].name,
            playerId: response.data[0].playerId
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangePlayerName(e) {
    this.setState({
      playerName: e.target.value
    })
  }

  onChangeOfficialName(e) {
    this.setState({
      officialName: e.target.value
    })
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  async onSubmit(e) {
    e.preventDefault();

    const offering = {
      playerName: this.state.playerName,
      officialName: this.state.officialName,
      title: this.state.title,
      description: this.state.description
    };

    console.log(offering);

    axios.post('/offerings/add', offering)
      .then(res => {
        console.log(res.data);
        window.location = '/';
      });

    // TODO: Fix this to match wishlist schema??
    // Add new offering to personal wishlist, designate as steward
    const offeringInList = {
      playerId: this.state.playerId,
      offeringId: this.props.match.params.id,
      isSteward: true
    }

    await axios.post('/wishlists/add', offeringInList)
      .then(res => {
        console.log(res.data)
        window.location = '/';
      })
      .catch( res => {
        console.log(res.data);
      })
  }

  render() {
    return (
    <div>
      <h3>Create New Offering</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Player name: </label>
          <select ref={this.playerInput}
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
        <div className="form-group"> 
          <label>Official name: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.officialName}
              onChange={this.onChangeOfficialName}
              />
        </div>
        <div className="form-group">
          <label>Title: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <textarea
            className="form-control"
            value={this.state.description}
            onChange={this.onChangeDescription}
          >
          </textarea>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Offering" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}