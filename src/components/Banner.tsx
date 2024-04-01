'use client'
import { useState } from 'react';
import styles from './Banner.module.css'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner(){
    const covers = ['/img/cover.jpg', '/img/cover2.jpg', '/img/cover3.jpg', '/img/cover4.jpg']
    const [index, setIndex] = useState(0)
    const router = useRouter()

    const { data: session} = useSession()
    console.log(session?.user.token)

    return (
        <div className={styles.banner} onClick={()=>{ setIndex(index+1) }}>
            <Image src={covers[index%4]} 
            alt ='cover'
            fill={true}
            objectFit='cover'
            className={styles.bannerImage}
            />
            <div className={styles.bannerText}>
                <h1 className='text-4xl font-medium'>Massage Shop</h1>
                <h5 className='text-xl font-serif'></h5>
            </div>
            {
                session? 
                <div className='z-30 absolute top-5 right-10 font-semibold text-cyan-800 text-xl'>
                    Welcome {session.user?.name}
                </div>
                : null
            }
            <button className='bg-white text-orange-900 border border-orange-900
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
            hover:bg-orange-900 hover:text-white hover:border-transparent '
            onClick={ (e)=> { router.push('/massageShop') ; e.stopPropagation()}}>
                Select Your MassageShop Now
            </button>
        </div>
    );
}