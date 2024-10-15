import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.fill || "#111"}
      d="M12.5 10.417a4.167 4.167 0 1 0 0-8.333 4.167 4.167 0 0 0 0 8.333ZM20.833 18.229c0 2.589 0 4.688-8.333 4.688-8.334 0-8.334-2.1-8.334-4.688 0-2.589 3.731-4.688 8.334-4.688 4.602 0 8.333 2.1 8.333 4.688Z"
    />
  </Svg>
)
export default SvgComponent
