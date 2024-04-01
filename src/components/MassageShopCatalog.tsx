import Card from '@/components/Card'
import Link from 'next/link'
import { MassageShopItem,MassageShopJson } from '../../interface'

export default async function MassageShopCatalog( {massageShopsJson}: {massageShopsJson: Promise<MassageShopJson>} ) {
    const massageShopJsonReady = await massageShopsJson
    return (
        <>
        Expore {massageShopJsonReady.count} MassageShop in our catalog

        <div style={{margin:"20px" , display:"flex", flexDirection:"row",flexWrap:"wrap",
            justifyContent:"space-around", alignContent:"space-around", padding:"10px"}}>
                {
                    massageShopJsonReady.data.map((MassageShopItem:MassageShopItem)=>(
                        <Link href={`/massageShop/${MassageShopItem.id}`} className='
                        w-[100%] md:w-[50%] lg:w-[30%]
                        p-[10px]
                        '>
                        <Card massageShopName={MassageShopItem.name} picture={MassageShopItem.picture} />
                        </Link>
                    ))
                }
            </div>
        </>
    )
}