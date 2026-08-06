import {useState, useEffect} from 'react'
import {dummyPublishedImages} from '../assets/assets' 

function Community() {

const [images, setImages] = useState([])
const [loading, setLoading] = useState(true)

const fetchImages = async () => {
    setImages(dummyPublishedImages);
    setLoading(fasle)
}

useEffect(()=>{
    fetchImages()
}, [])


// if(loading) return <Loading />

return (
        <div className="p-6 pt-5 h-full w-full">
            <h2 className="text-2xl font-bold text-center">Community Images</h2>

            {images.length > 0 ? (
                <div className="flex flex-wrap gap-4 justify-center gap-y-2 h-screen w-screen pt-8">
                    {images.map((item, index)=>(
                        <a className="group h-50 w-50 relative" key={index} href={item.imageUrl} target="_blank">
                            <p className="absolute bottom-0 left-0 text-[14px] px-2 py-2 opacity-0 group-hover:opacity-100 transition-transform duration-100 ease-in-out">Created by {item.userName}</p>
                            <img className="h-full w-full rounded" src={item.imageUrl} alt="" />
                            </a>

                    ))}
                </div>
            ) : (
                <p>No images available </p>
            )}


            
        </div>
    )
}

export default Community