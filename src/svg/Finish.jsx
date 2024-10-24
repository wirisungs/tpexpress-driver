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
      fill="#C4C4C4"
      fillRule="evenodd"
      d="M16.325 4.006a3.5 3.5 0 0 0-4.65 0l-8.95 7.956a1.167 1.167 0 1 0 1.55 1.744l.392-.348v6.552c0 1.035 0 1.926.095 2.64.103.764.335 1.497.93 2.092.594.594 1.327.826 2.092.93.714.095 1.605.095 2.64.095h7.153c1.034 0 1.925 0 2.639-.096.764-.103 1.498-.335 2.092-.93.595-.594.827-1.327.93-2.092.095-.713.095-1.604.095-2.639v-6.553l.392.349a1.167 1.167 0 0 0 1.55-1.744l-8.95-7.956ZM14 18.666c-.644 0-1.167.523-1.167 1.168v2.333a1.167 1.167 0 0 1-2.333 0v-2.334a3.5 3.5 0 1 1 7 0v2.334a1.167 1.167 0 1 1-2.333 0v-2.334c0-.644-.523-1.166-1.167-1.166Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
