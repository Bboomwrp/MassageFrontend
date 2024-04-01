import Image from 'next/image'
import styles from './page.module.css'
import Banner from '@/components/Banner'
import PromoteCard from '@/components/PromoteCard'

export default function Home() {
  return (
    <main className='flex flex-col justify-between items-center p-24 min-h-1/2 bg-orange-100'>
    
     <Banner/>
     <PromoteCard></PromoteCard>

    </main>
  )
}
