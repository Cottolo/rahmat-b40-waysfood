import React from 'react';
import Table from 'react-bootstrap/Table';
import CancleIcon from '../Pictures/cancle.png';
import ApproveIcon from '../Pictures/approved.png';

function IncomeTransaction() {
  return (
    <div className='bg-light vh-100 pt-5'>
      <div className='width-restaurant mx-auto'>
        <h2>Income Transaction</h2>
       <Table 
       className='mt-5'
       responsive hover bordered size='lg' >
      <thead>
        <tr>
          <th className='bg-gray'>No</th>
          <th className='bg-gray'>Name</th>
          <th className='bg-gray'>Adress</th>
          <th className='bg-gray'>Products Order</th>
          <th className='bg-gray'>Status</th>
          <th className='text-center bg-gray'>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Sugeng No Pants</td>
          <td>Cileungsi</td>
          <td>Pkaket Geprek, Paket ke..</td>
          <td className='text-warning'>Waiting Approve</td>
          <td className='text-center d-flex justify-content-evenly'>
            <button className='bg-red border-0 rounded-1 text-light px-3 fw-bold '>Cancle</button>
            <button className='bg-green border-0 rounded-1 text-light px-2 fw-bold '>Approve</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Haris Gams</td>
          <td>Serang</td>
          <td>Pkaket Geprek, Paket ke..</td>
          <td className='text-success'>Succes</td>
          <td className='text-center'><img src={ApproveIcon}></img></td>
        </tr>
        <tr>
          <td>3</td>
          <td >Larry the Bird</td>
          <td>Bekasi</td>
          <td>Pkaket Geprek, Paket ke..</td>
          <td className='text-danger'>Cancle</td>
          <td className='text-center'><img src={CancleIcon}></img></td>
        </tr>
        <tr>
          <td>4</td>
          <td >John O</td>
          <td>Mars</td>
          <td>Pkaket Geprek, Paket ke..</td>
          <td className='text-primary'>On The Way</td>
          <td className='text-center'><img src={ApproveIcon}></img></td>
        </tr>
      </tbody>
    </Table>
        
      </div>
    </div>
  )
}

export default IncomeTransaction