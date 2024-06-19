import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopNav from '../components/TopNav';
import MiddleNav from '../components/MiddleNav';
import MainNav from '../components/MainNav';
import Footer from '../components/Footer';

function Cart() {
  const initialCartItems = [
    {
      id: 1,
      name: 'Radish Pink Microgreen Seeds',
      price: 150,
      quantity: 2,
      image: 'https://t3.ftcdn.net/jpg/06/25/41/12/240_F_625411283_dlpdiRmZxoptmfMX1NNh6jmIv4t3pwK3.jpg',
    },
    {
      id: 2,
      name: 'Broccoli Microgreen Seeds',
      price: 300,
      quantity: 1,
      image: 'https://t3.ftcdn.net/jpg/06/66/74/62/240_F_666746258_1AXo03QTBbKAZi6WFDnb3msBkTLIObqk.jpg',
    },
    {
      id: 3,
      name: 'Radish White Microgreen seeds',
      price: 200,
      quantity: 3,
      image: 'https://t3.ftcdn.net/jpg/06/99/07/80/240_F_699078038_KP59bO8zGU2U19722SParQzr87yyoVDQ.jpg',
    },
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (itemId, operation) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === itemId
          ? {
              ...item,
              quantity:
                operation === 'increment'
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const handleRemoveItem = itemId => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.id !== itemId)
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = 300; // Example discount
  const deliveryCharges = 300; // Example delivery charges

  const totalBeforeDiscount = subtotal;
  const totalAfterDiscount = totalBeforeDiscount - discount - deliveryCharges;

  return (
    <>
      <TopNav />
      <MiddleNav />
      <MainNav />
      <div className="container my-5">
        <h1 className="text-success mb-4 text-center ">
          <i className="fas fa-shopping-cart me-2"></i> Cart
        </h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-muted">No items in the cart</p>
            <Link to={'/allproducts'}>
              <button className="btn btn-success">
                <i className="fas fa-plus me-2"></i>Add Items
              </button>
            </Link>
          </div>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {cartItems.map(item => (
                <div key={item.id} className="card mb-3 border-success p-3 shadow">
                  <div className="row g-0">
                    <div className="col-md-4 col-5 d-flex align-items-center ">
                      <img
                        src={item.image}
                        className="img-fluid rounded"
                        alt={item.name}
                      />
                    </div>
                    <div className="col-md-8 col-7">
                      <div className="card-body">
                        <h5 className="card-title text-success">{item.name}</h5>
                        <p className='text-muted'>Microgreen</p>
                        <p className="card-text fw-bold ">₹{item.price}</p>
                        <span className='m-1 text-muted text-decoration-line-through'>₹999</span>
                        <span className='text-success fw-bold bg-success-subtle p-1'>70% off</span>
                        <div className="d-flex align-items-center justify-content-between mt-3">
                          <div className="d-flex justify-content-center align-items-center ">
                            <button
                              className="btn btn-outline-success rounded-circle"
                              onClick={() => handleQuantityChange(item.id, 'decrement')}
                              disabled={item.quantity === 1}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <span className="mx-3 fw-bold">{item.quantity}</span>
                            <button
                              className="btn btn-outline-success rounded-circle"
                              onClick={() => handleQuantityChange(item.id, 'increment')}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        <div>
                          <button
                            className="btn btn-outline-danger rounded-pill ms-2 "
                            onClick={() => handleRemoveItem(item.id)}
                          ><i className="fas fa-trash"></i></button>
                        </div>
                        </div>
                         
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="card bg-light border-success shadow">
                <div className="card-body">
                  <h5 className="card-title text-success">
                    <i className="fas fa-receipt me-2"></i>Order Summary
                  </h5>
                  <div>
                    <p>Price: ₹{subtotal.toFixed(2)}</p>
                    <p>Discount: ₹{discount}</p>
                    <p>Delivery Charges: ₹{deliveryCharges}</p>
                    <hr />
                    <p className="card-text fw-bold">
                      Total Amount: ₹{totalAfterDiscount.toFixed(2)}
                    </p>
                  </div>
                  <Link to={'/checkout'}>
                    <button className="btn btn-success mt-3">
                      <i className="fas fa-shopping-cart me-2"></i>Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;