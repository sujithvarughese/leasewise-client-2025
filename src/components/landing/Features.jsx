import features from './features.js'
import FeatureItem from './FeatureItem.jsx'


const Features = () => {
  return <>{features.map((feature, index) => <FeatureItem key={index} feature={feature} bg={colors[index]} />)}</>
};

const colors = ["blue.8", "blue.1", "teal.2", "gray.1", "red.1" ]


export default Features;