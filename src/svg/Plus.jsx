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
      stroke="#5DC061"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.667 13h16.666M13 4.667v16.666"
    />
  </Svg>
)
export default SvgComponent
