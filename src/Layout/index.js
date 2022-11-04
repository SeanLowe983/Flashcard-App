import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Screens/Home.js";
import Study from "../Screens/Study.js";
import CreateDeck from "../Screens/CreateDeck.js";
import Deck from "../Screens/Deck.js";
import EditDeck from "../Screens/EditDeck.js";
import AddCard from "../Screens/AddCard.js";
import EditCards from "../Screens/EditCards.js";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
           <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCards />
          </Route> 
        <NotFound />
        </Switch>
      </div>
    </>
  );
}

export default Layout;
