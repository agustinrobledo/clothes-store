import { ImageShape } from '../ImageShape/ImageShape';
import exampleImage from '../../assets/example.jpg';

export const CarouselImage = () => {
  return (
    <div className='flex justify-center items-center'>
        <ImageShape imageSrc={exampleImage} shape={'square'}/>
        <ImageShape imageSrc={exampleImage} shape={'buble'}/>
        <ImageShape imageSrc={exampleImage} shape={'circle'}/>
        <ImageShape imageSrc={exampleImage} shape={'dd'}/>
        <ImageShape imageSrc={exampleImage} shape={'hexagon'}/>
    </div>
  )
}
