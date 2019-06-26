export const addToken = async ({ addAuth, login, data, client, history }) => {
  const token = data.authenticate.jwtToken
  const name = data.authenticate.query.currentPerson.name 
  if (token) {
    await client.resetStore()
    addAuth({ token, login: name })
    history.replace('/')
  } else {
    console.log('undef user')
  }
}
