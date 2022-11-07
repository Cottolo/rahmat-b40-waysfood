import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api';
import { UserContext } from '../context/userContext';
import toRupiah from '@develoka/angka-rupiah-js';
import MenuModal from '../modals/modalMenu';



function RestaurantMenu(props) {

    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()
    const {id} = useParams()
    const [confirm, setConfirm] = useState(false)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [modal, setModal] = useState(null)

    const { data: product } = useQuery("productCache", async () => {
        const response = await API.get("/products/" + id);
        return response.data.data
    });

    const { data: user } = useQuery("userCache", async () => {
        const response = await API.get("/user/" + id);
        return response.data.data
    });
    
    const handleBack = (e) => {
        e.preventDefault()
        navigate("/")
    }

    const [cart,setCart] = useState({
        status : '',
        qty : 0,
        product_id :0
    })
    
    const handleSubmit = useMutation(async (e) => {
        try {
            const response = await API.post("/transaction", cart);
                console.log("ini tambah cart", response)

        } catch (error) {
            console.log(error);
        }
    });

    useEffect((e) => {      
        if (confirm)
        handleSubmit.mutate(e)
        setConfirm(false)
    }, [confirm])
    

    // console.log("ini cart:", cart);
    // console.log("ini seller:",user);
    // console.log("ini produk:",product);
    return (
        <div className='bg-light pt-5'>
            <div
                className='width-restaurant mx-auto '
            >
                <h2> {user?.name} Menus</h2>
                <div >
                    <div  className='row mt-5 '>
            {product?.map((item) => (
                            <div key={item?.id} className='col-sm-4 col-lg-3 mb-3'>
                                <Card className='Card'> 
                                    <Card.Img alt='menu photo' variant="top px-2 pt-2" 
                                    src={item?.image } />
                                    <Card.Body className='px-2 pb-2'>
                                        <p 
                                        className=' fw-bold'>{item?.product_name}</p>
                                        <Card.Text className='text-danger'>
                                            {toRupiah(item?.price,{floatingPoint:0})}
                                        </Card.Text>
                                        <Button
                                            onClick={()=>{setCart({product_id : item?.id, status : "Waiting Approve"}); handleShow(); setModal(item)}}
                                            className='border-0 bg-yellow text-dark w-100 fw-bold'>Order</Button>
                                    </Card.Body>
                                </Card>
                                <MenuModal showModal={show} hideModal={handleClose} setConfirm={setConfirm} modal={modal} />
                            </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RestaurantMenu;