import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSingleProduct } from '../../config/api'

function Detail() {
    const [ad, setAd] = useState({})
    const { adId } = useParams()

    useEffect(() => {
        getSingleAd()
    }, [])

    const getSingleAd = async () => {
        const res = await getSingleProduct(adId)
        setAd(res)
    }

    return <div>
        <h1>Detail</h1>

        <h1>iphone 14 pro max 128gb non pta</h1>
    </div>
}

export default Detail