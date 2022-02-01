import React from "react";
import "./CTA.scss";

import NextIcon from "../../assets/next.svg";

function Level1CTA({ onClick, text, icon, disabled }) {
  return (
    <div
      onClick={() => onClick()}
      className={`${
        !disabled ? "cursor-pointer" : "pointer-events-none opacity-50 z-10"
      }`}
    >
      <div className="cta_main_level1_button cursor-pointer">
        <div className="cta_main_level1_button_text">{text}</div>
        {icon && (
          <img
            className="cta_main_level1_button_icon"
            src={NextIcon}
            alt="next icon"
          />
        )}
      </div>
    </div>
  );
}

export default Level1CTA;
