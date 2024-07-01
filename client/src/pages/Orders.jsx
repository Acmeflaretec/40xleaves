import React,{useState,useEffect} from 'react'
import axiosInstance from '../axios'
import TopNav from '../components/TopNav'
import MiddleNav from '../components/MiddleNav'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


function Orders() {
  const [ordersData,setOrdersData] = useState([])
  const navigate = useNavigate();


const fetchOrderData  = async()=>{

  try {
    const response = await axiosInstance.get(`/api/v1/orders/getuserorders`)
    setOrdersData(response.data.data)
    //console.log('order :',response.data.data)
  } catch (error) {
    
  }
}


useEffect(()=>{
fetchOrderData()
},[])

  return (
    <div>
      <TopNav/>
      <MiddleNav/>
      <MainNav/> 
<div className="mt-5">

{
ordersData.map((item)=>(

  <Link to={`/ordertrack/${item._id}`}>
  <div className='container p-2 d-none d-md-block text-dark'>
    <div className='p-1 d-flex justify-content-around align-items-center shadow border mb-3'>
        <div className='d-flex align-items-center '>
            <img src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" width={200} alt="" />
           <div>
{item.products.item.map((prod,index)=>(
                <h6 className='fw-bold'> {index+1} . {prod.product_id.name}</h6>


))
                }
                {/* <p className='text-muted'>category</p> */}
           </div>
        </div>
        <div>
           <h6 className='fw-bold '>Total : ₹{item.amount}</h6>
        </div>
        <div>
        <h6 className='fw-bold'>order placed</h6>
        <p>you order has been {item.status} </p>
        </div>
    </div>
  </div>
</Link>

))

      }

</div>
    {
ordersData.map((item)=>(

  <Link to={'/ordertrack'}>
  <div className='container d-md-none mt-2 text-dark '>
    <div className='p-3 shadow border mb-3'>
      <div className='d-flex align-items-center'>
        <img src="https://t4.ftcdn.net/jpg/06/44/13/05/240_F_644130539_sjQPCYRXepzDmDvdFZ8juoeBTWiUxRfj.jpg" width={150} alt="" />
        <div>


        {item.products.item.map((prod,index)=>(
                <h6 className='fw-bold'> {index+1} . {prod.product_id.name}</h6>


))
}


<h6 className='fw-bold'>order placed</h6>

          <p><span className='fw-bold'>Order placed:</span> <br /> Your order has been {item.status}</p>
        </div>
      </div>
    </div>
    
  </div>
</Link>

))


    }
     
     
      <Footer/>
    </div>
  )
}

export default Orders