import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import '../Styles/Style.css';
import Header from '../components/Header';
import {Restaurant} from '../components/RestaurantPopular';
import {RestaurantNear} from '../components/RestaurantNear';

function Home() {
  return (
    <div className='d-grid bg-light'>
      <Header/>
      <Restaurant/>
      <RestaurantNear/>
    </div>
  );
}

export default Home;
