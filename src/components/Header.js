import Pizza from '../Pictures/Pizza.png';
import line from '../Pictures/line.png';

function Header() {
    return (
        <div className="py-5" style={{ backgroundColor: "#FFC700" }}>
            <div className='d-flex w-75 mx-auto '>
                <div className='me-5'>
                    <h1>Are You Hungry?</h1>
                    <h1>Express Home Delivery</h1>
                    <div className='d-flex mt-5'>
                        <img src={line} alt='line' className='mt-2 me-3' height="3px" width="200px" ></img>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                    </div>
                </div>
                <div>
                    <img src={Pizza} alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Header;