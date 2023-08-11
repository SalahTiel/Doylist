import './styles/login.sass'

export function Login (){
  let credentials = {
    clientid : 'fe3c04a170ad425fa85f14fef172e2ca',
    redirectURI : 'http://127.0.0.1:5173/app'
  }


  //request authorization code
  const enter = `https://accounts.spotify.com/authorize?client_id=${credentials.clientid}&redirect_uri=${credentials.redirectURI}&response_type=code`


  return(
    <div className='login'>
      <h1>PAGINA DE LOGIN</h1>
      <a href={enter}>ENTER WITH SPOTIFY</a>
    </div>
  )
}