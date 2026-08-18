import React from 'react'
import service from '../appwrite/configuration'
import { Link } from 'react-router-dom'


function Postcard({
    $id,
    title,
    featuredImage
}) {
    return (
        <Link to={`/post/${$id}`} className="group block">
            <div className='w-full bg-white rounded-xl border border-slate-200 p-3 transition-shadow duration-150 hover:shadow-md'>
                <div className='w-full mb-3 overflow-hidden rounded-lg bg-slate-100 aspect-video'>
                    <img
                        src={service.thumbnailPreview(featuredImage)}
                        alt={title}
                        className='w-full h-full object-cover transition-transform duration-200 group-hover:scale-105'
                    />
                </div>

                <h2 className='text-base font-semibold text-slate-900 leading-snug line-clamp-2'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default Postcard