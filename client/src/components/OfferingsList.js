// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const OfferingsList = () => {
//   useEffect(() => {
//     // Same as componentDidMount, `[]` empty bracket means we only run once
//     // If this was dependent on props passed to component and needs to be changed,
//     // place dependent variables inside bracket to define it
//     axios.get('/offerings')
//       .then(response => {
//         this.setState({ offerings: response.data })
//       })
//       .catch((error) => {
//         console.log(error);
//       })

//       axios.get('/players')
//       .then(response => {
//         if (response.data.length > 0) {
//           this.setState({
//             players: response.data.map(player => { return { "name": player.name, "_id": player._id }}),
//             playerName: response.data[0].name,
//             playerId: response.data[0]._id
//           })
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//   }, [])
// }


// // TODO: Add confirmation to delete action!
// const Offering = props => (
//   <tr className="offering">
//     <td>{props.offering.playerName}</td>
//     <td>{props.offering.officialName}</td>
//     <td>{props.offering.title}</td>
//     <td>{props.offering.description}</td>
//     <td>
//       <button><Link to={"/edit/"+props.offering._id}>edit</Link></button> | <Link to="" onClick={() => { props.deleteOffering(props.offering._id) }}>delete</Link>
//     </td>
//   </tr>
// )

// // TODO: Figure out how to show only items not on wishlist ---- further, already viewed maybe
// const PotluckItem = props => (
//   <tr className="potluck-item">
//     <td>{props.offering.playerName}</td>
//     <td>{props.offering.officialName}</td>
//     <td>{props.offering.title}</td>
//     <td>{props.offering.description}</td>
//     <td>
//       <button onClick={() => props.addToWishlist(props.offering)}>Add to wishlist</button>
//     </td>
//   </tr>
// )

// export default OfferingsList

// // export default class OfferingsList extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.deleteOffering = this.deleteOffering.bind(this);
// //     this.addToWishlist = this.addToWishlist.bind(this);

// //     this.state = {
// //       playerName: '',
// //       playerId: '',
// //       offerings: [],
// //       players: []
// //     };

// //     this.currentPlayer = React.createRef();
// //     this.onChangePlayerName = this.onChangePlayerName.bind(this);
// //   }

// //   componentDidMount() {
// //     axios.get('/offerings')
// //       .then(response => {
// //         this.setState({ offerings: response.data })
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       })

// //       axios.get('/players')
// //       .then(response => {
// //         if (response.data.length > 0) {
// //           this.setState({
// //             players: response.data.map(player => { return { "name": player.name, "_id": player._id }}),
// //             playerName: response.data[0].name,
// //             playerId: response.data[0]._id
// //           })
// //         }
// //       })
// //       .catch((error) => {
// //         console.log(error);
// //       })
// //   }

// //   deleteOffering(id) {
// //     axios.delete('/offerings/'+id)
// //       .then(response => { console.log(response.data)});

// //     this.setState({
// //       offerings: this.state.offerings.filter(el => el._id !== id)
// //     })
// //   }

// //   addToWishlist(offering) {
// //     const wishedItem = {
// //       playerId: this.state.playerId,
// //       offeringId: offering._id,
// //       isSteward: false
// //     }

// //     axios.post('/wishlists/add', wishedItem)
// //       .then(res => {
// //         console.log(res.data)
// //       })
// //       .catch(err => {
// //         console.log(err)
// //       })
// //   }

// //   offeringsList() {
// //     let currentPlayerName = this.state.playerName;
// //     return this.state.offerings
// //       .filter(el => el.playerName === currentPlayerName)
// //       .map(currentoffering => {
// //         return <Offering offering={currentoffering} deleteOffering={this.deleteOffering} key={currentoffering._id}/>;
// //       })
// //   }

// //   // TODO: Figure out how to show only items not on wishlist ---- further, already viewed maybe
// //   potluckList () {
// //     let currentPlayerName = this.state.playerName;
// //     return this.state.offerings
// //       .filter(el => el.playerName !== currentPlayerName)
// //       .map(currentoffering => {
// //         return <PotluckItem offering={currentoffering} addToWishlist={this.addToWishlist} key={currentoffering._id}/>;
// //       })
// //   }

// //   onChangePlayerName(e) {
// //     let idx = e.target.selectedIndex;
// // 	  let dataset = e.target.options[idx].dataset;
  
// //     this.setState({
// //       playerName: e.target.value,
// //       playerId: dataset.playerid
// //     })
// //   }

// //   render() {
// //     return (
// //       <div>
// //         <h3>Logged Offerings</h3>
// //         <div className="form-group"> 
// //           <label>Player name: </label>
// //           <select ref={this.currentPlayer}
// //               required
// //               className="form-control"
// //               value={this.state.playerName}
// //               onChange={this.onChangePlayerName}>
// //               {
// //                 this.state.players.map(function(player) {
// //                   return <option 
// //                     key={player._id}
// //                     value={player.name}
// //                     data-playerid={player._id}
// //                     >
// //                       {player.name}
// //                     </option>;
// //                 })
// //               }
// //           </select>
// //         </div>
// //         <table className="table">
// //           <thead className="thead-light">
// //             <tr>
// //               <th>Player name</th>
// //               <th>Official name</th>
// //               <th>Title</th>
// //               <th>Description</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             { this.offeringsList() }
// //             <tr><td colSpan="5">Potluck Items</td></tr>
// //             { this.potluckList() }
// //           </tbody>
// //         </table>
// //       </div>
// //     )
// //   }
// // }