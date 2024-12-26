
import { Button, FileInput, Flex, Modal, NativeSelect, NumberInput, TextInput, Title } from '@mantine/core'
import useSubmit from '../../hooks/useSubmit.js'
import { useEffect, useState } from 'react'
import { useForm } from '@mantine/form'
import { useAuthProvider } from '../../context/auth-context.jsx'
import { FcImageFile } from "react-icons/fc";

const CreateUnitForm = ({ opened, onClose }) => {

  const { response, error, loading, submitForm } = useSubmit()
  const [submittedValues, setSubmittedValues] = useState(null);
  const { account, showUnauthorizedAlert } = useAuthProvider()


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      houseNumber: "",
      street: "",
      apartmentNumner: "",
      city: "",
      state: "",
      zip: "",
      image: "",
      bedrooms: 0,
      bathrooms: 0
    },
  });

  const handleSubmit = async () => {
    try {
      // await submitForm({ method: "POST", url: "/units", requestConfig: { account, ...submittedValues } })
      showUnauthorizedAlert()
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
        <Title>Create Unit</Title>
        <Flex direction="column" gap={12}>
          <Flex gap={12}>
            <TextInput placeholder="House Number" type="text" name="houseNumber"></TextInput>
            <TextInput placeholder="Street" type="text" name="street"></TextInput>
            <TextInput placeholder="Apartment Number" type="text" name="apartmentNumber"></TextInput>
          </Flex>

          <Flex gap={12}>
            <TextInput placeholder="City" type="text" name="city"></TextInput>
            <NativeSelect data={stateOptions}></NativeSelect>
            <TextInput placeholder="zip" type="text" name="zip"></TextInput>
          </Flex>

          <Flex>
            <NumberInput placeholder="Bedrooms" name="bedrooms"/>
            <NumberInput placeholder="Bathrooms" name="bathrooms" />
          </Flex>

          <FileInput placeholder="Image" name="image" leftSection={<FcImageFile />}/>
          <Button type="submit" loading={loading}>Submit</Button>
        </Flex>
      </form>
    </Modal>
  )
}

const states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY']
const stateOptions = states.map(state => {
  return { label: state, value: state }
})

// convert file to base64 to store in database
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export default CreateUnitForm