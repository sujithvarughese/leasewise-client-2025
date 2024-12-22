import  { useState, useEffect } from 'react'
import NewsTile from './NewsTile.jsx'
import { Box, Paper, Title } from '@mantine/core'
import { Carousel } from '@mantine/carousel'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const NewsSection = ({ articles }) => {

  return (
    <Box>
        <Title order={2}>Latest Real Estate News</Title>
        <Carousel slideSize="20%"  slideGap="sm" align="start" loop>
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