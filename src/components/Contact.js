import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import withContext from "../withContext";
import PaypalPayment from "./PaypalPayment";
import CryptoPayment from "./CryptoPayment";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { SERVER_URL } from "../constants";

export default function Contact(props) {
  useEffect(() => {
    props.useAnalyticsEventTracker("main page", "pageview", "pageview");
  }, []);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, []);

  const contact = async () => {
    setError("");

    if (!email || !email || !query) {
      setError("Please fill all the fields");
      return;
    }

    const body = {
      email,
      name,
      orderId: orderId ? orderId : "N/A",
      query,
    };

    const resp = await axios.post(SERVER_URL + "/contact", body);
    if (resp.data === "ok") {
      setError("Your query has been submitted successfully");
    }

    setEmail("");
    setName("");
    setOrderId("");
    setQuery("");
  };

  return (
    <>
      <div className="hero is-primary ">
        <div className="hero-body container">
          <h4 className="title">Contact</h4>
        </div>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-one-third">
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="field">
            <label className="label">Name</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div className="field">
            <label className="label">Order ID (Optional)</label>
            <input
              className="input"
              type="text"
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
              }}
            ></input>
          </div>
          <div className="field">
            <label className="label">Query</label>
            <textarea
              className="input"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
          {error && (
            <div className="field">
              <label className="label">{error}</label>
            </div>
          )}
          <button
            className="button is-small is-outlined is-primary   is-pulled-right"
            onClick={contact}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
