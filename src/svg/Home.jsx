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
      fillRule="evenodd"
      d="M2.624 8.149c-.54.988-.54 2.18-.54 4.564v1.584c0 4.063 0 6.095 1.22 7.357 1.22 1.263 3.184 1.263 7.113 1.263h4.167c3.928 0 5.892 0 7.112-1.263 1.22-1.262 1.22-3.294 1.22-7.357v-1.584c0-2.384 0-3.576-.54-4.564s-1.529-1.601-3.505-2.828l-2.083-1.293c-2.09-1.296-3.134-1.944-4.288-1.944-1.154 0-2.198.648-4.287 1.944L6.129 5.321C4.153 6.548 3.165 7.161 2.624 8.15Zm6.751 9.82a.781.781 0 0 0 0 1.562h6.25a.781.781 0 0 0 0-1.562h-6.25Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
