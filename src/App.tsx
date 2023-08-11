import {Logo} from './components/logo'
import {useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom'
import { requestAccessToken, RefreshToken, getUser} from './service/SpotifyApi'

export function App(){
  useEffect(() => {
    if(sessionStorage.getItem('loggedIn') == 'true'){
      let refreshToken = localStorage.getItem('refreshToken')
      if(!refreshToken){refreshToken = ''}
      async function getTokenByRefresh(refreshAsparameter : string){
          let response = await RefreshToken(refreshAsparameter)
          localStorage.setItem('accessToken', response.access_token)
      }
      getTokenByRefresh(refreshToken)
    }else{
    //REQUEST THE TOKEN ACCSESS USING A AUTHORIZATION CODE
      async function getToken () {
        //get the authorization code:
        let code =  new URLSearchParams(document.location.search).get('code')
        //Typescript need to check if the value of 'code' is null and set to an empty string instead:
        if (!code) {code = '';}
        let response = await requestAccessToken(code)
        localStorage.setItem('accessToken', response.access_token)
        localStorage.setItem('refreshToken', response.refresh_token)
      }
      getToken()
    }
    //GET USER INFORMATIONS
    let token = localStorage.getItem('accessToken')
    if (!token){token = ''}
    async function getUserData(tokenAsParameter: string){
      let response = await getUser(tokenAsParameter)
      sessionStorage.setItem('display name', response.display_name)
      sessionStorage.setItem('userId', response.id)
    }
    getUserData(token)
  }, [])


  return (
    
      <div>
        {/*HEADER*/}
        <header className="header">
            <Logo/>
            <nav className="nav-sections">
              <Link to="home">HOME</Link>
              <Link to="spotify">SPOTIFY</Link>
            </nav>
            <div className="header-nav">
              <p className='header-nav-help'>help</p>
              <div className="header-nav-toggleTheme">
                <input type="radio"/>
                <input type="radio" />
              </div>
            </div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
  )
}
