import React from 'react'
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  width: 120%;

` 

const PicContainer = styled.div`
  width: 100%;

  &:hover {
    opacity: 0.5;
  }
`


const Footer = () => {

  return (
    <Wrapper>
      <PicContainer><img src="whale3.png" /></PicContainer>
      <PicContainer><img src="whale4.png" /></PicContainer>

    </Wrapper>
  )

}

export default Footer