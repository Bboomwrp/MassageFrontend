'use client'
import DateReserve from "@/components/DateReserve"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import getMassageShop from "@/libs/getMassageShop";

export default function Bookings({ params }: { params: { hid: string } }) {
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
    const { data: session } = useSession();
    const [massageShopDetail, setMassgeShopDetail] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
          const massageData = await getMassageShop(params.hid);
          setMassgeShopDetail(massageData);
        };
    
        fetchData();
      }, [params.hid]);

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        

        try {
            // Fetch data from the backend API
            const res = await fetch(`http://localhost:5001/api/v1/massageShops/${params.hid}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.token}` // Pass the user token for authentication
                },
                body: JSON.stringify({
                    bookingDate: bookingDate ? bookingDate.format("lll") : "",
                    user: session?.user._id,
                    massageShop: massageShopDetail
                })
            });

            // Check if the request was successful
            if (res.ok) {
                const data = await res.json();
                console.log("Booking created:", data);
                alert('booking complete')
                // Handle successful booking creation here (e.g., show a success message)
            } else {
                // Handle error response from the server
                const errorData = await res.json();
                console.error("Error creating booking:", errorData);
                // Display an error message to the user
            }
            
        } catch (error) {
            console.error("Error creating booking:", error);
            // Display an error message to the user
        }
    };

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <form onSubmit={handleSubmit} className="fixed translate-x-[-50%] translate-y-[-50%] top-[30%] left-[50%] mt-[42.5px] z-10 p-[15px] rounded-xl backdrop-blur bg-gray-500 bg-opacity-30 flex flex-col justify-center">
                <div className="texl-xl font-medium">MassageShop Booking</div>

                <div className="w-fit space-y-2">
                    <DateReserve 
                    onDateChange={(value: Dayjs) => {
                        setBookingDate(value);
                      }}/>
                </div>

                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                    name="Book Vaccine"
                    type="submit"> {/* Change onClick to type="submit" */}
                    Book Massage
                </button>
            </form>
        </main>
    )
}
