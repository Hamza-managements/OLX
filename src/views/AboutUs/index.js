import { useNavigate } from 'react-router-dom'
import CustomBtn from '../../components/CustomBtn'

function AboutUs() {
    const navigate = useNavigate()

    return <div style={{ width: '100vw', height: 300, background: 'green' }}>
        <h1>About Us</h1>


        <button onClick={() => navigate(-1)}>Back</button>

        <CustomBtn text='Click Here' bgColor='purple' />
    </div>
}

export default AboutUs