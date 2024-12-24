
import useSubmit from '../../hooks/useSubmit.js'
import { Box, Button, Modal, NativeSelect, TextInput } from '@mantine/core'



const CreateIncomeForm = ({ id, open, onClose }) => {

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
    submitForm({ method: "POST", url: "/incomes", requestConfig: data } )
    // e.currentTarget.reset()
    onClose()
  }

  return (

    <Modal opened={open} onClose={onClose} heading="Create Income">
      <form onSubmit={handleSubmit}>
        <Box gap={2}>
          <NativeSelect name="category" label="Category" options={categories} minWidth={120}/>
          <TextInput type="number" id="amount" name="amount" label="Amount" variant="outlined" />
          <TextInput type="number" id="balance" name="balance" label="Balance" variant="outlined" />
          <TextInput type="date" id="datePaid" name="datePaid" helperText="Date Paid" variant="outlined" />
          <TextInput id="paymentMethod" name="paymentMethod" label="Payment Method" variant="outlined" />
          <Button type="submit" loading={loading}>Submit</Button>
        </Box>
      </form>
    </Modal>

  )
}

export default CreateIncomeForm

const categories = [
  { label: "Rent", value: "rent" },
  { label: "Deposit", value: "deposit" },
  { label: "Other", value: "other" }
]