'use client';

import { motion } from 'motion/react';
import { useRef } from 'react';
import { profile } from '@/lib/content';
import { useDockWatcher, useNameDocked } from './name-dock';
import { useCalm } from './ui-mode';

const EASE = [0.16, 1, 0.3, 1] as const;
export const NAME_LAYOUT_ID = 'rk-name';
export const PHOTO_LAYOUT_ID = 'rk-photo';
export const NAME_FLIGHT = { type: 'spring', stiffness: 170, damping: 26, mass: 0.9 } as const;

/** The name as one element, so it can fly between masthead and sidebar. */
export function NameMark({ className }: { className: string }) {
  return (
    <span className={className}>
      Rahul <em className="not-italic text-accent">Khare</em>
    </span>
  );
}

/** Round portrait with its hairline ring; fills its parent box. */
export function PhotoMark() {
  return (
    <span className="relative block h-full w-full">
      <span aria-hidden className="absolute -inset-1 rounded-full border border-border-bright opacity-70" />
      {/* Static export: no image optimisation server, so a plain <img>. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={profile.photo}
        alt=""
        width={192}
        height={192}
        className="h-full w-full rounded-full object-cover object-top"
        style={{ filter: 'grayscale(10%) contrast(1.04)' }}
      />
    </span>
  );
}

/**
 * Full-width name header. On desktop, once it scrolls away, the name flies
 * into the sidebar (shared layoutId); scrolling back up returns it here. An
 * invisible copy always holds the header's height so nothing below jumps.
 */
export function Masthead() {
  const calm = useCalm();
  const docked = useNameDocked();
  const slot = useRef<HTMLHeadingElement>(null);
  useDockWatcher(slot);

  const rise = (i: number) =>
    calm
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.05 + i * 0.08, ease: EASE },
        };
  const big =
    'block font-serif text-[clamp(3.4rem,11vw,9.5rem)] font-normal leading-[0.9] tracking-tight text-heading';

  return (
    <header className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="bold-glow pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1560px] px-6 pb-12 pt-16 md:px-12 md:pb-16 md:pt-24 lg:pl-10 lg:pr-12 xl:pl-16 xl:pr-20">
        <motion.div
          {...rise(0)}
          data-motion
          className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
        >
          {profile.role}
        </motion.div>

        <motion.div {...rise(1)} data-motion className="relative mt-6 flex items-center gap-4 md:gap-5">
          {/* Portrait: flies to the sidebar with the name. The box keeps its size. */}
          <div
            role="img"
            aria-label={`${profile.name}, ${profile.role}`}
            className="relative h-20 w-20 shrink-0 sm:h-28 sm:w-28 lg:h-36 lg:w-36"
          >
            {!docked && (
              <motion.div
                layoutId={PHOTO_LAYOUT_ID}
                transition={calm ? { duration: 0 } : NAME_FLIGHT}
                className="absolute inset-0"
              >
                <PhotoMark />
              </motion.div>
            )}
          </div>
          {/* The real heading: always in the accessibility tree, holds the height. */}
          <h1 ref={slot} className={docked ? 'opacity-0' : undefined}>
            {docked ? (
              <NameMark className={big} />
            ) : (
              <motion.span
                layoutId={NAME_LAYOUT_ID}
                transition={calm ? { duration: 0 } : NAME_FLIGHT}
                className="inline-block origin-top-left"
              >
                <NameMark className={big} />
              </motion.span>
            )}
          </h1>
        </motion.div>
      </div>
    </header>
  );
}
