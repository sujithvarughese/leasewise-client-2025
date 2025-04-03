import NewsTile from './NewsTile.jsx'
import { Box, Title } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const NewsSection = ({ articles }) => {

  return (
    <Box bg="white" p={24}>
      <Title>Latest Real Estate News</Title>
      <Carousel slideSize={{ base: "33%", md: "20%" }} align="start" loop>
        {articles.map((article, index) =>
          <Carousel.Slide key={index}>
            <NewsTile
              source={article.source.name}
              title={article.title}
              url={article.url}
              urlToImage={article.urlToImage}
              date={article.publishedAt}
            />
          </Carousel.Slide>

        )}
      </Carousel>
    </Box>


  )
}

export default NewsSection