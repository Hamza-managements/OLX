import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CustomBtn from '../../components/CustomBtn'
import Card from '../../components/Card'
import { getAllProducts } from '../../config/firebase'
import './index.css'

function Dashboard() {
    const [ads, setAds] = useState([])

    useEffect(() => {
        getAds()
    }, [])

    const getAds = async () => {
        const res = await getAllProducts()
        console.log('res', res)
        setAds(res)
    }

    const navigate = useNavigate()
    return <div className='container'>

        <button onClick={() => navigate('contactUs')}>Contact Us</button>
        <button onClick={() => navigate('aboutUs')}>About Us</button>

        <h1>Dashboard</h1>

        {ads.map(item => {
            return <Card item={item} />
        })}


        <p>kjdklasjfdslaknfjkalndflkas</p>

        <CustomBtn text='Submit' bgColor='red' />
    </div>
}

export default Dashboard
