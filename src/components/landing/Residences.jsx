import {Avatar, BackgroundImage, Box, Flex, Image, Paper, Title} from '@mantine/core'
import home from "../../assets/images/landing/residences/home.png"
import apartment from "../../assets/images/landing/residences/apartment.png"
import commercial from "../../assets/images/landing/residences/commercial.png"
import townhome from "../../assets/images/landing/residences/townhome.png"
import bed from "../../assets/images/landing/residences/bed.png"
import bgImage from "../../assets/images/landing/leasewise-landing-bg.png"

const Residences = () => {
  return (
    <Box>
      <BackgroundImage src={bgImage} p={{ base: "sm", md: 96 }} py={{ xl: 210 }} radius="5">

        <Flex justify={{ base: "center", md: "flex-end" }} align="center" p={{ base: 2, md: 56}}>
          <Flex direction="column" align="center" justify="center" bg="white" w={{ base: "70%", md: "50%" }} p="xl">
            <Title order={3} style={{ textAlign: "center", color: "slategray" }}>LeaseWise Features</Title>
            <Title order={2} pt={12} pb={56} style={{ textAlign: "center" }}>No matter what type of properties you own or your experience, we've got your back.</Title>
            <Flex gap={42} align="center" justify="space-around" wrap="wrap">
              <Flex direction="column" align="center">
                <Avatar size="xl" variant="gradient">
                  <Image src={home} alt="home" />
                </Avatar>
                <Title order={5}>Homes</Title>
              </Flex>
              <Flex direction="column" align="center">
                <Avatar size="xl" variant="gradient">
                  <Image src={apartment} alt="apartment" />
                </Avatar>
                <Title order={5}>Apartments</Title>
              </Flex>
              <Flex direction="column" align="center">
                <Avatar size="xl" variant="gradient">
                  <Image src={townhome} alt="apartment" />
                </Avatar>
                <Title order={5}>Townhomes</Title>
              </Flex>
              <Flex direction="column" align="center">
                <Avatar size="xl" variant="gradient">
                  <Image src={commercial} alt="apartment" />
                </Avatar>
                <Title order={5}>Commercial</Title>
              </Flex>
              <Flex direction="column" align="center">
                <Avatar size="xl" variant="gradient">
                  <Image src={bed} alt="apartment" />
                </Avatar>
                <Title order={5}>Room Rentals</Title>
              </Flex>
            </Flex>
          </Flex>
        </Flex>






      </BackgroundImage>
    </Box>

  )
}

export default Residences