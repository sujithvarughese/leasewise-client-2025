
import useSubmit from '../../hooks/useSubmit.js'



import React from 'react'
import { Box, Button, Modal, NativeSelect, TextInput } from '@mantine/core'



const CreateExpenseForm = ({ id, open, onClose }) => {

  const { response, error, loading, submitForm } = useSubmit()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = { ...Object.fromEntries(formData), unit: id }
    submitForm({ method: "POST", url: "/expenses", requestConfig: data })
    // e.currentTarget.reset()
    onClose()
  }

  return (

    <Modal opened={open} onClose={onClose} heading="Create Expense">
      <form onSubmit={handleSubmit}>
        <Box gap={2}>
          <NativeSelect name="category" label="Category" data={categories} minWidth={120}/>
          <Box flexDirection="row" gap={2}>
            <TextInput type="number" id="amount" name="amount" label="Amount" variant="outlined" />
            <TextInput type="number" id="balance" name="balance" label="Balance" variant="outlined" />
          </Box>
          <Box flexDirection="row" gap={2}>
            <TextInput type="date" id="dateDue" name="dateDue" helperText="Due Date" variant="outlined" />
            <TextInput type="date" id="datePaid" name="datePaid" helperText="Date Paid" variant="outlined" />
          </Box>
          <TextInput id="paymentMethod" name="paymentMethod" label="Payment Method" variant="outlined" />
          <TextInput id="companyName" name="companyName" label="Company" variant="outlined" />
          <TextInput id="companyAddress" name="companyAddress" label="Company Address" variant="outlined" />
          <Box flexDirection="row" gap={2}>
            <TextInput id="companyPhone" name="companyPhone" label="Company Phone" variant="outlined" />
            <TextInput type="email" id="companyEmail" name="companyEmail" label="Company Email" variant="outlined" />
          </Box>
          <Button type="submit" loading={loading}>Submit</Button>
        </Box>

      </form>
    </Modal>

  )
}

export default CreateExpenseForm

const categories = [
  { label: "Tax", value: "tax" },
  { label: "Insurance Premium", value: "insurance" },
  { label: "Homeowner's Association Fee", value: "hoa" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Repairs", value: "repairs" },
  { label: "Advertising", value: "advertising" },
  { label: "Appliances", value: "appliances" },
  { label: "Utilities", value: "utilities" },
  { label: "Other", value: "other" }
]