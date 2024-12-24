
import useSubmit from '../../hooks/useSubmit.js'
import { useEffect } from 'react'
import { Box, Button, Modal, TextInput } from '@mantine/core'


const CreateMortgageForm = ({ id, open, onClose }) => {

  const { response, error, loading, submitForm } = useSubmit()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = [...formData.values()]
    const fieldIsEmpty = values.includes("")
    if (fieldIsEmpty) {
      console.log("enter all fields")
      return
    }
    const data = { ...Object.fromEntries(formData), unit: id }
    submitForm({ method: "POST", url: "/mortgages", requestConfig: data })
    // e.currentTarget.reset()
    onClose()
  }

  useEffect(() => {
    console.log(response)
  }, [response])

  return (
    <Modal opened={open} onClose={onClose} heading="Create Mortgage">
      <form onSubmit={handleSubmit}>
        <Box gap={2}>
          <TextInput id="bank" name="bank" label="Bank" variant="outlined" />
          <TextInput type="number" id="purchasePrice" name="purchasePrice" label="Purchase Price" variant="outlined" />
          <TextInput type="number" id="principal" name="principal" label="Principal" variant="outlined" />
          <TextInput type="number" id="interest" name="interest" label="Interest" variant="outlined" />
          <TextInput type="number" id="term" name="term" label="Term" variant="outlined" />
          <TextInput type="number" id="numPaymentsMade" name="numPaymentsMade" label="Payments made" variant="outlined" />
          <Button type="submit" loading={loading}>Submit</Button>
        </Box>
      </form>
    </Modal>
  )
}

export default CreateMortgageForm
