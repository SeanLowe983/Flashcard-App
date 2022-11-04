import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from './CardForm';

function EditCards() {
  const { cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function fetchData() {
      try {
     
        const response = await readCard(cardId, signal);
        setCard(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => abortController.abort();
  }, [cardId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    const signal = abortController.signal;

    if (card.front.length === 0) {
      alert('Front card is required');
    } else if (card.back.length === 0) {
      alert('Back card is required');
    } else {
      try {
        await updateCard(card, signal);
        history.push(`/decks/${card.deckId}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/' className='text-decoration-none'>
              <i className='fa-solid fa-house' /> Home
            </Link>
          </li>
          <li className='breadcrumb-item active'>Edit Card</li>
        </ol>
      </nav>
      <h1>Edit Card</h1>
      <CardForm
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        buttonGrayText={'Cancel'}
        buttonBlueText={'Submit'}
      />
    </div>
  );
}

export default EditCards;

