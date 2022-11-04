import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";

function Deck() {
    const history = useHistory();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
  
  useEffect(() => {
    const abortController = new AbortController();
    async function getData(){
      try{
        const deckResponse = await readDeck(deckId, abortController.signal);
        setDeck(deckResponse);
       setCards(deckResponse.cards);
      } catch (error){
        console.error("Something went wrong", error);
      }
      return () => {
        abortController.abort();
      };
    }
    getData();
  }, [deckId, setDeck]);
  
  async function handleDeleteDeck(deck){
    if (
    window.confirm(`Delete this deck? You will not be able to recover it.`)
    ){
      const abortController = new AbortController()
   try {
        history.go(0);
        return await deleteDeck(deck.id, abortController.signal);
       } catch (error) {
            console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
  }

  async function handleDeleteCard(cards) {
    if (
        window.confirm(
            `Delete this card? You will not be able to recover it`
        )
    ) {
        const abortController = new AbortController();
        try {
            history.go(0);
            return await deleteCard(cards.id, abortController.signal);
        } catch (error) {
            console.error("Something went wrong", error);
        }
        return () => {
            abortController.abort();
        };
    }
  }
  
  async function handleEditDeck() {
        history.push(`/decks/${deckId}/edit`);
    }

    async function handleStudy() {
        history.push(`/decks/${deckId}/study`);
    }

    async function handleAddCard() {
        history.push(`/decks/${deckId}/cards/new`);
    }

    async function handleEditCard(cards) {
 
        history.push(`/decks/${deckId}/cards/${cards.id}/edit`);
    }

    if (cards.length > 0) {
        return (
            <React.Fragment>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active">{deck.name}</li>
                </ol>
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">{deck.name}</h2>
                        <p>{deck.description}</p>
                        <button className="btn btn-secondary mx-1" onClick={() => handleEditDeck()}>                        
                            Edit
                        </button>
                        <button className="btn btn-primary mx-1" onClick={() => handleStudy()}>  
                            Study
                        </button>
                        <button className="btn btn-primary mx-1" onClick={() => handleAddCard()}>                         
                            Add Cards
                        </button>
                        <button className="btn btn-primary mx-1" onClick={() => handleDeleteDeck(deck)}>                        
                            Delete
                        </button>
                    </div>
                </div>
                <h1>Cards</h1>
                {cards.map((cards) => {
                    return (
                        <div className="card-deck" key={cards.id}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{cards.front}</div>
                                        <div className="col">{cards.back}</div>
                                    </div>
                                    <div className="container row">
                                        <button className="btn btn-secondary mx-1" onClick={() => handleEditCard(cards)}>                                    
                                            Edit
                                        </button>
                                        <button className="btn btn-danger mx-1" onClick={() => handleDeleteCard(cards)}>                                      
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </React.Fragment>
        );
    } else {
        return null;
    } 
}
export default Deck;