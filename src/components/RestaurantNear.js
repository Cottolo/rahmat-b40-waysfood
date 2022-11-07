import React from 'react';
import { Link, useParams } from 'react-router-dom';
import BlankProfile from '../Pictures/blank profile.jpg';


import { API } from '../config/api';
import { useQuery } from 'react-query';

export const RestaurantNear = () => {

  let { data: RestaurantNear } = useQuery('partnerCache', async () => {
    const response = await API.get('/users');
    const Partner = response.data.data.filter((p)=>p.role=="Partner")
    return Partner
  });

    return (
      <div className='mt-5 width-restaurant mx-auto py-5'>
          <div className='pt-5'>
              <h2>Restaurant Near You </h2>
          </div>
          <div className='row mt-5'>
          {RestaurantNear?.map ((item,index) => (
            <div className='col-3'>
            <div 
            key={index}
            className='card border w-100 me-5 mt-5 shadow p-2'>
                  <img 
                  style={{width:"100%", height:"200px"}}
                  className="mx-auto "
                  src={item?.image == "http://localhost:5000/uploads/"? BlankProfile: item?.image} alt={item?.name} />
                  <Link
                    className='a'
                    to={`/restaurant-menu/${item?.id}`}>
                  <h5 className=''>{item?.name}</h5>
                  </Link>
                  <p>0,3 KM</p>
                  </div>   
              </div>
              )
              )}
          </div>
      </div>
      
    )
  }