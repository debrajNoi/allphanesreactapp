import {useState} from 'react'

function useAuth() {
    const [auth, setAuth] = useState()
    
    let tokens = localStorage.getItem('token')
    console.log('token =>',tokens)
    if(tokens) setAuth(true)
    return auth
}

export default useAuth