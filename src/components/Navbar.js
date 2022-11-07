import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Icon from '../Pictures/Icon.png';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Cart from '../Pictures/cart.png';
import BlankProfile from '../Pictures/blank profile.jpg';
import User2 from '../Pictures/user2.png';
import Logout from '../Pictures/logout.png';
import LineD from '../Pictures/LineD.png';
import Polygon from '../Pictures/Polygon.png';
import { Link, useNavigate } from 'react-router-dom';
import ProdukIcon from '../Pictures/produk.png'
import { useMutation, useQuery } from 'react-query';
import { API, setAuthToken } from '../config/api';
import { Alert } from "react-bootstrap";
import { UserContext } from '../context/userContext';

function AdminPage(props) {

  const [state, dispatch] = useContext(UserContext)
  const navigate = useNavigate()

  const { data: userData } = useQuery("userCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  const handleAddProduct = (e) => {
    e.preventDefault()
    navigate("/add-product/" + state.user.id)
  }

  const [open, setOpen] = useState(false)
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <Navbar className='bg-yellow vh-nav' expand="lg">
      <Container fluid className="mx-5">
        <Nav>
          <Navbar.Brand >
            <Link
              to="/"
            >
              <img
                src={Icon}
                width=""
                height=""
                className="d-inline-block align-top"
                alt="React Bootstrap logo"></img>
            </Link>
          </Navbar.Brand>
        </Nav>
        <Nav >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

          {userData?.map((item) => (
              item.id == state.user.id? 

            <div className='' ref={menuRef}>
              <div className='dropdownHandle'>
                <img className='menuTrigger rounded-circle'
                  onClick={() => setOpen(!open)}
                  src={item?.image == "http://localhost:5000/uploads/"? BlankProfile: item?.image} alt='Profile'></img>
              </div>
              <div className={`${open ? 'activeDD' : 'inactiveDD'}`}>
                <img src={Polygon} className='polygon '></img>
                <div className='dropdownMenu me-4 rounded-2 py-3' >
                  <ul className='ul ps-0 '>
                    <li
                      style={{cursor:"pointer"}}
                      onClick={()=> navigate(`/profile-partner/${item?.id}`)}
                      className='ms-3'>
                      <img
                        src={User2}></img>
                        <a href='' className='a ms-3 fw-bold'>Profile Partner</a>
                    </li >
                    <li
                      className='ms-3 mt-3'
                      style={{cursor:"pointer"}}
                      onClick={handleAddProduct}
                    >
                      <img
                        src={ProdukIcon}></img>
                        <a  className='a fw-bold ms-3'>Add Product</a>
                    </li>
                    <img className='w-100 my-3' src={LineD}></img>
                    <li className='ms-3 '>
                      <img
                        src={Logout}></img>
                      <a href=''
                        onClick={props.logout}
                        className='a ms-3 fw-bold '>
                        <Link className='a' to="/">
                          Logout
                        </Link>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
             : null
             )
             )}
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
}

function PrivatePage(props) {

  const [state, dispatch] = useContext(UserContext)
  const navigate = useNavigate()

  const { data: userData } = useQuery("userDataCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  const handleCart = (e) => {
    e.preventDefault()
    navigate("/cart/" + state.user.id)
  }

  const [open, setOpen] = useState(false)
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <Navbar className='bg-yellow vh-nav' expand="lg">

      {props.order > 0 ? (
        <p className='cartItem'
        >{props.order}</p>
      ) : (
        <div></div>
      )}

      <Container fluid className="mx-5">
        <Nav>
          <Navbar.Brand >
            <Link
              to="/"
            >
              <img
                src={Icon}
                width=""
                height=""
                className="d-inline-block align-top"
                alt="React Bootstrap logo"></img>
            </Link>
          </Navbar.Brand>
        </Nav>
        <Nav >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div onClick={handleCart}>
              <img className='cart me-4' src={Cart} alt='cart'></img>
            </div>

            {userData?.map((item) => (
              item.id == state.user.id? 

                <div className='' ref={menuRef}>
                  <div className='dropdownHandle'>

                    <img className='menuTrigger rounded-circle'
                      onClick={() => setOpen(!open)}
                      src={item?.image == "http://localhost:5000/uploads/"? BlankProfile: item?.image} 
                      alt='Profile'></img>

                  </div>
                  <div className={`${open ? 'activeDD' : 'inactiveDD'}`}>
                    <img src={Polygon} className='polygon '></img>
                    <div className='dropdownMenu   me-4 rounded-2 py-3' >
                      <ul className='ul ps-0 '>
                        <li
                          className='ms-5'>
                          <div
                            className='a'
                            onClick={()=> navigate(`/profile/${item?.id}`)}
                          >
                            <img
                              src={User2}></img>
                            <a href='' className='a ms-3 fw-bold'>Profile </a>
                          </div>
                        </li >
                        <img className='w-100 my-3' src={LineD}></img>
                        <li className='ms-5 '>
                          <img src={Logout}></img>
                          <a href=''
                            className='a ms-3 fw-bold '
                            onClick={props.logout}>
                            <Link
                              className='a'
                              to="/">
                              Logout
                            </Link>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> 
                </div>
                : null
                )
                )}
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
}

function GuestPage(props) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showL, setShowL] = useState(false);
  const handleCloseL = () => setShowL(false);
  const handleShowL = () => setShowL(true);

  const [message, setMessage] = useState(null)
  const [loginMessage, setLoginMessage] = useState(null)

  const [formRegister, setFormRegister] = useState({
    email: '',
    password: '',
    name: '',
    gender: '',
    phone: '',
    role: '',
  });

  // const {email,password,name,gender,phone,role} = formRegister;

  const handleChange = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRegister = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', formRegister);
      const alert = (
        <Alert variant="success" className="py-3">
          Success to regiter!
        </Alert>
      );
      setMessage(alert)
      // Handling response here
      // console.log("ini response register", response);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-3">
          Failed to regiter!
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  const [state, dispatch] = useContext(UserContext)

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // console.log("login form :",loginForm);
  const handleOnChangeLogin = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const {id} = useNavigate()

  const handleOnSubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault()

      const response = await API.post('/login', loginForm);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data
      })

      console.log(response);

      if (response.data.data.role === "Partner") {
        navigate('/income-transaction/'+id)
      }

      const alert = (<Alert variant='success' className='fw-bold py-3'>Success to login!</Alert>)

      setLoginMessage(alert)
      setShowL(false)


    } catch (error) {
      console.log(error);
      const alert = (<Alert variant='danger' className='fw-bold py-3'>Wrong Email or Password!</Alert>)

      setLoginMessage(alert)

    }
  });

  
  return (
    <>
    <Navbar className='bg-yellow vh-nav' expand="lg">
      <Container fluid className="mx-5">
        <Nav>
          <Link
            className=''
            to="/"
          >
            <Navbar.Brand href="">
              <img
                to="/"
                src={Icon}
                width=""
                height=""
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Navbar.Brand>
          </Link>
        </Nav>
        <Nav >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="d-flex">
              <Button className="width-btn me-3 btn-dark px-4 py-1 " onClick={handleShow} >Register</Button>

              <Modal className='m-auto' show={show} onHide={handleClose}>
                <div className='p-3'>
                  {message && message}
                  <h2 className='mb-4 fw-bold text-yellow' >Register</h2>
                  <Form onSubmit={(e) => handleSubmitRegister.mutate(e)} className='' >
                    <Form.Control
                      className='mb-3 p-3'
                      type="email"
                      name='email'
                      placeholder="Email"
                      value={formRegister.email}
                      onChange={handleChange}
                      autoFocus
                      required
                    />
                    <Form.Control
                      className='mb-3 p-3'
                      type="password"
                      name='password'
                      placeholder="Password"
                      value={formRegister.password}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control
                      className='mb-3 p-3'
                      type="text"
                      value={formRegister.name}
                      name='name'
                      placeholder="Full Name"
                      onChange={handleChange}
                      required
                    />
                    <Form.Select aria-label="Default select example"
                      className='p-3 mb-3'
                      name='gender'
                      value={formRegister.gender}
                      onChange={handleChange}
                    >
                      <option hidden >Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                    <Form.Control
                      className='mb-3 p-3'
                      type="number"
                      placeholder="Phone"
                      name='phone'
                      value={formRegister.phone}
                      onChange={handleChange}
                      required
                    />
                    <Form.Select aria-label="Default select example"
                      className='p-3 mb-3'
                      value={formRegister.role}
                      name='role'
                      onChange={handleChange}
                      required>
                      <option value="User">As User</option>
                      <option value="Partner">As Partner</option>
                    </Form.Select>

                    <Button type='submit' variant="dark"
                      className='w-100 p-3 my-3'>
                      Register
                    </Button>
                  </Form>

                  <p>Already have an account ? Klik <span style={{ cursor: "pointer" }}
                    className='fw-bold'
                    onClick={() => {
                      handleClose()
                      handleShowL()
                    }}
                  >Here</span></p>


                </div>
              </Modal>
              <Button className="width-btn btn-dark px-4 py-1" onClick={handleShowL}>Login</Button>
              <Modal className='mx-auto' show={showL} onHide={handleCloseL}>
                <div className='p-3'>
                  <h2 className='mb-4 fw-bold text-yellow' >Login</h2>
                  <Form onSubmit={(e) => handleOnSubmitLogin.mutate(e)} className='' >
                    <Form.Control
                      onChange={handleOnChangeLogin}
                      value={loginForm.email}
                      name="email"
                      className='mb-3 p-3'
                      type="email"
                      placeholder="Email"
                      autoFocus
                      required
                    />
                    <Form.Control
                      onChange={handleOnChangeLogin}
                      value={loginForm.password}
                      name='password'
                      className='mb-3 p-3'
                      type="password"
                      placeholder="Password"
                      required
                    />
                    <Button variant="dark"
                      className='w-100 p-3 my-3'
                      type="submit"
                    // onClick={()=>{handleCloseL();{props.login}}}
                    // onClick={handleOnSubmit}
                    /* onClick={props.login} */
                    >
                      Login
                    </Button>
                  </Form>

                  <p>Don't have an account ? Klik <span style={{ cursor: "pointer" }}
                    className='fw-bold'
                    onClick={() => { handleShow(); handleCloseL() }}
                  >Here</span></p>


                </div>
              </Modal>
            </div>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
    </>
  );
}

function Navbars(props) {
  const [state, dispatch] = useContext(UserContext)
  const userRole = state.user.role
  // console.log(userRole);
  function setLogout() {
    dispatch({
      type: "LOGOUT",
    })

  }

  return (
    <div>
      {userRole === "Partner" ? (
        <AdminPage logout={setLogout} />
      ) : userRole === "User" ? (
        <PrivatePage order={props.orderan} logout={setLogout} />
      ) : (
        <GuestPage />
      )}
    </div>
  );
}
export default Navbars;