import { useState } from "react";
import mobileFinancesIMG from "../../assets/images/landing/finances.png"
import constructionIMG from "../../assets/images/landing/construction.png"
import messagesIMG from "../../assets/images/landing/messages.png"
import laptopIMG from "../../assets/images/landing/laptop.png"
import { Box, Container, Flex, Image, Tabs, Text, Title } from '@mantine/core'

const items = [
  {
    title: 'Expenses',
    heading: "Keep your finances organized in one place.",
    description: 'Track and store your expenses with ease. Filter by unit, send rent receipts, export into excel.',
    image: mobileFinancesIMG,
  },
  {
    title: 'Maintenance',
    heading: "Built-in, professional maintenance requests.",
    description: 'Tenants can easily submit any issues from their portal, and you can keep a paper trail of all maintenance performed.',
    image: constructionIMG,
  },
  {
    title: 'Messaging',
    heading: "Your professional messaging app.",
    description: 'Keep your phone number private from leads and applicants, and keep tenant communication in one place.',
    image: messagesIMG,
  },
  {
    title: 'Forms',
    heading: "All the forms you need to succeed.",
    description: 'Let us take care of preparing your leases and application forms so you have time to focus on the important stuff.',
    image: laptopIMG,
  },
];

const Features = () => {

  return (

    <Tabs defaultValue="Expenses">

        <Tabs.List justify="center">

            {items.map(item =>
              <Tabs.Tab key={item.title} value={item.title} p={8}>
                <Title order={5}>{item.title}</Title>
                <Text order={6} display={{ base: "none", md: "initial" }}>{item.heading}</Text>
              </Tabs.Tab>
            )}

        </Tabs.List>


          {items.map(item =>
            <Tabs.Panel key={item.value} value={item.title} p={12}>
              <Flex direction="column" gap={24} justify="center" align="center">
                <Title order={4}>{item.description}</Title>
                <Image src={item.image} alt="feature image" mah={720}/>
              </Flex>
            </Tabs.Panel>
          )}




    </Tabs>


  )
};

export default Features;