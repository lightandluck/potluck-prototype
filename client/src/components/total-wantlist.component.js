import React, { Component } from 'react';
import axios from 'axios';

export default class TotalWantlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      officialNamesList: '',
      wantlist: ''
    }
  }

  async componentDidMount() {
    await axios.get('/offerings').then(response => {
      let officialNamesList = ''
      for (let item of response.data) {
        officialNamesList += `${item.officialName} ===> "${item.title}" (from ${item.playerName}) \n`;
      }

      this.setState({
        officialNamesList: officialNamesList.trim()
      })
    });
    
    // TODO: 
    await axios.get('/players').then(async players => {
      let wantlist = ''
      for (let player of players.data) {
        let playerWantlist = await axios.get('/wishlists/' + player._id)
        if (playerWantlist.data) {
          wantlist += this.printWantlist(player.name, playerWantlist.data.offerings) + '\n';
        }
      }

      this.setState({
        wantlist: wantlist.trim()
      });
    })
  }

  render() {
    return (
      <div>
        <p style={{whiteSpace: "pre-wrap"}}>
          #! REQUIRE-COLONS <br />
          #! REQUIRE-USERNAMES <br />

          !BEGIN-OFFICIAL-NAMES <br />

          {this.state.officialNamesList} <br />
          !END-OFFICIAL-NAMES <br />

          {this.state.wantlist}
        </p>
      </div>
    )
  }

  printWantlist(playerName, wishlist) {
    let wantlist = '';
    let tradeItems = '';

    for (let item of wishlist) {
      if (!item.isSteward) {
        tradeItems += item.offeringId.officialName + ' ';
      }
      else if (item.isSteward) {
        wantlist += `(${playerName}) ${item.offeringId.officialName} : ${tradeItems.trim()} \n`;
      }
    }

    return wantlist.trim();
  }
}