import React, { useState } from 'react'
import styled from 'styled-components'
import ProductListBlock from './productListBlock'
import { StaticQuery, graphql } from 'gatsby'
import { device } from '../utils/devices'

const Wrapper = styled.section`
  margin: 0 auto 4rem;
`;

const List = styled.ul`
  list-style: none;
  font-size: 30px;
  font-weight: 300;
  padding: 0;
  margin: 0;

  @media ${device.laptop}{
    font-size: 48px;
  }
`;

const Item = styled.li`
  border-bottom: 2px solid black;
  display: flex;
  align-items: baseline;
  cursor: pointer;
  flex-direction: column;

  &:last-of-type {
    border: 0;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 24px;
      padding: 2rem 0;

      &:hover {
        padding: 2rem 0;
      }
    }
  }

  .expandable {
    font-size: 18px;

    span {
      font-size: 24px;
    }
  }

  h2 {
    font-size: 30px;
    font-weight: normal;
    padding: 2rem 5vw;
    margin: 0;
    transition: 0.2s all ease-in-out;
    text-transform: uppercase;

    @media ${device.laptop}{
      font-size: 48px;
    }

    &:hover {
      padding-left: 4.5vw;
    }
  }

  &:after {
    content: ${props => props.after ? props.after : ''};
  }
`;

const ProductList = ({updateCart}) => {

  const [ selected, select ] = useState('');

  // const handleSelect = (product) => {
  //   if(selected === ''){
  //     select(product)
  //   } else {
  //     select('')
  //   }
  // }

  return (
  <StaticQuery
    query={graphql`
      query MyQuery {
        allWcProductsCategories {
          edges {
            node {
              wordpress_id
              name
              slug
              products {
                id
                wordpress_id
                sku
                name
                description
                variations {
                  attributes {
                    option
                  }
                  price
                  sku
                  id
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <Wrapper>
        <List>
          {data.allWcProductsCategories.edges.slice(0,3).map(({node}) => (
            <Item
              key={node.wordpress_id}
              selected={selected === node.wordpress_id}
              onClick={() => select(node.wordpress_id)}
            >
              <h2>{node.name}</h2>
              {selected === node.wordpress_id &&
                <ProductListBlock
                  products={node.products}
                  title={node.name}
                  info={node.info}
                  id={node.wordpress_id}
                  color={`#${node.products[0].sku}`}
                  phrases={node.phrases}
                  updateCart={updateCart}
                  description={node.description}
                  options={node.variations}
                />
              }
            </Item>
          ))}
          <Item><h2>View All</h2></Item>
        </List>
      </Wrapper>
    )}
  />
  )
};

export default ProductList;
