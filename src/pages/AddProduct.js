import React, { useContext, useState } from 'react'
import { useMutation } from 'react-query';
import { API } from '../config/api';
import { UserContext } from '../context/userContext';
import FileIcon from '../Pictures/file.png'


function AddProduct() {
const [state] = useContext(UserContext)
const [preview, setPreview] = useState(null)

const[form,setForm] = useState({
                                    image:"",
                                    name:"",
                                    price:0,
                                    })

const handleChange = (e)=>{
    setForm({
        ...form,
        [e.target.name] :
        e.target.type ==="file"? e.target.files : e.target.value,
        });

    if (e.target.type === "file"){
        let url = URL.createObjectURL(e.target.files[0]);
        setPreview(url);
    }
};


const handleSubmit = useMutation(async(e)=>{
    try {
        e.preventDefault();

        const formData = new FormData();
        formData.set("image", form?.image[0], form?.image[0].name);
        formData.set("name", form?.name);
        formData.set("price", form?.price);
    
        const data = await API.post("/product", formData,{
            headers : {
                Authorization : `Bearer ${localStorage.token}`,
            },
        });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
});

    return (
        <div className='bg-light vh-100'>
            <form className='formEdite py-5 width-restaurant mx-auto'
            onSubmit={(e)=>handleSubmit.mutate(e)}>
                {preview &&(
                    <div>
                        <img src={preview}
                        alt={preview}
                        style={{
                            maxWidth : "200px",
                            maxHeight : "200px",
                            margin : "10px",
                            objectFit : "cover"
                        }}
                        />
                    </div>
                )}
                <h2 className='mb-5'>Add Product</h2>
                <div className='d-flex justify-content-between'>
                    <input
                        className='w-70 '
                        placeholder='Product Name'
                        type='text'
                        onChange={handleChange}
                        name='name'
                        required
                    ></input>
                    <input
                        id='inputFile'
                        hidden
                        type='file'
                        onChange={handleChange}
                        name='image'
                        required
                    ></input>
                    <label
                        htmlFor='inputFile'
                        className='w-25 d-flex justify-content-between'
                    >Attach File <img src={FileIcon}></img> </label>
                </div>
                <div>
                    <input 
                        placeholder='Price' 
                        type='number'
                        className='w-100'
                        onChange={handleChange}
                        name='price'
                        required
                    ></input>
                </div>

                
                <div className='d-flex justify-content-end mt-5'>
                    <button className='fw-bold w-25'
                    type='submit'
                    >Save</button>
                </div>
               
            </form>
        </div>
    )
}

export default AddProduct