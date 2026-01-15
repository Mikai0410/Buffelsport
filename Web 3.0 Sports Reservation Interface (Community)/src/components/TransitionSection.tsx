import { motion } from 'motion/react';

export function TransitionSection() {
  return (
    <div className="relative h-16 overflow-hidden bg-gradient-to-b from-[#163c94] via-blue-400 to-white">
      {/* Subtle decorative grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
    </div>
  );
}