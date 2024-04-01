'use client'
import DateReserve from "@/components/DateReserve"
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { useEffect } from "react";
import getMassageShop from "@/libs/getMassageShop";
import { useSearchParams } from "next/navigation";

export default function Edit() {
    const urlParams = useSearchParams();
    const bookingId = urlParams.get("id");
    const massageShopID = urlParams.get("hid");
    const [bookingDate, setBookingDate] = useState<Dayjs | null>(null);
    const { data: session } = useSession();
    const [massageShopDetail, setMassgeShopDetail] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/v1/massageShops/${massageShopID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch massage shop data');
                }
                const massageData = await response.json();
                setMassgeShopDetail(massageData);
            } catch (error) {
                console.error("Error fetching massage shop data:", error);
            }
        };
    
        fetchData();
    }, [massageShopID]);
    

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        

        try {
            // Fetch data from the backend API
            const res = await fetch(`http://localhost:5001/api/v1/bookings/${bookingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session?.user.token}` // Pass the user token for authentication
                },
                body: JSON.stringify({
                    bookingDate: bookingDate ? bookingDate.format("lll") : "",
                    user: session?.user._id,
                    massageShop: massageShopID
                })
            });


            // Check if the request was successful
            if (res.ok) {
                const data = await res.json();
                console.log("Booking updated:", data);
                alert('Update')
                // Handle successful booking creation here (e.g., show a success message)
            } else {
                // Handle error response from the server
                const errorData = await res.json();
                console.error("Error updating booking:", errorData);
                alert('Cant Update')
                // Display an error message to the user
            }
            
        } catch (error) {
            console.error("Error updating booking:", error);
            // Display an error message to the user
        }
    };

    console.log(massageShopDetail);
    console.log(bookingDate);
    console.log(bookingId);

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            <form onSubmit={handleSubmit} className="fixed translate-x-[-50%] translate-y-[-50%] top-[30%] left-[50%] mt-[42.5px] z-10 p-[15px] rounded-xl backdrop-blur bg-gray-500 bg-opacity-30 flex flex-col justify-center">
                <div className="texl-xl font-medium">Edit Booking</div>

                <div className="w-fit space-y-2">
                    <DateReserve 
                    onDateChange={(value: Dayjs) => {
                        setBookingDate(value);
                      }}/>
                </div>

                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                    name="Update Booking"
                    type="submit"> {/* Change onClick to type="submit" */}
                    Update
                </button>
            </form>
        </main>
    )
}
