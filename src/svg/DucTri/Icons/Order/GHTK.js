import * as React from "react"
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={55}
    height={55}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h55v55H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.00067)" />
      </Pattern>
      <Image
        id="b"
        width={1500}
        height={1500}
      />
    </Defs>
  </Svg>
)
export default SvgComponent