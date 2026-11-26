'use client';

import { useEffect, useSyncExternalStore } from 'react';

/**
 * Whether the name has "docked" into the sidebar: true on desktop (lg+) once
 * the masthead name has scrolled out of view. Shared by the masthead and the
 * sidebar so exactly one of them shows the name at a time.
 */
let docked = false;
const listeners = new Set<() => void>();

function set(next: boolean) {
  if (next === docked) return;
  docked = next;
  listeners.forEach((l) => l());
}

export function useNameDocked() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => docked,
    () => false,
  );
}

/** Watches the masthead name. Mounted once, by the masthead. */
export function useDockWatcher(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lg = window.matchMedia('(min-width: 1024px)');
    let outOfView = false;
    const update = () => set(lg.matches && outOfView);

    const io = new IntersectionObserver(
      ([e]) => {
        outOfView = !e.isIntersecting;
        update();
      },
      { rootMargin: '-40px 0px 0px 0px' },
    );
    io.observe(el);
    lg.addEventListener('change', update);
    return () => {
      io.disconnect();
      lg.removeEventListener('change', update);
      set(false);
    };
  }, [ref]);
}
