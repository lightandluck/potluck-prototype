import React, { Component } from 'react';
import axios from 'axios';

export default class EditOffering extends Component {
  constructor(props) {
    super(props);

    this.onChangePlayerName = this.onChangePlayerName.bind(this);
    this.onChangeOfficialName = this.onChangeOfficialName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      playerName: '',
      officialName: '',
      title: '',
      description: '',
      players: []
    }

    this.playerInput = React.createRef();
  }

  componentDidMount() {
    axios.get('/offerings/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          playerName: response.data.playerName,
          officialName: response.data.officialName,
          title: response.data.title,
          description: response.data.description
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('/players/')
      .then(response => {
        this.setState({ players: response.data.map(player => player.name) });
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

  onSubmit(e) {
    e.preventDefault();

    const offering = {
      playerName: this.state.playerName,
      officialName: this.state.officialName,
      title: this.state.title,
      description: this.state.description
    };

    console.log(offering);

    axios.post('/offerings/update/'+this.props.match.params.id, offering)
      .then(res => {
        console.log(res.data);
        window.location = '/';
      });
    
  }

  render() {
    return (
      <div>
        <h3>Edit Offering Log</h3>
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
          <input type="submit" value="Edit Offering" className="btn btn-primary" />
        </div>
      </form>
      </div>
    )
  }
}