import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Brain, Code2, Globe, Palette, ShoppingCart, Smartphone } from "lucide-react";
import { LogoMark } from "../ui/Logo";

const ORBIT = [
  { Icon: Code2, angle: -90, label: "Development" },
  { Icon: ShoppingCart, angle: -30, label: "E-commerce" },
  { Icon: Brain, angle: 30, label: "AI" },
  { Icon: Palette, angle: 90, label: "Design" },
  { Icon: Smartphone, angle: 150, label: "Responsive" },
  { Icon: Globe, angle: 210, label: "Web" },
];

/** Decorative technology visual: orbiting service icons around the L&R logo with a subtle 3D tilt. */
export default function HeroVisual() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-[420px]"
      aria-hidden="true"
    >
      <motion.div
        style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
        className="relative h-full w-full"
      >
        {/* glow */}
        <div className="absolute inset-[12%] rounded-full bg-brand/40 blur-3xl" />

        {/* outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-line/70"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {ORBIT.map(({ Icon, angle, label }) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <div
                key={label}
                className="absolute"
                style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}
              >
                <motion.div
                  className="glass -translate-x-1/2 -translate-y-1/2 rounded-2xl p-3 shadow-glow"
                  animate={reduce ? undefined : { rotate: -360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <Icon className="h-6 w-6 text-brand-light" />
                </motion.div>
              </div>
            );
          })}
        </motion.div>

        {/* inner ring */}
        <div className="absolute inset-[18%] rounded-full border border-line/50" />
        <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-brand/30 to-accent/20 blur-sm" />

        {/* centre logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
          <div className="rounded-full p-2 shadow-glow ring-4 ring-white/10">
            <LogoMark size={150} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
