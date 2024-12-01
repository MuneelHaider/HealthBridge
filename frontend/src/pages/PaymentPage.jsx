import React, { useState } from 'react';
import axios from 'axios';

// Importing images from the assets folder
import RazorpayLogo from '../assets/pngwing.com.png';
import StripeLogo from '../assets/Stripe_icon_-_square.svg';

const PaymentPage = () => {
    const [selectedGateway, setSelectedGateway] = useState('razorpay');
    const [loading, setLoading] = useState(false);

    const appointmentId = '1234567890'; // Hardcoded appointment ID for testing

    const handlePayment = async () => {
        setLoading(true);

        try {
            if (selectedGateway === 'razorpay') {
                const { data } = await axios.post('http://localhost:5000/api/payment/razorpay', { appointmentId });
                const { order } = data;

                const options = {
                    key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'your-razorpay-test-key',
                    amount: order.amount,
                    currency: order.currency,
                    name: 'HealthBridge',
                    description: 'Appointment Payment',
                    order_id: order.id,
                    handler: async (response) => {
                        const verifyData = { razorpay_order_id: response.razorpay_order_id };
                        const verifyResponse = await axios.post('http://localhost:5000/api/payment/verify-razorpay', verifyData);

                        if (verifyResponse.data.success) {
                            alert('Payment Successful!');
                        } else {
                            alert('Payment Verification Failed!');
                        }
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else if (selectedGateway === 'stripe') {
                const { data } = await axios.post('http://localhost:5000/api/payment/stripe', { appointmentId });
                window.location.href = data.session_url; // Redirect to Stripe payment page
            }
        } catch (error) {
            console.error(error);
            alert('Payment Failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full">
                <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Secure Payment
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Complete your appointment payment using one of the trusted gateways below.
                </p>

                {/* Payment Gateway Selection */}
                <div className="space-y-4 mb-8">
                    <div
                        onClick={() => setSelectedGateway('razorpay')}
                        className={`p-4 rounded-lg cursor-pointer border-2 ${
                            selectedGateway === 'razorpay'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200'
                        } hover:shadow-lg transition`}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                                {/* Razorpay Logo */}
                                <img
                                    src={RazorpayLogo}
                                    alt="Razorpay"
                                    className="w-8 h-8"
                                />
                            </div>
                            <span className="text-gray-800 font-medium">Razorpay</span>
                        </div>
                    </div>
                    <div
                        onClick={() => setSelectedGateway('stripe')}
                        className={`p-4 rounded-lg cursor-pointer border-2 ${
                            selectedGateway === 'stripe'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200'
                        } hover:shadow-lg transition`}
                    >
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                                {/* Stripe Logo */}
                                <img
                                    src={StripeLogo}
                                    alt="Stripe"
                                    className="w-8 h-8"
                                />
                            </div>
                            <span className="text-gray-800 font-medium">Stripe</span>
                        </div>
                    </div>
                </div>

                {/* Pay Now Button */}
                <button
                    onClick={handlePayment}
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition shadow-lg"
                >
                    {loading ? 'Processing...' : 'Pay Now'}
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
