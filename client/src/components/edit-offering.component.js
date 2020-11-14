import React, { Component } from 'react';
import axios from 'axios';

export default class EditOffering extends Component {
  constructor(props) {
    super(props);

    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      playerName: '',
      playerId: '',
      officialName: '',
      title: '',
      description: ''
    }
  }

  componentDidMount() {
    axios.get('/offerings/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          playerName: response.data.playerName,
          playerId: response.data.playerId,
          officialName: response.data.officialName,
          title: response.data.title,
          description: response.data.description
        })   
      })
      .catch(function (error) {
        console.log(error);
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

    await axios.post('/offerings/update/'+this.props.match.params.id, offering)
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    return (
      <div>
        <h3>Edit Offering Log</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Player name: </label>
          <p>{this.state.playerName}</p>
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