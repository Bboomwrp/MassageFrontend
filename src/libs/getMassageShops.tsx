

export default async function getMassageShops() {

    //await new Promise( (resolve)=>setTimeout(resolve, 2000) )

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/massageShops`)
    if(!response.ok){
        throw new Error("Failed to fetch massageShops")
    }

    return await response.json()

}