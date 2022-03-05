import React, { forwardRef } from "react"
import clsx from "clsx"
export default forwardRef(function Button(props, ref) {
  const {
    type = "Primary",
    as = "Button",
    children,
    className,
    href = "#",
    btnType = "button",
    ...rest
  } = props
  if (as === "link") {
    return (
      <>
        <a
          href={href}
          ref={ref}
          {...rest}
          className={clsx({
            "leading-tight text-grey5 tracking-wider uppercase text-gray5 px-4 text-14 font-semibold rounded-sm": true,
            "bg-lightBlue h-10 hover:bg-veryLightBlue border-3 border-veryLightBlue":
              type === "Primary",
            "border-2 border-lightBlue h-10": type === "Outline",
            [className]: className,
          })}
        >
          {children}
        </a>
      </>
    )
  }
  return (
    <>
      <button
        ref={ref}
        type={btnType}
        {...rest}
        className={clsx({
          "leading-tight text-grey5 tracking-wider uppercase text-gray5 px-4 text-14 font-semibold rounded-sm": true,
          "bg-lightBlue h-10 hover:bg-veryLightBlue border-3 border-veryLightBlue":
            type === "Primary",
          "border-2 border-lightBlue h-10": type === "Outline",
          [className]: className,
        })}
      >
        {children}
      </button>
    </>
  )
})
