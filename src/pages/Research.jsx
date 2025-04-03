import Fmr from '../components/research/Fmr.jsx'
import Listings from '../components/research/Listings.jsx'
import { BackgroundImage, Box, Button, Paper, Tabs, Title } from '@mantine/core'
import { useState } from 'react'
import bg from "../assets/images/research_bg.jpeg"

const Research = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <Box>
      <BackgroundImage src={bg} mb={36}>
        <Box justify="center" align="center" py={102} px={{base: 24, sm: 102 }}>
          <Title style={{ color: "white" }}>MLS Multiple Listing Service</Title>
          <Title style={{ color: "white" }}>&</Title>
          <Title style={{ color: "white" }}>FMR Fair Market Value Rents</Title>
          <Title order={5} style={{ color: "white" }}>Your trusted Real Estate Source</Title>

          <Box>
            <Button size="xl" color="lime.7" m={8} onClick={() => setActiveTab("1")}>Search Listings</Button>
            <Button size="xl" color="lime.7" m={8} onClick={() => setActiveTab("2")}>Search Rents</Button>
          </Box>
        </Box>
      </BackgroundImage>


      <Paper shadow="xl" h="100vh">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.List aria-label="research tabs" justify="center">
            <Tabs.Tab value="1">Listings</Tabs.Tab>
            <Tabs.Tab value="2">Rental Rates</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="1"  sx={{ p: 0 }}>
            <Listings />
          </Tabs.Panel>

          <Tabs.Panel value="2" sx={{ p: 0 }}>
            <Fmr />
          </Tabs.Panel>
        </Tabs>
      </Paper>






    </Box>




  );
};


export default Research;