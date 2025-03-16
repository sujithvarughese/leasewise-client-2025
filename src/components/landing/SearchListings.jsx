import {BackgroundImage, Button, Flex, Text, TextInput, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import useSubmit from "../../hooks/useSubmit.js";
import {useDisclosure} from "@mantine/hooks";
import ListingsModal from "./ListingsModal.jsx";
import bg from "../../assets/images/research_bg.jpeg"
import {useForm} from "@mantine/form";

const SearchListings = () => {

  const [listings, setListings] = useState(null)
  const { response, error, loading, submitForm } = useSubmit()
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { zipCode: null },
    validate: {
      zipCode: (value) => (value.length !== 5 ? 'Invalid Zip Code' : null),
    },
  });

  const handleSubmit = (zipCode) => {
    submitForm({ method: "POST", url: "/research/listings", requestConfig: { zipCode }})
    form.reset()
  }

  useEffect(() => {
    if (response) {
      const updatedHomes = response.homes.filter(home => !!home.address)
      setListings(updatedHomes)
      open()
    }
  }, [response])

  return (
    <BackgroundImage w="100%" maw={600} src={bg} radius={5} shadow="lg" p={{base: 36, sm: 72}}>
      <Text mb={16} c="white" fw={600} fz={18} style={{ textAlign: "center" }}>Search for Listings by Zip Code:</Text>
      <form onSubmit={form.onSubmit(values => handleSubmit(values.zipCode))}>
        <Flex justify="center" align="center" gap={12}>
          <TextInput
            type="number"
            name="zipCode"
            placeholder="Zip Code"
            key={form.key('zipCode')}
            {...form.getInputProps('zipCode')}
          />
          <Button type="submit" loading={loading} loaderProps={{ type: "dots"}}>Search</Button>
        </Flex>
      </form>
      <ListingsModal opened={opened} close={close} listings={listings} zipCode={form.getValues().zipCode}/>
    </BackgroundImage>
  );
};

export default SearchListings;