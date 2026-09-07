import { CircleHelp } from "lucide-react";
import type { Pricing } from "@/data/types";
import { PRICING_PUBLIC, PRICING_NOTICE } from "@/data/site";

const PERIOD_LABEL: Record<string, string> = {
  quincenal: "15 días",
  mensual: "Mensual",
  bimestral: "2 meses",
  trimestral: "Trimestral",
  semestral: "Semestral",
  anual: "Anual",
  unico: "Único",
};

const money = new Intl.NumberFormat("es-EC", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/**
 * Bloque de inversión.
 *
 * Mientras `PRICING_PUBLIC` sea false, el sitio no publica tarifas: muestra
 * "Consultar disponibilidad" y deriva a cotización. Los valores viven en
 * `formats.ts` y se publican cambiando una sola bandera.
 */
export function PriceBlock({ pricing, compact = false }: { pricing?: Pricing; compact?: boolean }) {
  if (!PRICING_PUBLIC || !pricing?.rental?.length) {
    return (
      <p
        className={`inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-line bg-surface-2 px-3 py-2 text-ink-dim ${
          compact ? "text-[0.82rem]" : "text-[0.9rem]"
        }`}
      >
        <CircleHelp size={15} aria-hidden="true" className="shrink-0 text-brand-soft" />
        Consultar disponibilidad e inversión
      </p>
    );
  }

  return (
    <div className="rounded-[var(--radius-md)] border border-line bg-surface-2 p-4">
      <table className="tabular w-full text-left text-[0.92rem]">
        <caption className="sr-only">Escalones de inversión por período contratado</caption>
        <thead>
          <tr className="text-[0.7rem] uppercase tracking-[0.12em] text-ink-mute">
            <th scope="col" className="pb-2 font-display font-semibold">Alquiler</th>
            <th scope="col" className="pb-2 text-right font-display font-semibold">Inversión</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[color:var(--color-line)]">
          {pricing.rental.map((t) => (
            <tr key={t.label ?? t.period}>
              <th scope="row" className="py-2 font-normal text-ink-dim">
                {t.label ?? PERIOD_LABEL[t.period] ?? t.period}
              </th>
              <td className="py-2 text-right text-ink">{money.format(t.amount)}</td>
            </tr>
          ))}
          {pricing.production && (
            <tr>
              <th scope="row" className="py-2 font-normal text-ink-dim">
                Producción{pricing.production.note ? ` · ${pricing.production.note}` : ""}
              </th>
              <td className="py-2 text-right text-ink">{money.format(pricing.production.amount)}</td>
            </tr>
          )}
        </tbody>
      </table>
      <p className="mt-3 text-[0.78rem] leading-relaxed text-ink-mute">
        {PRICING_NOTICE} Tarifario actualizado en{" "}
        <time dateTime={pricing.updatedAt}>
          {new Date(pricing.updatedAt).toLocaleDateString("es-EC", { month: "long", year: "numeric" })}
        </time>
        .
      </p>
    </div>
  );
}
