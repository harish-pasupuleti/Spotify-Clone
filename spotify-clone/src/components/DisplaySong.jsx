import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import SongItem from './SongItem'
import Navbar from './Navbar'

const DisplaySong = () => {

    const {songsData} = useContext(PlayerContext)

  return (
    <>
    <Navbar />
    <div className='mb-4'>
    <h1 className='my-5 font-bold text-2xl'>Today's Biggest hits</h1>
    <div className='flex overflow-auto '>
    {
            songsData.map((item,index)=>(
                <SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>
            ))
        }
    </div>
       
    </div>
    </>
  )
}

export default DisplaySong