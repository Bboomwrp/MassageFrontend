import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Link } from '@mui/material';
import getUserProfile from '@/libs/getUserProfile';

export default async function TopMenu(){

    const session = await getServerSession(authOptions)
    let profileName = ''
    if(session && session.user.token) {
        const profile = await getUserProfile(session.user.token)
        profileName = profile.data.name
    }
    // console.log(session)
    return (
        <div className='h-[50px] bg-[#C0AA89] fixed top-0 left-0 w-full flex flex-row justify-between'>
            <div className='flex flex-row gap-5'>
            {
                session? <Link href="/api/auth/signout">
                    <div className='flex items-center h-full px-2 text-neutral-600 text-md'>
                    Log-Out of {profileName}</div></Link>
                : <Link href="/api/auth/signin">
                    <div className='flex items-center h-full px-2 text-neutral-600 text-md'>
                    Log-In</div></Link>
            }
            </div>

            <div className='flex flex-row-reverse'>
                <div className='rounded border-2 '>
                    <Link href="/"><Image src={'/img/logo.jpg'} className='h-full w-auto' alt ='logo'
                width={0} height={0} sizes='100vh' /></Link>
                </div>
                <TopMenuItem title="MyBooking" pageRef="/mybooking"/>
                <TopMenuItem title='profile' pageRef='/profile'/>
            </div>

        </div>
    )
} 