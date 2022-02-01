import "./Footer.scss";

function Footer({ vesting, centered }) {
  return (
    <footer
      className={`${vesting ? "footerVesting" : "footer"} ${
        centered ? "centered" : "notcentered"
      }`}
    >
      <div className="footer_text">© 2021 CapX All rights reserved.</div>
    </footer>
  );
}

export default Footer;
