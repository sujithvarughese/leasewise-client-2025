import features from './features.js'
import FeatureItem from './FeatureItem.jsx'


const Features = () => {
  return <>{features.map((feature, index) => <FeatureItem key={index} feature={feature} bg={colors[index]} />)}</>
};

const colors = ["indigo.1", "yellow.1", "teal.1", "gray.1", "red.1" ]


export default Features;