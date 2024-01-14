import { useNavigate } from 'react-router-dom'

function Card(props) {
    const { title, amount, image, id } = props.item
    const navigate = useNavigate()

    return <div
        onClick={() => navigate(`detail/${id}`)}
        style={{ border: '1px solid black', width: 200, height: 300, margin: 20 }}>
        <img width={200} height={100} src={image} />
        <h1>Rs. {amount}</h1>
        <h3>{title}</h3>
    </div>
}

export default Card