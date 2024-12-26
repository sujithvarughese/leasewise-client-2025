
import useSubmit from '../../hooks/useSubmit.js'
import { useEffect, useState } from 'react'
import { Box, Button, Flex, Modal, TextInput, Title } from '@mantine/core'
import { hasLength, isEmail, useForm } from '@mantine/form'
import { useAuthProvider } from '../../context/auth-context.jsx'


const CreateMortgageForm = ({ id, opened, onClose }) => {

  const { response, error, loading, submitForm } = useSubmit()
  const [submittedValues, setSubmittedValues] = useState(null);
  const { showUnauthorizedAlert } = useAuthProvider()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { bank: '', purchasePrice: 0, principal: 0, interest: 0, term: 0, numPaymentsMade: 0 },
  });

  const handleSubmit = async () => {
    try {
      // await submitForm({ method: "POST", url: "/mortgages", requestConfig: submittedValues })
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
    <Modal opened={opened} onClose={onClose} heading="Create Mortgage">
      <form onSubmit={form.onSubmit(setSubmittedValues)}>
        <Title>Create Mortgage</Title>
        <Flex direction="column" gap={12}>
          <TextInput id="bank" name="bank" placeholder="Bank" />
          <TextInput type="number" id="purchasePrice" name="purchasePrice" placeholder="Purchase Price" />
          <TextInput type="number" id="principal" name="principal" placeholder="Principal" />
          <TextInput type="number" id="interest" name="interest" placeholder="Interest" />
          <TextInput type="number" id="term" name="term" placeholder="Term" />
          <TextInput type="number" id="numPaymentsMade" name="numPaymentsMade" placeholder="Payments made" />
          <Button type="submit" loading={loading}>Submit</Button>
        </Flex>
      </form>
    </Modal>
  )
}

export default CreateMortgageForm
