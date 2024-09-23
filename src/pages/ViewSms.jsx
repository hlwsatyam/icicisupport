import React from "react";
import { useLocation } from "react-router-dom";

function ViewSms() {
  const location = useLocation();
  const smsArray = location.state || {}; // Access passed state
 
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All User SMS</h1>
      <div className="flex justify-between flex-wrap  items-center">
        {smsArray?.map((sms, index) => (
          <div className="w-[33%]  p-4 border border-gray-300 rounded-lg mb-4 ">
            <p> {sms.body} </p>
            <p> {sms.customerName} </p>
            <p className="bg-green-500/20 p-1 rounded-lg text-green-500">
              {" "}
              {sms.service_center}{" "}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewSms;
