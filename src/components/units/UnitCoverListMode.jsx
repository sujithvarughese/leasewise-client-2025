
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { convertToUSD } from "../../utilities/financeCalculations.js";
import { BiMessageSquareEdit } from "react-icons/bi"
import { ImUserPlus } from "react-icons/im";
import { MdOutgoingMail } from "react-icons/md";
import { Box, Button, Card, Flex, Grid, Image, Text, Title, UnstyledButton } from '@mantine/core'

const UnitCoverListMode = ({ unit }) => {

	// state functions to hide and show forms
	const {
		_id,
		houseNumber,
		street,
		city,
		apartmentNumber,
		state,
		zip,
		image,
		bedrooms,
		bathrooms,
		tenant,
		user
	} = unit

	const navigate = useNavigate()
	const navigateToUnit = () => {
		navigate(`/unit/${_id}`, { state: unit })
	}
	return (

			<Grid align="center">
				{/* clicking image or address navigates to FinancesUnit */}

				<Grid.Col span={2}>
					<UnstyledButton onClick={navigateToUnit}>
						<Image src={image} alt={`${houseNumber} ${street}`}/>
					</UnstyledButton>
				</Grid.Col>

				<Grid.Col span={6}>
					<UnstyledButton onClick={navigateToUnit}>
						<Title order={4} whiteSpace="nowrap" overflop="clip" textOverflow="ellipsis">{houseNumber} {street} {apartmentNumber}</Title>
						<Title order={6}>{city}, {state} {zip}</Title>
						<Text>Rent: {convertToUSD(tenant?.rent)}</Text>
					</UnstyledButton>
				</Grid.Col>


					{user &&
					<Grid.Col span={4}>
						<Text>{tenant?.lastName}, {tenant?.firstName} </Text>
						<Text>{tenant?.email}</Text>
						<Text>{tenant?.phone}</Text>
					</Grid.Col>
					}
			</Grid>


	);
};

export default UnitCoverListMode;