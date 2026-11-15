import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

export type ButtonVariant = "primary" | "hero" | "outline" | "secondary" | "whatsapp" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Internal route */
  to?: string;
  /** Route state, e.g. contact form pre-fill */
  state?: unknown;
  /** External URL (opens in a new tab securely) */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

const base =
  "btn-shine inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] text-white shadow-glow hover:brightness-110",
  hero: "btn-hero shadow-lg",
  outline: "border border-ink/30 text-ink hover:border-brand hover:bg-brand/10",
  secondary: "bg-muted text-ink hover:bg-line/60",
  whatsapp: "bg-[#25D366] text-[#053b1c] shadow-lg hover:brightness-105",
  ghost: "text-ink hover:bg-brand/10",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  to,
  state,
  href,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
  icon,
  fullWidth,
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`;
  const content = (
    <>
      {icon}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} state={state} className={cls} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={ariaLabel} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
