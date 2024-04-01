import getMassageShops from "@/libs/getMassageShops"
import MassageShopCatalog from "@/components/MassageShopCatalog"
import { Suspense } from "react"
import { LinearProgress } from "@mui/material"


export default async function Hospital() {

    const massageShops = await getMassageShops()

    return (
        <main className="text-center p-5 bg-orange-100">
            <h1 className="text-xl font-medium">Select Your MassageShop</h1>
            <Suspense fallback={ <p>Loading ... <LinearProgress/></p> } >
            <MassageShopCatalog massageShopsJson={massageShops} />
            </Suspense>

            {/* <hr className="my-10"/>
            <h1 className="text-xl font-medium">TRY Client-side Car Panel</h1>
            <CardPanel/> */}

        </main>
    )
}