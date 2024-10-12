import { useEffect, useState } from "react";
import { createContext, useRef } from "react";
import axios from 'axios'
export const PlayerContext =createContext();

const PlayerContextProvider=(props)=>{

    const audioRef=useRef();
   const seekBg=useRef();
   const seekBar=useRef();
   
   const url = "http://localhost:4000"
   const [songsData,setSongsData]=useState([])
   const [albumsData,setAlbumData]=useState([])
    const [track,setTrack]=useState(songsData[0]);
    const [playStatus,setplayStatus]=useState(false)
    const [selectedTab, setSelectedTab] = useState('all')

    const [time,setTime]=useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0  
        }
    })
     
    const play =()=>{
        audioRef.current.play()
        setplayStatus(true)
    }

    const pause =()=>{
        audioRef.current.pause()
        setplayStatus(false)
    }

    const playWithId =async(id)=>{
       await songsData.map((item)=>{
          if(id===item._id){
            setTrack(item)

          }
       })
       await audioRef.current.play()
       setplayStatus(true)
    }

    const previous =async ()=>{
        songsData.map(async (item,index)=>{
            if(track._id===item._id && index >0){
              await  setTrack(songsData[index-1])
              await audioRef.current.play()
              setplayStatus(true)
            }
        }) 
       

       
    }

    const next =async ()=>{

        songsData.map(async (item,index)=>{
            if(track._id===item._id && index <songsData.length){
              await  setTrack(songsData[index+1])
              await audioRef.current.play()
              setplayStatus(true)
            }
        }) 
        
    }
    
    const seekSong = async (e)=>{
         audioRef.current.currentTime=((e.nativeEvent.offsetX / seekBg .current.offsetWidth)*audioRef.current.duration)
    }

    const getSong = async ()=>{
     try {
        const response=await axios.get(`${url}/api/song/list`)
        setSongsData(response.data.songs)
        setTrack(response.data.songs[0])

     } catch (error) {
        
     }
    }
    const getAlbums = async ()=>{
        try {
           const response=await axios.get(`${url}/api/album/list`)
           setAlbumData(response.data.albums)
           setTrack(response.data.songs[0])
   
        } catch (error) {
           
        }
       }

    useEffect(()=>{
   setTimeout(()=>{
     audioRef.current.ontimeupdate=()=>{
        seekBar.current.style.width=(Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
        setTime({
            currentTime:{
                second:Math.floor(audioRef.current.currentTime%60),
                minute:Math.floor(audioRef.current.currentTime/60),
            },
            totalTime:{
                second:Math.floor(audioRef.current.duration%60),
                minute:Math.floor(audioRef.current.duration/60),
            }
        })
     }
   })
    },[audioRef])

    useEffect(()=>{
            getSong()
            getAlbums()
    },[])

    const contextValue={
       audioRef,
       seekBar,
       seekBg,
       track,
       setTrack,
       playStatus,
       setplayStatus,
       time,
       setTime,
       play,
       pause,
       playWithId,
       next,
       previous,seekSong,
       songsData,
       albumsData,
       selectedTab,setSelectedTab
    }
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;