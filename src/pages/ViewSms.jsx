import React from "react";
import { useLocation } from "react-router-dom";

function ViewSms() {
  const location = useLocation();
  const smsArray = location.state || {}; // Access passed state
  console.log(smsArray[2]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Latest SMS</h1>
      <div className="flex flex-wrap justify-between items-center">
        {smsArray?.map((sms, index) => (
          <div
            key={index}
            className="w-full sm:w-[48%] lg:w-[32%] h-[200px] p-4 border border-gray-300 rounded-lg mb-4"
          >
            <p> {sms.body} </p>
            <p> {sms.customerName} </p>
            <p className="bg-green-500/20 p-1 font-bold rounded-lg text-green-500">
              {formatDate(sms.date)}
            </p>
            {sms.address && (
              <p className="bg-green-500/20 p-1 mt-2 font-bold rounded-lg text-green-500">
                Sender: {sms.address}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewSms;
