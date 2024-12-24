
import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { convertToUSD } from "../../utilities/financeCalculations.js";
import { BiMessageSquareEdit } from "react-icons/bi"
import { ImUserPlus } from "react-icons/im";
import { MdOutgoingMail } from "react-icons/md";
import { Box, Button, Card, Flex, Grid, Image, Text, UnstyledButton } from '@mantine/core'



const UnitCoverListMode = ({
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
}) => {

	// state functions to hide and show forms
	const [showMessageForm, setShowMessageForm] = useState(false)

	const navigate = useNavigate()
	const navigateToUnit = () => {
		navigate(`/unit/${_id}`, { state: _id })
	}
	return (

			<Flex justify="space-between" align="center"  onClick={navigateToUnit}>
				{/* clicking image or address navigates to FinancesUnit */}

					<UnstyledButton onClick={navigateToUnit}>
						<Image src={image} alt={`${houseNumber} ${street}`} h={200} w={200}/>
					</UnstyledButton>

					<UnstyledButton onClick={navigateToUnit}>
						<Text whiteSpace="nowrap" overflop="clip" textOverflow="ellipsis">{houseNumber} {street} {apartmentNumber}</Text>
						<Text>{city}, {state} {zip}</Text>
					</UnstyledButton>


					{
					user &&
					<Box>
						<Text fontSize={{ xs: "12px", sm: "16px" }}>{tenant?.lastName}, {tenant?.firstName} </Text>
						<Text fontSize={{ xs: "12px", sm: "16px" }}>{tenant?.email}</Text>
						<Text fontSize={{ xs: "12px", sm: "16px" }}>{tenant?.phone}</Text>
					</Box>
					}

				<Box>
					<Text>
						{bedrooms}-br / {bathrooms}-bath
					</Text>
					{
						user &&
						<Text>
							Rent: {convertToUSD(tenant?.rent)}
						</Text>
					}
				</Box>
			</Flex>


	);
};

export default UnitCoverListMode;