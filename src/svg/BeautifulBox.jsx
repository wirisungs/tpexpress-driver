import * as React from "react"
import Svg, { Ellipse, Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={198}
    height={137}
    fill="none"
    {...props}
  >
    <Ellipse
      cx={70.499}
      cy={108}
      fill="#03A63C"
      fillOpacity={0.23}
      rx={70}
      ry={29}
    />
    <Path
      fill="#03A63C"
      fillOpacity={0.23}
      d="M197.501 83.5c0 19.606-32.236 35.5-72.001 35.5-39.764 0-72-15.894-72-35.5S85.737 48 125.5 48c39.765 0 72.001 15.894 72.001 35.5Z"
    />
    <Path
      fill="#03A63C"
      d="m126.295 15.78-11.76-6.172C104.212 4.19 99.05 1.482 93.498 1.482c-5.553 0-10.714 2.709-21.037 8.126l-1.892.993 52.468 29.981 23.618-11.81c-3.8-4.302-9.93-7.52-20.36-12.993ZM150.819 36.553l-23.511 11.755v17.854a4.41 4.41 0 1 1-8.82 0V52.717l-20.58 10.29v55.511c4.221-1.052 9.025-3.573 16.627-7.562l11.76-6.171c12.652-6.64 18.978-9.959 22.491-15.924 3.512-5.966 3.512-13.389 3.512-28.235v-.688c0-11.128 0-18.086-1.479-23.386ZM89.088 118.517v-55.51l-52.91-26.454c-1.48 5.299-1.48 12.257-1.48 23.385v.688c0 14.846 0 22.27 3.513 28.235s9.839 9.284 22.49 15.924l11.76 6.171c7.603 3.989 12.406 6.51 16.627 7.561ZM40.34 28.773l53.158 26.58 20.058-10.03-52.254-29.859-.601.316c-10.43 5.473-16.56 8.69-20.36 12.993Z"
    />
  </Svg>
)
export default SvgComponent
