import configApi from '../mainConfig' 

const listNewsFeed=(params,credentials)=>{
    return fetch(`${configApi.url}/api/posts/feed/${params.userId}?page=${params.page}`,{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+credentials.t
        }
    }).then(response=>{
      
        if(response.status===401){
            return {redirect:true}
        }
        return response.json()
    })
    .catch((err)=>{console.log(`Error in [listNewsFeed] [api-post.js] ${err}`)})


}
const listByUser=(params,credentials)=>{
    return fetch(`${configApi.url}/api/posts/by/${params.userId}`,{
        method:'GET',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+credentials.t
        }
    }).then(response=>{
        console.log("From [listByfeed ] [app-post.js ]",response)
        return response.json()
    })
    .catch((err)=>{console.log(`Error in [listNewsFeed] [api-post.js] ${err}`)})
}

const create=(params,credentials,post)=>{
    return fetch(`${configApi.url}/api/posts/new/${params.userId}`,{
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t
        },
        body:post
    }).then((response)=>{
      
        if(response.status===401){
            return {redirect:true}
        }    
        return response.json()
    })
    .catch((err)=>{console.log(`Error in [listNewsFeed] [api-post.js] ${err}`)})
}

export default {listNewsFeed,create,listByUser}