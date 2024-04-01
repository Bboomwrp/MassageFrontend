import Image from "next/image"
import getMassageShop from "@/libs/getMassageShop"
import Link from "next/link"

export default async function CardDetailPage ( {params} : { params: { hid: string}} ) {

    const massageShopDetail = await getMassageShop(params.hid)

    /**
     * Mock Data for Demonstration Only
     */
    // const mockHospitalRepo = new Map()
    // mockHospitalRepo.set("001", {name: "Chulalongkorn Hospital", image: '/img/chula.jpg'})
    // mockHospitalRepo.set("002", {name: "Rajavithi Hospital", image: "/img/rajavithi.jpg"})
    // mockHospitalRepo.set("003", {name: "Thammasat University Hospital", image: "/img/thammasat.jpg"})
    console.log(massageShopDetail.data.picture)

    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">MassageShop ID: {massageShopDetail.data.id}</h1>
            <div className="flex flex-row my-5">
                <Image src={ massageShopDetail.data.picture }
                alt="MassageShop Image"
                width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div className="text-md mx-5 text-left">
                <div className="font-bold text-md mx-5">{massageShopDetail.data.name}</div>
                <div className="text-md mx-5">Address: {massageShopDetail.data.address}</div>
                <div className="text-md mx-5">Tel: {massageShopDetail.data.tel}</div>
                <div className="text-md mx-5">Open-Close Time: {massageShopDetail.data.open_close_time}</div>
                <Link href={`/massageShop/${params.hid}/booking`}>
                <button className="block rounded-md bg-stone-700 hover:bg-stone-900 px-3 py-2 text-white shadow-sm">
                Select
                </button>
                </Link>
                </div>
                
            </div>
            
        </main>
    )
}

// export async function generateStaticParams() {
//     return [{hid:'001'}, {hid:'002'}, {hid:'003'}]
// }