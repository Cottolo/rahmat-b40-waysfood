import React, { useContext, useEffect, useState } from 'react'
import PProfile from '../Pictures/Geprek.png'
import IconP from '../Pictures/iconP.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { API } from '../config/api'
import BlankProfile from '../Pictures/blank profile.jpg';
import { useQuery } from 'react-query'


function ProfilePartner() {

    const [state] = useContext(UserContext)

    const navigata = useNavigate()

    const [user, setUser] = useState()
    const {id} = useParams()
    
            let {data: profilesfetch} = useQuery("profilesfetchcache", async()=>{
                const response = await API.get("/user/" + id);
                return response.data.data;
            })
            console.log(profilesfetch);

    return (
        <div className='bg-light mt-0 pt-5 vh-100'>
            <div className='width-restaurant  d-flex mx-auto pt-5 justify-content-between'>
                <div className='w-50 me-5 '>
                    <div>
                        <h2 className='mb-4'>My Profile</h2>
                        <div className='d-flex ' >
                            <div className='me-4'>
                                {/* <img className='pp' alt='Photo Profile' src={user?.image==""? BlankProfile : user?.image}></img> */}
                                <img className='pp' alt='Photo Profile' 
                                src={profilesfetch?.image == "http://localhost:5000/uploads/"? BlankProfile:profilesfetch?.image}></img>
                                {console.log("ini img",profilesfetch?.image)}
                                <div>
                                    <Link to={`/edite-profile-partner/${id}`} >
                                    <button
                                        className='bg-dark text-light w-100 py-1 rounded-2 mt-3'
                                        >Edite Profile</button>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <h5>Full Name</h5>
                                <p className='mb-4 colorProfile'>{profilesfetch?.name}</p>
                                <h5>Email</h5>
                                <p className='mb-4 colorProfile'>{profilesfetch?.email}</p>
                                <h5>Phone</h5>
                                <p className='mb-4 colorProfile'>{profilesfetch?.phone}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-50'>
                    <h2>History Transaction</h2>
                    <div className='mt-4 p-3 width-restaurant shadow d-flex bg-white justify-content-between'>
                        <div>
                            <h5>Geprek Bensu</h5>
                            <span className='fw-bold'>Saturday</span><span>, 12 March 2021</span>
                            <h5 className='mt-3 color-harga' >Total : Rp 45.000</h5>
                        </div>
                        <div className='' >
                            <div className=''>
                                <img className='' src={IconP}>
                                </img>
                            </div>
                            <div>
                                <button className='btnProfile fw-bold mt-4 py-1 px-5'>Finished</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfilePartner;