import { Anchor, Box, Image, Paper, Text } from '@mantine/core'

const NewsTile = ({ source, title, url, urlToImage, date }) => {

  const monthString = ["January", "February","March","April","May","June","July","August","September","October","November", "December"]
  const month = Number(date.substring(5, 7))
  const day = date.substring(8, 10)
  const year = date.substring(0,4)

  return (
    <Paper>
      <Box>
        <Image src={urlToImage} alt="image" height={120}/>
      </Box>

      <Box p={1}>
        <Text>{source}</Text>
        <Text color="gray">{monthString[month - 1]} {day}, {year}</Text>
        <Anchor href={url} target="_blank" rel="noreferrer" textAlign="left">
          <Text
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
            }}
          >{title}</Text>
        </Anchor>

      </Box>
    </Paper>
  )
}

export default NewsTile