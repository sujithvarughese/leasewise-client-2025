import { useState } from "react";
import mobileFinancesIMG from "../../assets/images/landing/finances.png"
import constructionIMG from "../../assets/images/landing/construction.png"
import messagesIMG from "../../assets/images/landing/messages.png"
import laptopIMG from "../../assets/images/landing/laptop.png"
import { Image, Tabs, Title } from '@mantine/core'

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
    description: 'Access 32 essential rental forms, from welcome letters to rent increase notices. Available for download in PDF format. Let us take care of preparing your leases and application forms so you have time to focus on the important stuff.',
    image: laptopIMG,
  },
];


const Features = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Tabs defaultValue="gallery" orientation="vertical">
      <Tabs.List>
        {items.map(item =>
          <Tabs.Tab key={item.title} value={item.title}>
            <Title order={2}>{item.title}</Title>
            <Title order={6}>{item.heading}</Title>
          </Tabs.Tab>
        )}
      </Tabs.List>

      {items.map(item =>
        <Tabs.Panel key={item.value} value={item.title}>
          <Image src={item.image} alt="feature image" height={640}/>
          <Title order={6}>{item.description}</Title>
        </Tabs.Panel>
      )}
    </Tabs>
  )
};

export default Features;