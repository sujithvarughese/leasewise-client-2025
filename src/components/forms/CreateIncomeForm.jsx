
import useSubmit from '../../hooks/useSubmit.js'
import { Box, Button, Flex, Modal, NativeSelect, TextInput, Title } from '@mantine/core'
import { hasLength, isEmail, useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useAuthProvider } from '../../context/auth-context.jsx'



const CreateIncomeForm = ({ id, opened, onClose }) => {

  const { response, error, loading, submitForm } = useSubmit()
  const [submittedValues, setSubmittedValues] = useState(null);
  const { showUnauthorizedAlert } = useAuthProvider()

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { category: '', amount: 0, balance: 0, datePaid: "", paymentMethod: "" },
  });

  const handleSubmit = async () => {
    try {
      // await submitForm({ method: "POST", url: "/incomes", requestConfig: submittedValues })
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

    <Modal opened={opened} onClose={onClose} heading="Create Income">
      <form onSubmit={form.onSubmit(setSubmittedValues)}>
        <Title>Create Income</Title>
        <Flex direction="column" gap={12}>
          <NativeSelect name="category" data={categories} />
          <Flex gap={12}>
            <TextInput type="number" id="amount" name="amount" placeholder="Amount" />
            <TextInput type="number" id="balance" name="balance" placeholder="Balance" />
          </Flex>
          <TextInput type="date" id="datePaid" name="datePaid" label="Date Paid" />
          <TextInput id="paymentMethod" name="paymentMethod" placeholder="Payment Method" />
          <Button type="submit" loading={loading}>Submit</Button>
        </Flex>
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