
const prod = {
  url: {
    API_URL: "https://leasewise-03f522c112c8.herokuapp.com/api/v1"
  }
}

const dev = {
  url : {
    API_URL: "http://localhost:3000/api/v1"
  }
}

export const config =
  process.env.NODE_ENV === "development" ? dev : prod
