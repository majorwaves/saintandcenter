import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"
import arrow from "../images/arrow-right.svg"

const Wrapper = styled.div`
  grid-area: sub;
  box-sizing: border-box;
  padding: 24px;
  position: relative;

  .gatsby-image-wrapper {
    position: absolute;
    top: -24px;
    left: -24px;
    width: calc(100% + 48px);
    height: calc(100% + 48px);
  }
`

const Action = styled.div`
  position: absolute;
  point-events: none;
  left: 0;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  text-transform: uppercase;
  padding: 22px 24px;
  line-height: 18px;
  font-weight: 300;
  font-size: 24px;
  z-index: 2;
  color: black;

  &:after {
    content: "";
    position: absolute;
    right: 24px;
    background: url(${arrow});
    background-size: 100%;
    width: 35px;
    height: 22px;
    background-repeat: no-repeat;
  }
`

const Top = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: calc(100% - 24px);
  z-index: 5;

  h2 {
    font-weight: 300;
    z-index: 1;
    text-transform: uppercase;
    font-size: 24px;
    margin: 0 0 24px;
  }

  h3 {
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
    margin: 0;
  }
`

const Routine = () => {
  const data = useStaticQuery(graphql`
    query RoutineQuery {
      file(relativePath: { eq: "humans.jpg" }) {
        childImageSharp {
          fluid {
            base64
            tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
            presentationWidth
            presentationHeight
          }
        }
      }
    }
  `)

  return (
    <Wrapper>
      <Top>
        <h2>Start a routine</h2>
        <h3>
          Subscribe with 15% off your order. You control the delivery date and
          cancellation. We ship it to you, free.
        </h3>
      </Top>
      <Img fluid={data.file.childImageSharp.fluid} />
      <Link to="/register">
        <Action>Shop</Action>
      </Link>
    </Wrapper>
  )
}

export default Routine
