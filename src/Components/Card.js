import React from 'react'
import styled from '@emotion/styled'

const StyledCard = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #FFFFFF;
	border-radius: 2px;
	box-shadow: 0 0 10px rgba(0,0,0,0.1);
	padding: 20px;
	margin: 20px;
	cursor: pointer;
	min-height: 100px;
	transition: all 0.2s ease-in-out;
	color: #000000;
	:hover {
		box-shadow: 0 0 20px rgba(0,0,0,0.1);
		transform: translateY(-10px);
		color: orange;
	}
`

const Title = styled.h3`
	font-size: 1.5em;
	margin: 0;
	margin-bottom: 10px;
	color: inherit;
`

const Date = styled.p`
	font-size: 0.8em;
	margin: 0;
	color: gray;
`

const Card = props => {
	return(
		<StyledCard>
			<Title>{props.title}</Title>
			<Date>{props.date}</Date>
		</StyledCard>
	)
}

export default Card