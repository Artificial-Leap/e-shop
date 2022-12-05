import React, { useState } from "react";
import { ethers } from "ethers";
import { DESTINATION_ETHEREUM_ADDRESS } from "../constants";

const CryptoPayment = (props) => {
  const [error, setError] = useState("");

  const startPayment = async (event) => {
    setError("");
    event.preventDefault();

    try {
      if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
      }

      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      ethers.utils.getAddress(DESTINATION_ETHEREUM_ADDRESS);

      const transactionResponse = await signer.sendTransaction({
        to: DESTINATION_ETHEREUM_ADDRESS,
        value: ethers.utils.parseEther(props.amount.toString()),
      });

      console.log({ transactionResponse });
    } catch (error) {
      console.log({ error });
      setError(error.message);
    } finally {
      console.log("transaction done");
      props.payment_done()
    }
  };

  return (
    <div className="m-5 p-5 card shadow text-center">
      <button className="col-12 btn btn-primary" onClick={startPayment}>
        Send Payment
      </button>

      {error && (
        <div className="alert alert-danger" role="alert">
          {JSON.stringify(error)}
        </div>
      )}
    </div>
  );
};

export default CryptoPayment;
