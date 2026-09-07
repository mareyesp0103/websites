import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { contact, site, UNVALIDATED } from "@/data/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description:
    "Política de privacidad y tratamiento de datos personales de Sonic Publicidad, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.",
  alternates: { canonical: "/privacidad/" },
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    title: "1. Responsable del tratamiento",
    body: [
      `${site.legalName} es responsable del tratamiento de los datos personales que se recogen a través de este sitio web. Para cualquier consulta sobre esta política puedes escribir a ${contact.email} o comunicarte al ${contact.phoneDisplay}.`,
      `Domicilio del responsable: ${UNVALIDATED.toLowerCase()}.`,
    ],
  },
  {
    title: "2. Datos que recogemos",
    body: [
      "Sólo tratamos los datos que tú nos entregas voluntariamente a través del formulario de solicitud de propuesta o al escribirnos por correo, teléfono o WhatsApp: nombre y apellido, empresa o marca, correo electrónico, teléfono de contacto y la información de campaña que decidas compartir (objetivo, ciudad, formatos de interés, fechas, duración, presupuesto referencial y mensaje adicional).",
      "Este sitio no utiliza cookies de publicidad ni de analítica de terceros. No creamos perfiles de navegación ni compartimos datos con redes publicitarias.",
    ],
  },
  {
    title: "3. Finalidad del tratamiento",
    body: [
      "Los datos se usan exclusivamente para responder tu solicitud, elaborar y enviarte una propuesta comercial, y dar seguimiento a esa conversación por el canal que hayas autorizado.",
      "No usamos tus datos para enviarte comunicaciones comerciales distintas de la solicitud que iniciaste, salvo que nos des tu consentimiento expreso para ello.",
    ],
  },
  {
    title: "4. Base legal",
    body: [
      "El tratamiento se basa en tu consentimiento, que otorgas de forma expresa al marcar la casilla de autorización de contacto antes de enviar el formulario, y en la ejecución de medidas precontractuales solicitadas por ti.",
    ],
  },
  {
    title: "5. Conservación",
    body: [
      "Conservamos los datos mientras dure la gestión comercial y durante el tiempo necesario para atender obligaciones legales o eventuales reclamaciones. Cuando dejen de ser necesarios, se eliminan.",
    ],
  },
  {
    title: "6. Destinatarios",
    body: [
      "Para ejecutar una campaña puede ser necesario compartir datos de contacto operativos con los aliados estratégicos, operadores de espacios o centros comerciales involucrados, únicamente en la medida indispensable para la coordinación del servicio contratado.",
      "No vendemos ni cedemos tus datos personales a terceros con fines distintos a los descritos.",
    ],
  },
  {
    title: "7. Tus derechos",
    body: [
      "Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, eliminación, oposición, portabilidad y suspensión del tratamiento, así como revocar el consentimiento otorgado, conforme a la Ley Orgánica de Protección de Datos Personales del Ecuador.",
      `Para ejercerlos, escríbenos a ${contact.email} indicando tu solicitud. Responderemos dentro de los plazos que establece la normativa aplicable.`,
    ],
  },
  {
    title: "8. Seguridad",
    body: [
      "Aplicamos medidas razonables para proteger la información que nos entregas frente a accesos no autorizados, pérdida o divulgación indebida.",
    ],
  },
  {
    title: "9. Cambios en esta política",
    body: [
      "Podemos actualizar esta política para reflejar cambios legales u operativos. La versión vigente será siempre la publicada en esta página.",
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Política de privacidad"
        lead="Cómo tratamos los datos personales que nos entregas a través de este sitio."
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Política de privacidad" }]}
      />

      <Section spacing="tight" bordered={false}>
        <div className="shell">
          <div className="card max-w-3xl p-7 sm:p-10">
            {SECTIONS.map((s) => (
              <section key={s.title} className="mb-8 last:mb-0">
                <h2 className="text-h3">{s.title}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 leading-relaxed text-ink-dim">
                    {p}
                  </p>
                ))}
              </section>
            ))}

            <p className="mt-10 border-t border-line pt-6 text-[0.85rem] text-ink-mute">
              Este texto es un modelo base y debe ser revisado por asesoría legal antes de su
              publicación definitiva, junto con los datos pendientes de validación.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
