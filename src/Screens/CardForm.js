import React from 'react';
import { Link, useParams } from 'react-router-dom';
function CardForm({
  card,
  handleChange,
  handleSubmit,
  buttonGrayText,
  buttonBlueText,
}) {
  const { deckId } = useParams();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='front' className='d-flex justify-content-between'>
            Front
            {card.front && card.front.length > 0 && (
              <small className='text-muted'>{card.front.length}/500</small>
            )}
          </label>
          <textarea
            type='textarea'
            className='form-control'
            id='front'
            name='front'
            value={card.front}
            onChange={handleChange}
            maxLength='500'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='back' className='d-flex justify-content-between'>
            Back
            {card.back && card.back.length > 0 && (
              <small className='text-muted'>{card.back.length}/500</small>
            )}
          </label>
          <textarea
            type='textarea'
            className='form-control'
            id='back'
            name='back'
            value={card.back}
            onChange={handleChange}
            maxLength='500'
            required
          />
        </div>
        <div className='form-group'>
          <Link to={`/decks/${deckId}`} className='btn btn-secondary'>
            {buttonGrayText}
          </Link>
          <button type='submit' className='btn btn-primary ml-2'>
            {buttonBlueText}
          </button>
        </div>
      </form>
    </div>
  );
}
export default CardForm;