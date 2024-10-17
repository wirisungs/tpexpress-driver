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
      fill="#767676"
      d="m12.886 16.995 6.698-6.907c.418-.43.164-1.255-.386-1.255H5.803c-.55 0-.804.824-.386 1.255l6.697 6.907a.52.52 0 0 0 .772 0Z"
    />
  </Svg>
)
export default SvgComponent
