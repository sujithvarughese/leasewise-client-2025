import businessInsiderLogo from "../../assets/images/landing/logos/business_insider.png"
import forbesLogo from "../../assets/images/landing/logos/forbes.svg"
import realtorComLogo from "../../assets/images/landing/logos/realtor_com.png"
import wsjLogo from "../../assets/images/landing/logos/wsj.svg"
import realtyTimesLogo from "../../assets/images/landing/logos/realty_times.png"
import {Box, Flex, Image, Text, Title} from '@mantine/core'
import {motion} from "motion/react";


const logos = [forbesLogo, realtorComLogo, wsjLogo, realtyTimesLogo, businessInsiderLogo];

const Magazines = () => {

  return (
    <Flex
      component={motion.div}
      initial={{ scale: "70%" }}
      animate={{ scale: "100%" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      direction="column" mih={300} justify="center" align="center">
      <Text size="xl" fw={900} align="center">
        As Seen In
      </Text>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-around"
        align="center"
        gap={{ base: "xl", md: "none"}}
      >
        {logos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt={`Company number ${index + 1}`}
            w={{ base: "25%", sm: "15%" }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default Magazines;