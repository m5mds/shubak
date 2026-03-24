export function WindowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="16"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M9 1V17" stroke="currentColor" strokeWidth="1.5" />
      <path d="M1 9H17" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
