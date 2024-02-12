import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPhone, faComments, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Loader from '../Loader';
import './style.css';
import ImageScroll from '../../Component/ImagesScrollGrid';
import heartImg from '../../Component/Carts/image-PhotoRoom.png-PhotoRoom-removebg-preview.png';
import likedHeartImg from '../../Component/Carts/image-PhotoRoom.png-PhotoRoom__1_-removebg-preview.png'
import { getDateFromDb } from '../../Config/firebase';
import { MapForDetailPage } from '../../Component/Maps';
import { addToCart, removeFromCart, getDataOfAddToCart } from '../../Config/firebase';

function SeletedItem() {

    const [product, setProduct] = useState();
    const [isLiked, setIsLiked] = useState(false);
    const res = useSelector(res => res.userSlice.userInfo)
    const navigate = useNavigate();
    const { id } = useParams();

    const dicountOutOf100Per = 100 - product?.discountPercentage;
    const discountedPrice = product?.price / 100 * dicountOutOf100Per;
    const todayDate = new Date();
    const daysAgo = todayDate.getTime() / 1000 / 60 / 60 / 24 - product?.date / 1000 / 60 / 60 / 24;

    useEffect(() => {
        getProducts();
        checkTheCarts();
    }, []);

    async function getProducts() {
        const res = await getDateFromDb(id)
        setProduct(res);
    };

    const checkTheCarts = async () => {
        const result = await getDataOfAddToCart(res?.userId);
        
        for(let i = 0; i < result.length; i++) {
    
        if (result[i] == id) {
            setIsLiked(true);
            break;
        };
        
        };
    };

    const likeIsClickFunc = async () => {
        
        if (res?.user) {

            setIsLiked(!isLiked);

            !isLiked ?
            await addToCart(id, res?.userId)
            :await removeFromCart(id, res?.userId);
        } else {
            alert('Please login then you like the cart');
            navigate('/login');
        };
    };

    if (!product) {
        return <Loader />
    };

    return (
        <div>
            <div className='container'>
                <ImageScroll images={product.images} />
                <div style={{ width: '51%', display: 'flex', flexDirection: 'column', height: '79vh' }}>
                    <div className="user-info-container">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img className='user-image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLHZh0aF5Og2DF4G19yPVx_QGjXfaBByFZA&usqp=CAU' alt='user-image' />
                            <div>
                                <span className='user-name txt'>{product?.firstname ? product.firstname + " " + product.lastname : 'Ghulam Muhiuddin'}</span>
                                <span className='txt'>Member since in 2021</span>
                                <span style={{ color: '#002f34', cursor: 'pointer', fontWeight: '700', fontSize: 25 }} className='txt'>See profile <FontAwesomeIcon style={{ fontSize: 21 }} icon={faChevronRight} /></span>
                            </div>
                        </div>
                        <br />
                        <button className='show-phone-numer-btn'><FontAwesomeIcon style={{ marginRight: 9, fontSize: 25 }} icon={faPhone} />Show Phone Number</button>
                        <br />
                        <br />
                        <button onClick={() => product.userId ? navigate(`/chats/${product.id}`) : alert('User is not defined')} className='chat-btn'> <FontAwesomeIcon style={{ marginRight: 9, fontSize: 25 }} icon={faComments} />Chat</button>
                    </div>
                    <br />
                    <br />
                    <div className='locaiton-container'>
                        <span style={{ fontSize: 33, fontWeight: '700', display: 'block', textAlign: 'left', marginLeft: 19 }}>Location</span>
                        <br />
                        <span style={{ fontSize: 25, display: 'block', textAlign: 'left', marginLeft: 19 }}><FontAwesomeIcon style={{ color: '#002f34' }} icon={faLocationDot} /> Malir, Karachi</span>
                        <br />
                        {product?.latitude && <MapForDetailPage latitude={product?.latitude} longitude={product?.longitude} />}
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
            <br />
            <div className='detail-container'>
                <br />
                <span style={{ display: 'flex', color: '#002f34', justifyContent: 'space-between', marginLeft: 19, fontSize: 35, fontWeight: '700' }}>
                    <span>
                        <span style={{ fontSize: 33, fontWeight: '700' }}>Price:</span> $<ins>{discountedPrice.toFixed(1)}</ins> <del>{product.price}</del></span>
                    <img onClick={likeIsClickFunc} className={isLiked ? 'clicked-heart' : 'heart'} src={isLiked ? likedHeartImg : heartImg} />

                </span>
                <br />
                <span style={{ display: 'block', color: '#002f34', textAlign: 'left', marginLeft: 19, fontSize: 29, fontWeight: '500' }}>{product.title}</span>
                <br />
                <span style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <span style={{ fontSize: 25, display: 'block', textAlign: 'left', marginLeft: 19 }}><FontAwesomeIcon style={{ color: '#002f34' }} icon={faLocationDot} /> Malir, Karachi</span>

                    <span style={{ fontSize: 25, marginRight: 19 }}>
                        {Math.ceil(daysAgo) <= 1 ? Math.ceil(daysAgo) + ' day ago' : Math.ceil(daysAgo) + ' days ago'}
                    </span>

                </span>
                <br />
                <span style={{ display: 'block', color: '#002f34', textAlign: 'left', marginLeft: 19, fontSize: 33, fontWeight: '700' }}>Description:</span>
                <br />
                <span style={{ fontSize: 21, display: 'block', color: '#002f34', marginLeft: 19, textAlign: 'left' }}>
                    {product.description}
                </span>
                <br />
            </div>
            <br />
        </div>
    )
}

export default SeletedItem;