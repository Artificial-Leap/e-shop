import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationPin, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="container">
      <div className="contact-div login-div">
        <h2>Contact Us</h2>
        <div className="contact-top">
          <div className="contact-row">
            <FontAwesomeIcon icon={faPhone} />
            <a href="#">+97 0000000000000</a>
          </div>
          <div className="contact-row">
            <FontAwesomeIcon icon={faLocationPin} />
            <a href="#">XYZ</a>
          </div>
          <div className="contact-row">
            <FontAwesomeIcon icon={faEnvelope} />
            <a href="#">XYZ@gmail.com</a>
          </div>
        </div>
        <form>
          <div className="input-div-login">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name" />
          </div>
          <div className="input-div-login">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" />
          </div>
          <div className="input-div-login">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder="Message" />
          </div>
          <button className="login">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
