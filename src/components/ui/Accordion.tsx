"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface Item {
  id: string;
  title: ReactNode;
  meta?: ReactNode;
  content: ReactNode;
}

/**
 * Acordeón accesible: cada cabecera es un `button` con `aria-expanded` y
 * `aria-controls`, y el panel se referencia con `aria-labelledby`.
 */
/** Los id de ARIA no admiten espacios: el identificador se normaliza. */
const slugify = (v: string) =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

export function Accordion({ items, defaultOpen }: { items: Item[]; defaultOpen?: string }) {
  const uid = useId();
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  const reduced = useReducedMotion();

  return (
    <div className="divide-y divide-[color:var(--color-line)] overflow-hidden rounded-[var(--radius-lg)] border border-line bg-surface">
      {items.map((item) => {
        const expanded = open === item.id;
        const key = slugify(item.id);
        const btnId = `${uid}-${key}-btn`;
        const panelId = `${uid}-${key}-panel`;
        return (
          <div key={item.id}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="flex w-full min-h-[56px] cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2"
              >
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-[1.02rem] font-semibold">{item.title}</span>
                  {item.meta && <span className="text-sm text-ink-mute">{item.meta}</span>}
                </span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 text-ink-mute transition-transform duration-[var(--dur-base)] ${
                    expanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
