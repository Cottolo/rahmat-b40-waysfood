import React, { useContext, useEffect, useState } from 'react'
import FileIcon from '../Pictures/file.png'
import MapIcon from '../Pictures/map icon.png';
import Modal from 'react-bootstrap/Modal';
import MyLocation from '../Pictures/my location.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { API } from '../config/api';

function EditeProfile() {
    const [modalShow, setModalShow] = React.useState(false);
    const { id } = useParams()
    const [preview, setPreview] = useState(null)

    let { data: editePartner } = useQuery("editePartnerCache", async () => {
        const response = await API.get("/user/" + id);
        return response.data.data;
    });

    const [form, setForm] = useState({
        name: '',
        email: '',
        image: null,
        phone: 0,
    })

    useEffect(() => {
        if (editePartner) {
            setPreview(editePartner.image);
            setForm({
                ...form,
                name: editePartner.name,
                email: editePartner.email,
                phone: editePartner.phone,
            });
        }

    }, [editePartner]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
        })

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }
    
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData();
            if (form.image) {
                formData.set("image", form?.image[0], form?.image[0]?.name)
            } else if (preview) {
                formData.set("image", preview)
            }
            formData.set("name", form.name);
            formData.set("email", form.email);
            formData.set("phone", form.phone);

            console.log(formData);

            const response = await API.patch("/user/" + editePartner.id, formData);

            navigate("/profile-partner/" + id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='formEdite pt-5 width-restaurant mx-auto'>
            <h2 className='mb-5'>Edite Profile</h2>
            {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "200px",
                      maxHeight: "250px",
                      objectFit: "cover",
                    }}
                    alt=""
                  />
                </div>
              )}
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='d-flex justify-content-between'>
                    <input
                        className='w-70 '
                        placeholder='Full Name'
                        onChange={handleChange}
                        value={form?.name}
                        name='name'
                        type='text'
                        autoFocus
                    ></input>
                    <input
                        id='inputFile'
                        hidden
                        type='file'
                        onChange={handleChange}
                        name='image'
                    ></input>
                    <label
                        htmlFor='inputFile'
                        className='w-25 d-flex justify-content-between'
                    >Attach File <img src={FileIcon}></img> </label>
                </div>
                <div>
                    <input placeholder='Email' type='email'
                        value={form?.email}
                        onChange={handleChange}
                        name='email'    
                        className='w-100'
                    ></input>
                </div>
                <div>
                    <input placeholder='Phone' 
                        onChange={handleChange}
                        value={form?.phone}
                        name='phone'
                        type='number'
                        className='w-100'
                    ></input>
                </div>
                <div className='d-flex justify-content-between'>
                    <input placeholder='Location' type='text'
                        className='w-70'
                    ></input>
                    <button
                        className='mapBtn w-25 fw-bold'
                        onClick={()=> setModalShow(true)}
                    >Select On Map <img src={MapIcon}></img></button>
                </div>
                <div className='d-flex justify-content-end mt-5'>
                    <button type='submit' className='fw-bold w-25'>Save</button>
                </div>
            </form>

            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <img src={MyLocation}></img>
            </Modal>

        </div>
    )
}

export default EditeProfile;