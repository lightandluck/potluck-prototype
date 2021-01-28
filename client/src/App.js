import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
 
import Navbar from "./components/navbar.component"
import OfferingsList from "./components/offerings-list.component";
import EditOffering from "./components/edit-offering.component";
import CreateOffering from "./components/create-offering.component";
import CreatePlayer from "./components/create-player.component";
import WishlistsList from "./components/wishlists-list.component";
import TotalWantlist from './components/total-wantlist.component';

// TODO: REALLY GET HANDLE DELETING STUFF BETTER. Delete from all wishlist after deleting offering
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={OfferingsList} />
        <Route path="/edit/:id" component={EditOffering} />
        <Route path="/create" component={CreateOffering} />
        <Route path="/player" component={CreatePlayer} />
        <Route path="/wishlist" component={WishlistsList} />
        <Route path="/totalwantlist" component={TotalWantlist} />
      </div>
    </Router>
  );
 }
 
export default App;