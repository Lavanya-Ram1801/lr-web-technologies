import { Link } from "react-router-dom";

interface Props {
  size?: number;
  showText?: boolean;
  to?: string | null;
}

/**
 * The official L&R logo, shown unmodified (only clipped to its own circle
 * so the white file background never shows as a square on dark themes).
 */
export function LogoMark({ size = 44, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/images/logo.png"
      alt="L&R Web Technologies logo"
      width={size}
      height={size}
      className={`shrink-0 rounded-full bg-white object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

export default function Logo({ size = 44, showText = true, to = "/" }: Props) {
  const inner = (
    <span className="flex items-center gap-3">
      <LogoMark size={size} />
      {showText && (
        <span className="hidden font-display text-base font-bold leading-tight text-ink min-[420px]:block">
          L&amp;R <span className="text-brand">Web Technologies</span>
        </span>
      )}
    </span>
  );
  if (to === null) return inner;
  return (
    <Link to={to} aria-label="L&R Web Technologies – home">
      {inner}
    </Link>
  );
}
