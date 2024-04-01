'use client'
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import getMassageShop from "@/libs/getMassageShop";
import { Booking } from "../../interface";

export default function BookingList() {
    
    const [bookings, setBookings] = useState<Booking[]>([]);
    const {data:session} = useSession()
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings`,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${session?.user.token}`
                    }
                });
                console.log(`Bearer ${session?.user.token}`)
                if (res.ok) {
                    const result = await res.json();
                    console.log(result.data);
                    setBookings(result.data);
                } else {
                    console.error("Failed to fetch bookings:", res.statusText);
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
          fetchBookings();
        }, []);
        const deleteBooking = async (id: string) => {
            try {
                const res = await fetch(`http://localhost:5001/api/v1/bookings/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${session?.user?.token}`
                    }
                });
                if (res.ok) {
                    setBookings(prevBookings => prevBookings.filter(item => item._id !== id));
                } else {
                    console.error("Failed to delete booking:", res.statusText);
                }
            } catch (error) {
                console.error("Error deleting booking:", error);
            }
        };

    if (!session) return null;

    if (bookings.length === 0) {
        return <div className="flex flex-row justify-center text-2xl font-semibold font-sans text-gray-300 p-8">No Booking</div>
    
    }

    //bookings.forEach((e)=>console.log(e.data))

    return (
        <div className="flex flex-col z-10">
            <div className="mt-10 text-black">
                {
                    (session.user.role !== 'admin')?bookings.map(booking =>(
                        <div className="w-[50%] items-center justify-center m-auto bg-white my-[10px] p-5 block rounded-xl flex flex-row hover:scale-[1.01] duration-150 hover:shadow-lg" key={booking._id}>
                            <div className="justify-start m-auto ml-5">
                                <h1 className="text-xl font-bold">Booking by {booking.user.name}</h1>
                                <h1>Booking Date: {booking.bookingDate.toString()}</h1>
                                <h1>MassageShop: {booking.massageShop.name}</h1>
                            </div>

                            <div className="flex flex-col">
                            <button onClick={() => deleteBooking(booking._id)} className="text-m text-black bg-white border-[1px] border-black font-semibold px-3 py-3 trounded hover:shadow-xl my-1 rounded-xl hover:bg-red-700 hover:text-white">
                                Remove Booking
                            </button>
                            <Link className="text-m text-black bg-white border-[1px] border-black font-semibold px-3 py-3 trounded hover:shadow-xl my-1 rounded-xl hover:bg-yellow-600 hover:text-white" 
                            href={`/mybooking/edit?id=${booking._id}&hid=${booking.massageShop._id.toString()}`}>
                                Edit Booking
                            </Link>
                            </div>
                        </div>
                    )): ""
                }
            </div>
        </div>
    );
}
