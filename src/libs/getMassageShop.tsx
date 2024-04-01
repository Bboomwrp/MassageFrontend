

export default async function getMassageShop(id:string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/massageShops/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch massageShop")
    }

    return await response.json()
}