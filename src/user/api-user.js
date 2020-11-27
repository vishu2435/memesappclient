// import { response } from "express"
import configApi from '../mainConfig'
class UserCruds{

    static create=(user,contentType)=>{
        console.log(`User data is `,user)
        return fetch(`${configApi.url}/api/users`,{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        // 'Content-Type':contentType || 'application/json'
                    },
                    body:user
                })
                .then(response=>{
                    console.log("Response from [api-user.js] [create]",response)
                    return response.json()
                })
                .catch(err=>{
                    console.log("Error from [api-user.js] [create]",err)
                })
    
    }
    
    static listOfUsers(){
        return fetch(`${configApi.url}/api/users`,{
            method:'GET',
            headers:{
                'Accept':'application/json',
            }
        }).then(response=>{
            console.log("Response from [api-user.js] [list]",response)
            return response.json()
        })
        .catch(err=>{ console.log("Error from [api-user.js] [list]",err)})
    }
    
    static read=(params,credentials)=>{
        return fetch(`${configApi.url}/api/users/`+params.userId,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+credentials.t
            }
        }).then(response=>{
            console.log("Response from [api-user.js] [read]",response)
            return response.json()
        })
        .catch(err=>{console.log("Error from [api-user.js] [read]",err)})
    }
    
    static update=(params,credentials,user)=>{
        return fetch(`${configApi.url}/api/users/`+params.userId,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer '+credentials.t
            },
            body:user
        })
        .then(response=>{
            console.log("Response from [api-user.js] [update]",response)
            return response.json()
        })
        .catch(err=>{console.log("Error from [api-user.js] [update]",err)})
    }
    static remove=(params,credentials)=>{
        return fetch(`${configApi.url}/api/users/`+params.userId,{
            method:'DELETE',
            headers:{'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+credentials.t
            }
        })
        .then(response=>{
            console.log("Response from [api-user.js] [remove]",response)
            return response.json()
        })
        .catch(err=>{console.log("Error from [api-user.js] [remove]",err)})
    }
    static follow=(params,credentials,followId)=>{
        return fetch(`${configApi.url}/api/users/follow`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+credentials.t
            },
            body:JSON.stringify({userId:params.userId,followId:followId})
        }).then(
            response=>{
                return response.json()
            }            
        )
        .catch(err=>{
            console.log("Error from [api-user.js] [follow]",err)
        })

    }
    static unFollow=(params,credentials,unFollowId)=>{
        return fetch(`${configApi.url}/api/users/unfollow`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+credentials.t
            },
            body:JSON.stringify({userId:params.userId,unFollowId:unFollowId})
        }).then(
            response=>{
                return response.json()
            }            
        )
        .catch(err=>{
            console.log("Error from [api-user.js] [unFollow]",err)
        })

    }

}



export default UserCruds