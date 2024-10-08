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
      fill="#EB455F"
      d="m23.937 5.909-2.667-1.4c-2.34-1.228-3.51-1.842-4.77-1.842-1.259 0-2.43.614-4.77 1.842l-.43.225 11.898 6.799 5.356-2.678c-.862-.976-2.252-1.705-4.617-2.946ZM29.498 10.62l-5.331 2.665v4.048a1 1 0 0 1-2 0v-3.048L17.5 16.618v12.587c.957-.238 2.046-.81 3.77-1.714l2.667-1.4c2.869-1.505 4.303-2.258 5.1-3.61.796-1.353.796-3.037.796-6.403v-.156c0-2.523 0-4.101-.335-5.303ZM15.5 29.205V16.618L3.502 10.619c-.335 1.202-.335 2.78-.335 5.303v.156c0 3.366 0 5.05.796 6.402.797 1.353 2.231 2.106 5.1 3.611l2.667 1.4c1.723.904 2.813 1.476 3.77 1.714ZM4.446 8.855 16.5 14.882l4.548-2.274L9.2 5.838l-.136.07C6.698 7.15 5.308 7.88 4.446 8.856Z"
    />
  </Svg>
)
export default SvgComponent
