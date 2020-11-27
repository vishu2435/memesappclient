
import configApi from '../mainConfig'
const signin = (user) => {
    return fetch(`${configApi.url}/auth/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((response) => {
        return response.json()
    })
        .catch(err => {
            console.log('Error in [api-auth.js] [signin] ', err)
        })

}
const signout = () => {
    return fetch(`${configApi.url}/user/signout`, {
        method: 'GET',

    })
        .then((response) => {
            return response.json()
        })
        .catch(err => {
            console.log('Error in [api-auth.js] [signout] ', err)
        })
}
export { signin, signout }