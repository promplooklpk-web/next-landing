interface LogoProps {
  size?: number;
  className?: string;
}

/** Minimal geometric mark: rounded tile + car silhouette + LC monogram hint */
export function Logo({ size = 28, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        className="fill-surface-raised"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M7 19.5h18l-1.75-4.25H17l-1.6-3.2h-5.1L9 15.25H7v4.25z"
        className="fill-accent"
      />
      <circle cx="10.5" cy="19.5" r="2.25" className="fill-background" />
      <circle cx="21.5" cy="19.5" r="2.25" className="fill-background" />
      <path
        d="M11.2 11.2h2.1l0.9 1.8h-2.4l-0.6-1.8zM18.7 11.2h2.1l-0.6 1.8h-2.4l0.9-1.8z"
        className="fill-foreground"
        opacity="0.85"
      />
    </svg>
  );
}
