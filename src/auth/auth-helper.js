

class Auth{

    static authenticate=(jwt,cb)=>{
        if(typeof window!=="undefined"){
            sessionStorage.setItem('jwt',JSON.stringify(jwt))
        }
        cb()
    }
    static isAuthenticated=()=>{
        if(typeof window==='undefined'){
            return false
        }
        if(sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            return false
    }
    static signout=(cb)=>{
        if(typeof window!=='undefined')
            sessionStorage.removeItem('jwt')
        
    }
}


export default Auth