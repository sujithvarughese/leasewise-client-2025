
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { convertToUSD } from "../../utilities/financeCalculations.js";
import { BiMessageSquareEdit } from "react-icons/bi"
import { ImUserPlus } from "react-icons/im";
import { MdOutgoingMail } from "react-icons/md";
import { Anchor, Box, Button, Card, Flex, Grid, Group, Image, Text, Title, UnstyledButton } from '@mantine/core'

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
		<>
			<Grid align="center" display={{ base: "none", sm: "initial"}}>
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

				{tenant &&
					<Grid.Col span={4}>
						<Text>{tenant?.lastName}, {tenant?.firstName} </Text>
						<Text>{tenant?.email}</Text>
						<Text>{tenant?.phone}</Text>
					</Grid.Col>
				}
			</Grid>


			<UnstyledButton display={{ sm: "none" }} my={16}>
				<Card shadow="lg" radius="md" p="lg">
					<Card.Section>
						<Image src={image} alt={`${houseNumber} ${street}`}/>
					</Card.Section>
				</Card>
				<Flex justify="space-between" align="center">
					<Box>
						<Title order={4} whiteSpace="nowrap" overflop="clip" textOverflow="ellipsis">{houseNumber} {street} {apartmentNumber}</Title>
						<Title order={6}>{city}, {state} {zip}</Title>
					</Box>
					<Text>{convertToUSD(tenant?.rent)}</Text>
				</Flex>
				<Flex direction="column" align="center" gap={6}>
					<Text>{tenant?.firstName} {tenant?.lastName}</Text>
					{tenant && <Button component="a" href={`tel:${tenant?.phone}`}>Call</Button>}
				</Flex>
			</UnstyledButton>

		</>



	);
};

export default UnitCoverListMode;