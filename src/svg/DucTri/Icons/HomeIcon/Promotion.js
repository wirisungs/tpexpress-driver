import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
    viewBox="0 0 36 36"
  >
    <Path
      fill="url(#a)"
      fillRule="evenodd"
      d="M15.742 6h6.015c5.671 0 8.507 0 10.269 1.757 1.213 1.21 1.59 2.928 1.708 5.727.023.555.035.833-.068 1.018-.104.185-.518.416-1.346.879a2.998 2.998 0 0 0 0 5.238c.828.463 1.242.694 1.346.879.103.185.092.463.068 1.018-.117 2.799-.495 4.517-1.708 5.727C30.264 30 27.428 30 21.757 30h-6.015c-5.67 0-8.506 0-10.268-1.757-1.213-1.21-1.59-2.928-1.708-5.727-.023-.555-.035-.833.069-1.018.103-.185.517-.416 1.345-.879a2.998 2.998 0 0 0 0-5.238c-.828-.463-1.242-.694-1.345-.879-.104-.185-.092-.463-.07-1.018.119-2.799.496-4.517 1.71-5.727C7.235 6 10.071 6 15.742 6Zm8.33 6.704c.44.44.44 1.152 0 1.591l-9.023 9a1.13 1.13 0 0 1-1.595 0 1.123 1.123 0 0 1 0-1.59l9.023-9a1.13 1.13 0 0 1 1.595 0Zm-1.55 10.546c.83 0 1.504-.672 1.504-1.5s-.673-1.5-1.504-1.5c-.83 0-1.503.672-1.503 1.5s.673 1.5 1.503 1.5Zm-7.518-7.5c.83 0 1.504-.672 1.504-1.5s-.674-1.5-1.504-1.5-1.504.672-1.504 1.5.673 1.5 1.504 1.5Z"
      clipRule="evenodd"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={18.75}
        x2={18.75}
        y1={6}
        y2={30}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#F44336" />
        <Stop offset={1} stopColor="#F9801D" />
      </LinearGradient>
    </Defs>
  </Svg>
)
export default SvgComponent
