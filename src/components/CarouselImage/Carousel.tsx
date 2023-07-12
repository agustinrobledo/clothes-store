import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ImageShape } from "./ImageShape";
import exampleImage from "../../assets/example.jpg";

export const Carousel2 = () => {
  const myRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const boxes = Array.from(
      myRef.current?.querySelectorAll<HTMLDivElement>(".image-shape") || []
    );

    const loop = horizontalLoop(boxes, { paused: true });

    // boxes.forEach((box, i) =>
    //   box.addEventListener("click", () =>
    //     loop.toIndex(i, { duration: 0.8, ease: "power1.inOut" })
    //   )
    // );

    document
      .querySelector(".next")
      ?.addEventListener("click", () =>
        loop.next({ duration: 0.4, ease: "power1.inOut" })
      );
    document
      .querySelector(".prev")
      ?.addEventListener("click", () =>
        loop.previous({ duration: 0.4, ease: "power1.inOut" })
      );

      function horizontalLoop(items: HTMLElement[], config: any) {
        items = Array.from(items);
        config = config || {};
        const tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: { ease: 'none' },
          onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
        });
        const length = items.length;
        const startX = items[0].offsetLeft;
        const times: number[] = [];
        const widths: number[] = [];
        const xPercents: number[] = [];
        let curIndex = 0;
        const pixelsPerSecond = (config.speed || 1) * 100;
        /* la función gsap.utils.snap se utiliza para redondear los valores de xPercent de cada elemento,
         asegurando que sean números enteros o múltiplos específicos según el ajuste proporcionado. 
         Esto puede ser útil para obtener valores de desplazamiento más precisos y coherentes en la animación o 
         diseño en el que se utilicen estos valores. */
        const snap =
          config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1);
        let totalWidth: number;
        let curX: number;
        let distanceToStart: number;
        let distanceToLoop: number;
        let item: HTMLElement;
        let i: number;

        /*
          Este código utiliza gsap.set() para establecer las propiedades de desplazamiento horizontal (xPercent)
          de una serie de elementos. Los valores de desplazamiento se calculan en función del ancho y posición actual
           de cada elemento.
        */
      
        gsap.set(items, {
          xPercent: (i, el) => {
            let w = (widths[i] = parseFloat(
              gsap.getProperty(el, 'width', 'px')
            ));
            xPercents[i] = snap(
              (parseFloat(gsap.getProperty(el, 'x', 'px')) / w) * 100 +
                gsap.getProperty(el, 'xPercent')
            );
            return xPercents[i];
          },
        });
      
        gsap.set(items, { x: 0 });

        /*
          Este bloque de código calcula el desplazamiento horizontal y la duración de la animación para
          cada elemento  en la línea de tiempo tl. Establece las propiedades xPercent de los elementos utilizando
          los cálculos y redondeos necesarios, y agrega las animaciones correspondientes en la línea de tiempo.
          También registra los tiempos de inicio de cada elemento en el array times. 
        */
      
        totalWidth = items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) * widths[length - 1] -
          startX +
          items[length - 1].offsetWidth * parseFloat(gsap.getProperty(items[length - 1], 'scaleX')) +
          (parseFloat(config.paddingRight) || 0);
      
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = xPercents[i] / 100 * widths[i];
          distanceToStart = item.offsetLeft + curX - startX;
          distanceToLoop = distanceToStart + widths[i] * parseFloat(gsap.getProperty(item, 'scaleX'));
          tl.to(item, {
            xPercent: snap((curX - distanceToLoop) / widths[i] * 100),
            duration: distanceToLoop / pixelsPerSecond,
          }, 0)
            .fromTo(item, {
              xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)
            }, {
              xPercent: xPercents[i],
              duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            }, distanceToLoop / pixelsPerSecond)
            .add('label' + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
      
        /*
          La función toIndex se encarga de realizar la transición en una línea de tiempo hacia un índice específico
           en un carrusel animado, teniendo en cuenta el estado actual de la línea de tiempo y aplicando las correcciones
           necesarias para lograr una navegación suave y precisa.
          
          Verifica si la diferencia absoluta entre el índice deseado y el índice actual es mayor que la mitad de la longitud del carrusel.
          Si es así, se ajusta el índice en la dirección más corta para evitar giros innecesarios.

          Calcula el nuevo índice utilizando el método gsap.utils.wrap() para asegurarse de que esté dentro del rango válido.
          Obtiene el tiempo correspondiente al nuevo índice desde un array de tiempos.

          Compara el tiempo obtenido con el tiempo actual de la línea de tiempo. Si indica que el tiempo ha "envuelto" en la línea de tiempo,
           se ajusta el tiempo utilizando gsap.utils.wrap() y se incrementa o decrementa en la duración total de la línea de tiempo.

          Actualiza el índice actual con el nuevo índice calculado.

          Configura la opción overwrite en true en el objeto vars para asegurar que las animaciones se sobrescriban si
          hay animaciones en progreso.
          
          Realiza una transición en la línea de tiempo hacia el tiempo especificado utilizando las opciones proporcionadas en vars.
           Esto cambia la reproducción de la línea de tiempo a la posición deseada.
        */

        function toIndex(index, vars) {
          vars = vars || {};
          (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length);
          let newIndex = gsap.utils.wrap(0, length, index);
          let time = times[newIndex];
          if (time > tl.time() !== index > curIndex) {
            vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
            time += tl.duration() * (index > curIndex ? 1 : -1);
          }
          curIndex = newIndex;
          vars.overwrite = true;
          return tl.tweenTo(time, vars);
        }
      
        tl.next = vars => toIndex(curIndex + 1, vars);
        tl.previous = vars => toIndex(curIndex - 1, vars);
        tl.current = () => curIndex;
        tl.toIndex = (index, vars) => toIndex(index, vars);
        tl.times = times;
        tl.progress(1, true).progress(0, true);
        if (config.reversed) {
          tl.vars.onReverseComplete();
          tl.reverse();
        }
        return tl;
      }
      
  }, []);

  return (
    <div className="container relative overflow-hidden max-h-[72vh] h-[100vh] min-w-[100vw]">
      <button className="prev bg-blue-400 px-4 py-2 relative top-0 rounded-sm font-bold mr-8">prev</button>
      <div
        ref={myRef}
        className="little absolute flex justify-center items-center w-max h-[50vh] pt-12"
      >
          <ImageShape
            imageSrc={exampleImage}
            shape={"buble"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"dd"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"circle"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"buble"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"hexagon"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"dd"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"square"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"hexagon"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"circle"}
          />
          <ImageShape
            imageSrc={exampleImage}
            shape={"dd"}
          />
      </div>
        <button className="next  bg-blue-400 px-4 py-2 relative top-0 rounded-sm font-bold mr-8">next</button>
    </div>
  );
};


