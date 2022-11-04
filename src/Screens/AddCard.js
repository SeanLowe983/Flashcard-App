import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from './CardForm';


function AddCard(){
  const history = useHistory();
  const {deckId} = useParams();
  const initialState ={front: "", back: "",};
  const [deck, setDeck] = useState({});
  const [newCard, setNewCard] = useState(initialState);
  
  useEffect(() =>{
    const abortController = new AbortController();
    async function getData(){
      try {
        const response = await readDeck(deckId, abortController.signal);
                setDeck(response);
      } catch (error){
        console.error("Something went wrong", error);
      }
      return() => {
        abortController.abort();
      }; 
    }
    getData();
  }, []);
  
  function handleChange({target}) {
    setNewCard({...newCard, [target.name]: target.value});
  }
  
  async function handleSubmit(event){
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createCard(deckId, {...newCard}, abortController.signal);
    history.go(0);
    setNewCard(initialState);
    return response;
  }
  async function handleDone(){
    history.push(`/decks/${deckId}`);
  }
  
    return (
        <div>
        <nav aria-label='breadcrumb'>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active">Add Card</li>
            </ol>
        </nav>
           <h1>Add Card</h1>
      <CardForm
        card={createCard}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonGrayText={'Cancel'}
        buttonBlueText={'Submit'}
      />
        </div>
    );
}
export default AddCard;