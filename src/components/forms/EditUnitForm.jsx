import { useEffect, useState } from 'react'
import useSubmit from '../../hooks/useSubmit.js'
import { Button, Flex, Modal, NativeSelect, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'



const EditUnitForm = ({ unit, opened, onClose }) => {

	const { response, error, loading, submitForm } = useSubmit()
	const [submittedValues, setSubmittedValues] = useState(null);

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: { houseNumber: unit.houseNumber, street: unit.street, city: unit.city, state: unit.state, zip: unit.zip, image: "" },
	});

	const handleSubmit = async () => {
		try {
			await submitForm({ method: "POST", url: "/units", requestConfig: submittedValues })
		} catch (e) {
			console.log(e)
			console.log(error)
		} finally {
			form.reset()
		}
	}

	useEffect(() => {
		if (!submittedValues) return
		handleSubmit()
	}, [submittedValues])

	return (
		<Modal opened={opened} onClose={onClose} heading="Edit Unit">
			<form onSubmit={form.onSubmit(setSubmittedValues)}>
				<Title>Edit Unit</Title>
				<Flex direction="column" gap={12}>
					<Flex gap={12}>
						<TextInput placeholder="Unit" type="text" name="houseNumber"></TextInput>
						<TextInput placeholder="Street" type="text" name="street"></TextInput>
					</Flex>

					<Flex gap={12}>
						<TextInput placeholder="City" type="text" name="city"></TextInput>
						<NativeSelect data={stateOptions}></NativeSelect>
						<TextInput placeholder="zip" type="text" name="zip"></TextInput>
					</Flex>
					<Button type="submit" loading={loading}>Submit</Button>
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