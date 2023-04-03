import "./Footer.scss";

function Footer({ vesting, centered }) {
  return (
    <footer
      className={`${"footer"} ${
        centered ? "centered" : "notcentered"
      } z-30 text-primary-green-100`}
    >
      <div className="footer_text">© 2023 Powered by CapX All rights reserved.</div>
    </footer>
  );
}

export default Footer;
