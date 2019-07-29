import React, { useState } from 'react'
import styled from 'styled-components'
import Button from './button'
import { useDispatch } from 'react-redux'

const Wrapper = styled.div`

  button {
    grid-column: span 2;
    border: 0;
    background: white;
    padding: 1.5rem;

    &:hover {
      transform: none;
    }
  }
`;

const Select = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  .option {
    &:first-of-type {
      grid-column: ${props => props.options < 2 ? `span 2` : `auto` }
    }
  }
`;

const Price = styled.div`
  padding: 2rem 5vw;
  font-size: 18px;
  grid-column: ${props => props.recurrence === 'once' ? `span 1` : `span 2`};
  text-transform: uppercase;
  border-top: 2px solid rgba(51,51,51, 0.2);
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border-top: 2px solid rgba(51,51,51, 0.2);
  border-left: 2px solid rgba(51,51,51, 0.2);

  span {
    margin: 0 1rem;
  }

  button {
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(51,51,51,0.2);
    padding: 0;
    outline: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    font-size: 16px;
  }
`;

const Option = styled.div`
  font-size: 18px;
  text-transform: uppercase;
  padding: 2rem 0;
  cursor: pointer;
  border-top: 2px solid rgba(51,51,51, 0.2);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:before {
      content: "";
      width: 16px;
      height: 16px;
      border: 2px solid rgb(51,51,51);
      border-radius: 50%;
      margin-right: 1rem;
    }
  }

  input {
    display: none;

    &:checked ~ label {
      &:before {
        background: rgb(51,51,51)
      }
    }
  }

  &:nth-of-type(2n){
    border-left: 2px solid rgba(51,51,51, 0.2);
  }
`;

const ProductSelect = ({ options, updateCart, id }) => {

  const dispatch = useDispatch()

  const addToCart = (productId, variationId, quantity) => {

    const item = {
      product_id: productId,
      variation_id: variationId,
      quantity: quantity
    }

    console.log(item)
    dispatch({ type: 'ADD_TO_CART', payload: item})
  }

  const [selectedOption, selectOption] = useState(options[0].id)
  const [ recurrence, selectRecurrence ] = useState('once')
  const [count, updateCount] = useState(1)

  const addToCount = () => {
    updateCount(count + 1)
  }

  const subtractfromCount = () => {
    updateCount(count - 1)
  }

  return (
    <Wrapper>
      <Select options={options.length}>
      {options.map(option => (
        <Option className='option' key={option.id} onClick={() => selectOption(option.id)}>
          <input
            name='option'
            type="radio"
            value={option.id}
            onChange={value => console.log(value)}
            checked={selectedOption === option.id}
          />
          <label htmlFor='option'>{option.attributes[0].option}</label>
        </Option>
      ))}
      </Select>
      <Select>
      <Option onClick={() => selectRecurrence('once')}>
        <input name='recurrence' type="radio" value='once' checked={recurrence === 'once'} onChange={value => console.log(value)}/>
        <label htmlFor='recurrence'>Once</label>
      </Option>
      <Option onClick={() => selectRecurrence('monthly')}>
        <input name='recurrence' type="radio" value='monthly' checked={recurrence === 'monthly'} onChange={value => console.log(value)} />
        <label htmlFor='recurrence'>Monthly</label>
      </Option>
      <Price recurrence={recurrence}>
        {recurrence === 'monthly'
          ? <>${options.find(o => o.id === selectedOption).price} per month</>
          : <>${(options.find(o => o.id === selectedOption).price) * count}</>
        }
      </Price>
      {recurrence === 'once' &&
        <Counter>
          <button disabled={count < 2} onClick={subtractfromCount}>-</button>
          <span>{count}</span>
          <button onClick={addToCount}>+</button>
        </Counter>
      }
      <Button className='btn' onClick={() => addToCart(id, selectedOption, count)}>Add to cart</Button>
      </Select>
    </Wrapper>
  )
}

export default ProductSelect;
