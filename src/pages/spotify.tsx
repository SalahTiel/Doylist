import { getUserPlaylists } from "../service/SpotifyApi"

async function getPlaylists(){
  interface Playlist{
    id: string
    name: string,
    images: [{url : string}]
  }
  let playlist : Playlist[]
  let data : any = []
  let response = await getUserPlaylists()
  playlist = response.items
  for(let i = 0; i < playlist.length; i++){
    let index = playlist[i]
    let arrayImages = index.images[0].url
    data.push({id: index.id, name : index.name, img: arrayImages})
  }
  return data
}
let lista = await getPlaylists()

export function Spotify(){
  

  return (
  <div>
    <h2>Essas são as suas playlists no Spotify, {sessionStorage.getItem('display name')}</h2>
    {lista.length == 0 && <p>sorry. I think you dont was any Spotify playlist. Ok, no problem.</p>}
    {lista.map((item:{id: string, name: string, img: string})=>(
      <div key={item.id}>
        <p>{item.name}</p>
        <img src={`${item.img}`} alt="" />
      </div>
    ) )}
   </div>
  )
}