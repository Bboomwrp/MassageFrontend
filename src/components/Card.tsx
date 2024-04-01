import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

export default function ProductCard( {massageShopName, picture, onCompare} : {massageShopName:string, picture:string, onCompare?:Function}) {


    return (
        <InteractiveCard contentName={ massageShopName }>
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={picture}
                alt = 'Product Picture'
                fill={true}
                objectFit='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[30%] p-[5px]'> {massageShopName} </div>

            {
                onCompare? <button className='block h-[10%] text-sm rounded-md bg-sky-600 
                hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm'
                onClick={ (e)=>{e.preventDefault(); onCompare(massageShopName) }}>
                    Compare
                </button> : ''
            }
        </InteractiveCard>
    );
}