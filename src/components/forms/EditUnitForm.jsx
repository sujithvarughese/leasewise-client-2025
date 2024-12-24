import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {axiosDB} from "../../utilities/axios.js";
import useSubmit from '../../hooks/useSubmit.js'
import { Box, Button, Flex, Modal, NativeSelect, TextInput } from '@mantine/core'



const EditUnitForm = ({ id, open, onClose }) => {

	const { response, error, loading, submitForm } = useSubmit()

	const handleSubmit = (e) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = { ...Object.fromEntries(formData), unit: id }
		submitForm({ method: "PATCH", url: "/units", requestConfig: data })
		// e.currentTarget.reset()
		onClose()
	}


	return (
		<Modal opened={open} onClose={onClose} heading="Edit Unit">
		<form onSubmit={handleSubmit}>


			<Box gap={1}>
				<div>
					<TextInput label="Unit" type="text" name="unitID"></TextInput>
					<TextInput label="street" type="text" name="street"></TextInput>
				</div>

				<div>
					<TextInput label="City" type="text" name="city"></TextInput>
					<NativeSelect name="state" data={stateOptions} label="State"></NativeSelect>
					<TextInput label="zip" type="text" name="zip"></TextInput>
				</div>


			</Box>

			<Flex>
				<Button type="submit" loading={loading}>Submit</Button>
				<Button onClick={onClose}>Cancel</Button>
			</Flex>

		</form>
		</Modal>

	);
};

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const stateOptions = states.map(state => {
	return { label: state, value: state }
})
export default EditUnitForm;