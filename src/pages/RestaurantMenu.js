import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../config/api';
import BlankProfile from '../Pictures/blank profile.jpg';
import { UserContext } from '../context/userContext';


function RestaurantMenu(props) {

    const [state, dispatch] = useContext(UserContext)
    const navigate = useNavigate()
    const {id} = useParams()

    const { data: product } = useQuery("productCache", async () => {
        const response = await API.get("/products/" + id);
        return response.data.data
    });
    
    console.log(product);
    return (
        <div className='bg-light pt-5'>
            <div
                className='width-restaurant mx-auto '
            >
                <h2> Menus</h2>
            {product?.map((item) => (
                <div key={item?.id}>
                    <div className='row mt-5 '>
                            <div  className='col-sm-4 col-lg-3 mb-3'>
                                <Card className='Card'>
                                    <Card.Img alt='menu photo' variant="top px-2 pt-2" 
                                    src={item?.image } />
                                    <Card.Body className='px-2 pb-2'>
                                        <p 
                                        className=' fw-bold'>{item?.product_name}</p>
                                        <Card.Text className='text-danger'>
                                            Rp {item?.price}
                                        </Card.Text>
                                        <Button
                                            
                                            className='border-0 bg-yellow text-dark w-100 fw-bold'>Order</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                    </div>
                </div>
                    ))}
            </div>
        </div>
    )
}

export default RestaurantMenu;