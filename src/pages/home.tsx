//OPEN AND CLOSE WINDOWNS 


import {useState} from 'react'
export function Home() {
  let[tagsVisibility, setTagsVisibility] = useState(false)
  let[musicsVisibility, setMusicsVisibility] = useState(false)
  return (<div>
    {/*PLAYLIST AND TAGS WINDOWNS*/}
    <div className="musicList">
            <div className='musicList-tags'>
              <div className="musicList-tags-title">
                <p>TAGS</p>
                <button onClick={()=>{setTagsVisibility(!tagsVisibility)}}>edit</button>
              </div>
            </div>

            <div className="musicList-musics">
              <div className="musicList-musics-title">
                <p>YOUR MUSICS</p>
                <button onClick={()=>{setMusicsVisibility(!musicsVisibility)}}>edit</button>
              </div>
            </div>
          </div>

          {/*TAGS WINDOW*/}
          <div className={`tags ${tagsVisibility ? null : 'closed'}`}>
              <div className='tags-header'>
                <p>TAGS</p>
                <button onClick={()=>{setTagsVisibility(!tagsVisibility)}}>close</button>
              </div>
              <form className='tags-newTag'>
                <label htmlFor="">New tag</label>
                <input type="text"/>
                <input type="color"/>
              </form>
            </div>

            {/*MUSICS WINDOW*/}
            <div className={`musics ${musicsVisibility ? null : 'closed'}`}>
              <div className='musics-header'>
                <p>MUSICS</p>
                <button onClick={()=>{setMusicsVisibility(!musicsVisibility)}}>close</button>
              </div>
            </div>
  </div>)
}