const clientid = 'fe3c04a170ad425fa85f14fef172e2ca'
const clientSecret = '510ae83aca4b4af3a679bdab752ad69b'
const redirectURI = 'http://127.0.0.1:5173/app'


//REQUEST FIRST ACCESS TOKEN=====================
export async function requestAccessToken(codeAsParameter: string){
  //data send on requisition:
  let data = {
    code : codeAsParameter,
    redirect_uri : redirectURI,
    grant_type : 'authorization_code',
  }      

  try{
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method : 'POST',
      //turn data content in 'application/x-www-form-urlencoded':
      body: new URLSearchParams(Object.entries(data)).toString(),
      headers : {
        //send credentials in base64 format:
        Authorization : `Basic ${btoa(clientid + ':' + clientSecret)}`,
        "Content-Type" : 'application/x-www-form-urlencoded'
      }}
    )
    if(!response.ok){
      throw new Error("Network response was not ok")
    }
    sessionStorage.setItem('loggedIn', 'true')
    const responseData = await response.json()
    return responseData
  }catch(e){console.error('Fetch error: ', e)}
}

//GET REFRESHED ACCESS TOKEN=====================
export async function RefreshToken(refreshToken: string){
  let data = {
    grant_type : 'refresh_token',
    refresh_token : refreshToken
  }
  try{
    const response = await fetch('https://accounts.spotify.com/api/token',{
    method: 'POST',
    body: new URLSearchParams(Object.entries(data)).toString(),
    headers: {
      'Authorization' : `Basic ${btoa(clientid + ':' + clientSecret)}`,
      'Content-type' : 'application/x-www-form-urlencoded'
      }}
    )
    if(!response.ok){
      throw new Error("Network response was not ok")
    }
    const responseData = await response.json()
    return responseData
  }catch(e){console.error('Fetch error: ', e)}
}

//GET USER INFORMATIONS==========================
export async function getUser(token : string){
  let response = await fetch('https://api.spotify.com/v1/me',{headers: {
    Authorization: `Bearer ${token}`
  }})
  const responseData = await response.json()
  return responseData
}

//SPOTIFY SECTION================================
//get playlists-----------------------------------
export async function getUserPlaylists (){
  let response = await fetch(`https://api.spotify.com/v1/users/${sessionStorage.getItem('userId')}/playlists`,{
    headers : { 
      Authorization : `Bearer ${localStorage.getItem('accessToken')}`
      }
  })
  const responseData = await response.json()
  return responseData
}