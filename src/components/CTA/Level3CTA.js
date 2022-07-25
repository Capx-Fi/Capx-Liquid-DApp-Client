import React from "react";
import "./CTA.scss";

import NextIcon from "../../assets/next.svg";

function Level3CTA({ onClick, text, icon, disabled, fullWidth, svgIcon }) {
  return (
    <div
      onClick={() => onClick()}
      className={`${
        !disabled ? "cursor-pointer" : "pointer-events-none opacity-50 z-10"
      }`}
    >
      <div
        className={`cta_main_level3_button ${
          fullWidth ? "w-full" : "w-fit-content"
        }`}
      >
        {svgIcon && svgIcon}
        <div className="cta_main_level3_button_text">{text}</div>
        {icon && (
          <img
            className="cta_main_level3_button_icon"
            src={NextIcon}
            alt="next icon"
          />
        )}
      </div>
    </div>
  );
}

export default Level3CTA;
