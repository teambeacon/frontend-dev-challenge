import * as React from "react"

const SvgComponent = (props) => (
  <svg
    width={18}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13 7.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Zm-.976 5.982a7.5 7.5 0 1 1 1.42-1.408l4.23 4.23a1 1 0 0 1-1.414 1.414l-4.236-4.236Z"
      fill="#6023E5"
    />
  </svg>
)

export default SvgComponent
