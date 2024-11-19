import * as React from "react"
import Svg, { Path, Rect, Defs, Pattern, Use, Image } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={120}
    height={120}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M0 12C0 5.373 5.373 0 12 0h96c6.627 0 12 5.373 12 12v96c0 6.627-5.373 12-12 12H12c-6.627 0-12-5.373-12-12V12Z"
    />
    <Rect width={32} height={32} x={97} y={100} fill="#EB455F" rx={16} />
    <Path
      fill="#FCEDEE"
      d="m112.65 119.594 4.314-4.314a6.014 6.014 0 0 1-1.94-1.304 6.014 6.014 0 0 1-1.304-1.94l-4.314 4.314c-.337.337-.505.505-.65.691a3.77 3.77 0 0 0-.436.706c-.102.213-.177.438-.328.89l-.793 2.382a.619.619 0 0 0 .782.783l2.382-.794c.452-.151.677-.226.89-.327.251-.12.488-.266.707-.437.185-.145.353-.313.69-.65ZM118.161 114.082a2.294 2.294 0 1 0-3.244-3.244l-.517.518.022.065c.19.547.547 1.263 1.221 1.936a5.097 5.097 0 0 0 1.936 1.221l.065.022.517-.518Z"
    />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.00111)" />
      </Pattern>
      <Image
        id="b"
        width={900}
        height={900}
      />
    </Defs>
  </Svg>
)
export default SvgComponent