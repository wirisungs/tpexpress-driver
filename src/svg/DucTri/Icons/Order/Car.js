import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CarIC = ({ color = "#2FA087" }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
  >
    <Path
      fill={color}
      d="M25.538 13.475 23.532 9.45a2.333 2.333 0 0 0-2.089-1.284h-1.61V7A2.333 2.333 0 0 0 17.5 4.667H4.667A2.333 2.333 0 0 0 2.333 7v11.666A2.333 2.333 0 0 0 4.667 21h1.376a3.5 3.5 0 0 0 6.58 0h2.754a3.5 3.5 0 0 0 6.58 0h1.376a2.333 2.333 0 0 0 2.334-2.334V14a1.168 1.168 0 0 0-.129-.525ZM9.333 21a1.167 1.167 0 1 1 0-2.333 1.167 1.167 0 0 1 0 2.333Zm9.334 0a1.167 1.167 0 1 1 0-2.334 1.167 1.167 0 0 1 0 2.334Zm4.666-2.334h-1.365v-.093a4.418 4.418 0 0 0-.198-.408l-.128-.245a3.847 3.847 0 0 0-.385-.479.938.938 0 0 0-.152-.151 3.84 3.84 0 0 0-.478-.385l-.245-.129-.409-.198h-.093V10.5h1.622l1.831 3.78v4.386Z"
    />
  </Svg>
);

export default CarIC;
