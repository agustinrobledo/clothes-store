import gsap from "gsap";

const dragAndDrop = (element:HTMLDivElement) => {
    const myElement = element;
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
      }
    };


    if (myElement != null) {
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
}

export default dragAndDrop