import React, { useState } from "react";

const Otp = () => {
  const [Mail, setMail] = useState("Mail");
  const [Verif, setVerif] = useState("");
  const [ShowOtpInput, setShowOtpInput] = useState(false);
  const [Valid, setValid] = useState(true);

  //   Gernartor Code

  const code = Math.floor(Math.random() * 90000);

  const handleMail = (e) => {
    e.preventDefault();
    setShowOtpInput(true);
    
  };

  const handleVerif = (e) => {
    e.preventDefault();
    if (code === Verif) {
      setValid(false);
    }
  };
  return (
    <div className="Otp-Container">
      {!ShowOtpInput ? (
        <form onSubmit={handleMail}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setMail(e.target.value);
            }}
          />
          <button type="submit">Send Otp Code</button>
        </form>
      ) : (
        <div className="Input-Otp">
          {Valid ? (
            <form onSubmit={handleVerif}>
              <h3>Enter Otp send to {Mail}</h3>
              <input
                type="text"
                placeholder="please Write the code "
                onChange={(e) => {
                  setVerif(e.target.value);
                }}
              />
              <button type="submit">Verification</button>
            </form>
          ) : (
            <h1>Valid</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Otp;
