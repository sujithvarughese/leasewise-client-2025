
import useSubmit from '../../hooks/useSubmit.js'



import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Modal, NativeSelect, TextInput, Title } from '@mantine/core'
import { hasLength, isEmail, useForm } from '@mantine/form'



const CreateExpenseForm = ({ id, opened, onClose }) => {

  const { response, error, loading, submitForm } = useSubmit()
  const [submittedValues, setSubmittedValues] = useState(null);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { category: '', amount: 0, balance: 0, dueDate: "", datePaid: "", paymentMethod: "", company: "" },
  });

  const handleSubmit = async () => {
    try {
      await submitForm({ method: "POST", url: "/expenses", requestConfig: submittedValues })
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

    <Modal opened={opened} onClose={onClose} heading="Create Expense">
      <form onSubmit={form.onSubmit(setSubmittedValues)}>
        <Title>Create Expense</Title>
        <Flex direction="column" gap={12}>
          <NativeSelect name="category" data={categories} />
          <Flex gap={12}>
            <TextInput type="number" id="amount" name="amount" placeholder="Amount" />
            <TextInput type="number" id="balance" name="balance" placeholder="Balance" />
          </Flex>
          <Flex gap={12} justify="space-between">
            <TextInput type="date" id="dateDue" name="dateDue" label="Due Date" />
            <TextInput type="date" id="datePaid" name="datePaid" label="Date Paid" />
          </Flex>
          <TextInput id="paymentMethod" name="paymentMethod" placeholder="Payment Method" />
          <TextInput id="companyName" name="companyName" placeholder="Company" />
          <Button type="submit" loading={loading}>Submit</Button>
        </Flex>

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