import React from 'react'
import {restaurantD} from '../Dummy/RestaurantD';
import { API } from '../config/api';
import { useQuery } from 'react-query';

export const Restaurant = () => {

    return (
      <div className='mt-5 width-restaurant mx-auto'>
          <div className='pt-5'>
              <h2>Popular Restaurant</h2>
          </div>
          <div className='d-flex mt-5 justify-content-between'>
          {restaurantD.map ((item) => {
              return(
                  <div className='bg-white border rounded-2 w-25 me-2 d-flex shadow p-2'>
                  <img src={item.image} alt={item.name} />
                  <h3 className='d-flex align-items-center ps-2'>{item.name}</h3>
                  </div>   
              )
          })}
          </div>
      </div>
      
    )
  }
