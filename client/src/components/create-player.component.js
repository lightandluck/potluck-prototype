import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ''
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      name: this.state.name
    }

    console.log(user);

    axios.post('/players/add', user)
      .then(res => {
        console.log(res.data);
        window.location = '/create';
      });

    this.setState({
      name: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Player</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Name: </label>
            <input type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeName}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create Player" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}