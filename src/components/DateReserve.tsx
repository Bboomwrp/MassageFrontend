'use client'
import { useState } from "react"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem } from "@mui/material"
import { TextField } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import {Dayjs} from "dayjs"

export default function DateReserve({onDateChange}:{onDateChange:Function}) {

    const [bookingDate, setBookingDate] = useState<Dayjs|null>(null)
    const [reserveDate, setReserveDate] = useState(null)
    //const [Location, setLocation] = useState('Chula')

    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            
            <LocalizationProvider dateAdapter={ AdapterDayjs}>
                <DateTimePicker className="bg-white" value={bookingDate} 
                onChange={(value)=>{setBookingDate(value); onDateChange(value)}}></DateTimePicker>
            </LocalizationProvider>
            

            {/* <Select variant="standard" name="Location" id="id" value={Location}
            onChange={ (e) =>setLocation(e.target.value)}
            className="h-[3em] w-[200px]">
                <MenuItem value="Melinda Ritchie">Melinda Ritchie</MenuItem>
                <MenuItem value="Dr. Anna Wehner">Dr. Anna Wehner</MenuItem>
                <MenuItem value="Bob Ledner">Bob Ledner</MenuItem>
                <MenuItem value="Alejandro Skiles">Alejandro Skiles</MenuItem>
                <MenuItem value="channels">channels</MenuItem>
                <MenuItem value="Altenwerth - Barrows">Altenwerth - Barrows</MenuItem>
            </Select> */}
            
        </div>
    )
}