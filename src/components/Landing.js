import React from 'react'
import { Text, textStyle } from '@aragon/ui'
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



const Landing = () => {

  return (
    <>

    <Wrapper>

      <PicContainer><img src="whale1.png" /></PicContainer>
      <PicContainer><img src="whale2.png" /></PicContainer>
      
    </Wrapper>

    <div>WhaleTrapp is a tool for trapping, tracking, loving your fellow or enemy whales.</div>
    <div>.</div>
    <div>.</div>
    <div>.</div>
    <div>.</div>
    <div>.</div>

    <div>Tracking has never been as 'easy', just login with your metamask and all your whales will follow.</div>

    </>
  )
}

export default Landing