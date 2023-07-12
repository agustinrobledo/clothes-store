import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ImageShape } from './ImageShape';
import exampleImage from '../../assets/example.jpg';

export const CarouselImage = () => {
  const myRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const myContainer = containerRef.current;
    const myElement = myRef.current;
    let isDragging = false;
    let mouseX = 0;

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      mouseX = event.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const newPosition = Number(gsap.getProperty(myElement, 'x')) + event.clientX - mouseX;
        gsap.to(myElement, { x: newPosition, duration: 0, ease: 'power2.out' });
        mouseX = event.clientX;
        console.log(event.clientX);
      }
    };


    if (myElement != null && myContainer != null) {
      myElement.addEventListener('mousedown', handleMouseDown);
      myElement.addEventListener('mouseup', handleMouseUp);
      myElement.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {

        myElement.removeEventListener('mousedown', handleMouseDown);
        myElement.removeEventListener('mouseup', handleMouseUp);
        myElement.removeEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      };
    }

  }, []);

  return (
    <div ref={containerRef} className="container relative overflow-hidden max-h-[70vh] h-[55vw] ">
      <div ref={myRef} className="little absolute left-[-10.5vw] flex justify-center items-center gap-10 w-max h-full ">
        <ImageShape imageSrc={exampleImage} shape={'buble'} />
        <ImageShape imageSrc={exampleImage} shape={'dd'}/>
        <ImageShape imageSrc={exampleImage} shape={'square'}/>
        <ImageShape imageSrc={exampleImage} shape={'circle'}/>
        <ImageShape imageSrc={exampleImage} shape={'hexagon'}/>
        <ImageShape imageSrc={exampleImage} shape={'dd'}/>
      </div>
    </div>
  );
};
