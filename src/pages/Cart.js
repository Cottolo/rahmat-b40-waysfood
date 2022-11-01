import React, { useContext, useEffect, useState } from 'react'
import DeleteIcon from '../Pictures/delete.png';
import Line from '../Pictures/Line o.png';
import MapIcon from '../Pictures/map icon.png';
import DeliveryLocation from '../Pictures/delivery location.png';
import HowFar from '../Pictures/how far.png';
import Modal from 'react-bootstrap/Modal';
import { UserContext } from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api';
import { useMutation } from 'react-query';

function Cart(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowFar, setModalShowFar] = React.useState(false);   
const [ordered,setOrdered] = useState(false)

    const navigate = useNavigate()
    const [state] = useContext(UserContext)

    const { id } = useParams()

    const [cart, setCart] = useState()
    const getData = async () => {
        try {
            const response = await API.get("/transactions");
            setCart(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (state.user)
            getData()
    }, [state])

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/transactions/${id}`);
            getData()
        } catch (error) {
            console.log(error);
        }
    });

    const HandleAdd = async (qty, id) => {
        try {
            await API.patch(`/transactions/${id}`, { qty: qty })
            getData()
        } catch (error) {
            console.log(error);
        }
    }
    const HandleLess = async (qty, id) => {
        try {
            if (qty === 0) {
                deleteById.mutate(id)
            } else {
                await API.patch(`/transactions/${id}`, { qty: qty })
                getData()
            }
        } catch (error) {
            console.log(error);
        }

    }
    const filter = cart?.filter(p => p.buyer_id == id)
    const sum = cart?.map(p => p.product.price * p.qty).reduce((a, b) => a += b, 0)
    const qty = cart?.map(p => p.qty).reduce((a, b) => a += b, 0)


    return (
        <div className='bg-light'>
            <div className='width-restaurant mx-auto py-5'>
                <h2 className='mb-3'>Geprek Bensu</h2>
                <p className='mb-1'>Delivery Location</p>
                <div className='d-lg-flex '>
                    <div className='w-100 w-lg-75 me-lg-3 mb-4 '>
                        <input
                            className='px-3 form w-100 '
                            placeholder='Input Your Location'
                            ></input>
                            {console.log(cart)}
                    </div>
                    <button
                        onClick={()=>setModalShow(true)}
                        className='mapBtn d-flex justify-content-center align-items-center d-grid col-12 col-lg-3 fw-bold mb-3 '
                    >Select On Map <img src={MapIcon}></img></button>
                </div>
                <p className='mb-1'>Review Your Order</p>
                <div className='row'>
                    <div className='col-12 col-lg-8 '>
                        <img src={Line} className='w-100'></img>

                        {(props.cart).map((i) => (
                                <div key={i.id}>
                                    <div className='d-flex justify-content-between '>
                                        <div className='d-flex my-3'>
                                            <img src={i.image}></img>
                                            <div className='ms-3 my-auto'>
                                                <p className='mb-5 fw-bold'>{i.name}</p>
                                                <div className='d-flex'>
                                                    <button onClick={()=>props.less(i)} className='w-50 fw-bold border-0'>-</button>
                                                    <p className=' bg-brown my-auto py-1 text-center fw-bold w-50'>{i.quantity}</p>
                                                    <button onClick={()=>props.add(i)} className='w-50 fw-bold border-0'>+</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='my-auto'>
                                            <div className=''>
                                                <p className='mb-5 text-danger'>Rp {i.harga}.000</p>
                                                <div className='d-flex justify-content-end'>
                                                    <img 
                                                    onClick={()=>props.remove(i)}
                                                    src={DeleteIcon}></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <img src={Line} className='w-100'></img>
                                </div>
                            ))
                        }
                    </div>
                    <div className='col-12 col-lg-4'>
                        <img src={Line} className='w-100'></img>
                        <div className='d-flex justify-content-between'>
                            <div className='my-auto py-3'>
                                <p>Subtotal</p>
                                <p>Qty</p>
                                <p className='text-danger'>Ongkir</p>
                            </div>
                            <div className='my-auto py-3 mb-3'>
                                <p className='text-end text-danger'>Rp {props.subTotal}.000</p>
                                <p className='text-end'>{props.quantity}</p>
                                <p className='text-end text-danger'>10.000</p>
                            </div>
                        </div>
                        <img src={Line} className='w-100'></img>
                        <div className='d-flex justify-content-between text-danger'>
                            <p className='fw-bold'>Total</p>
                            <p className='fw-bold'>Rp {props.total}.000</p>
                        </div>
                    </div>
                </div>
                <div className='d-flex mt-5 justify-content-lg-end'>
                    {ordered?
                    (<button onClick={()=>setModalShowFar(true)} className='mapBtn d-grid col-12 col-lg-3 fw-bold align-items-center' >See How Far?</button>):
                    ( <button onClick={()=> setOrdered(!ordered)} className='mapBtn d-grid col-12 col-lg-3 fw-bold align-items-center' >Order</button>)
                }
                </div>
                <Modal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <img src={DeliveryLocation}></img>
                </Modal>
                <Modal
                    show={modalShowFar}
                    onHide={() => setModalShowFar(false)}
                    size="xl"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <img src={HowFar}></img>
                </Modal>
            </div>
        </div>
    )
}

export default Cart;