import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export default function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide"><img className="h-full w-full" src="images/collegebuilding.jpeg"></img></div>
        <div className="embla__slide"><img className="h-full w-full" src="images/paper.jpg"></img></div>
        <div className="embla__slide"><img className="h-full w-full" src="images/classroom.jpg"></img></div>
      </div>
    </div>
  )
}
