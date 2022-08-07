import React from 'react'
import './PictureGallery.scss';

type PictureGalleryProps = {
    picturesUrl: string[]
}

export default function PictureGallery({ picturesUrl }: PictureGalleryProps) {

    const pic = picturesUrl.map((url, i) => {
        console.log(i);
        
        return<div className={i === 1 ? "first":""}><img src={url}/></div>}
    )

  return (
    <div className='picture-gallery'>
        {pic}
    </div>
  )
}
