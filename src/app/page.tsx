"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calculator,
  CheckCircle2,
  FileText,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

type ClientType = "autonomo" | "pyme" | "particular";
type ServiceValue = "fiscal" | "contable" | "laboral" | "empresa" | "ticketbai";
type Urgency = "Hoy" | "Esta semana" | "Este mes" | "Solo quiero informarme";

type FormState = {
  name: string;
  clientType: ClientType;
  business: string;
  town: string;
  services: ServiceValue[];
  urgency: Urgency;
  message: string;
};

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`rounded-2xl border border-slate-200 bg-white ${className ?? ""}`}>{children}</div>;
}

const serviceOptions = [
  { value: "fiscal" as const, label: "Fiscal", icon: Calculator },
  { value: "contable" as const, label: "Contable", icon: FileText },
  { value: "laboral" as const, label: "Laboral", icon: Users },
  { value: "empresa" as const, label: "Alta/constitución", icon: Briefcase },
  { value: "ticketbai" as const, label: "TicketBAI", icon: Shield },
];

const urgencyOptions: Urgency[] = ["Hoy", "Esta semana", "Este mes", "Solo quiero informarme"];

function buildDemoResult(data: FormState) {
  const detected: string[] = [];
  const docs: string[] = [];
  const opportunities: string[] = [];
  let score = 45;

  if (data.services.includes("fiscal")) {
    detected.push("Consulta fiscal con posible impacto en impuestos o plazos.");
    docs.push("Últimas declaraciones presentadas / datos fiscales.");
    opportunities.push("Revisión fiscal inicial y planificación tributaria.");
    score += 12;
  }

  if (data.services.includes("contable")) {
    detected.push("Necesidad de orden contable y visibilidad financiera.");
    docs.push("Libro de ingresos/gastos o balance reciente.");
    opportunities.push("Cuadro mensual de control económico.");
    score += 10;
  }

  if (data.services.includes("laboral")) {
    detected.push("Caso laboral con empleados, nóminas o Seguridad Social.");
    docs.push("Nóminas, contratos o informe de plantilla.");
    opportunities.push("Soporte recurrente de nóminas y trámites laborales.");
    score += 10;
  }

  if (data.services.includes("ticketbai")) {
    detected.push("Interés en implantación o revisión de TicketBAI.");
    docs.push("Software actual de facturación y ejemplo de factura.");
    opportunities.push("Implantación + acompañamiento TicketBAI.");
    score += 12;
  }

  if (data.clientType === "autonomo") {
    detected.push("Perfil autónomo: necesita rapidez y claridad.");
    score += 6;
  }

  if (data.clientType === "pyme") {
    detected.push("Perfil pyme: más potencial de recurrencia mensual.");
    score += 12;
  }

  if (data.urgency === "Hoy" || data.urgency === "Esta semana") {
    detected.push("Lead caliente por urgencia alta.");
    score += 12;
  }

  const normalizedMessage = data.message.toLowerCase();

  if (normalizedMessage.includes("hacienda") || normalizedMessage.includes("inspección")) {
    detected.push("Posible riesgo o tensión con Hacienda / inspección.");
    docs.push("Notificación recibida o requerimiento.");
    opportunities.push("Asistencia prioritaria y representación.");
    score += 15;
  }

  if (normalizedMessage.includes("contratar") || normalizedMessage.includes("empleado")) {
    detected.push("Necesidad laboral concreta vinculada a contratación.");
    opportunities.push("Alta de empleado + gestión laboral recurrente.");
    score += 8;
  }

  score = Math.min(score, 98);

  return {
    summary:
      data.services.length > 0
        ? `Hemos detectado una consulta ${data.services.join(", ")} con prioridad ${data.urgency.toLowerCase()}. Recomendamos que Adarzuri reciba este caso ya estructurado para responder más rápido y vender mejor.`
        : "Consulta general pendiente de clasificar.",
    detected,
    docs: Array.from(new Set(docs)).slice(0, 5),
    opportunities: Array.from(new Set(opportunities)).slice(0, 4),
    score,
  };
}

export default function AdarzuriAIDemo() {
  const [form, setForm] = useState<FormState>({
    name: "María",
    clientType: "autonomo",
    business: "Centro de estética",
    town: "Errenteria",
    services: ["fiscal", "ticketbai"],
    urgency: "Esta semana",
    message:
      "Soy autónoma. Quiero saber si estoy haciendo bien TicketBAI y además necesito ayuda con IVA y un requerimiento de Hacienda.",
  });

  const [submitted, setSubmitted] = useState(false);
  const result = useMemo(() => buildDemoResult(form), [form]);

  const toggleService = (value: ServiceValue) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(value)
        ? prev.services.filter((service) => service !== value)
        : [...prev.services, value],
    }));
  };

  const buttonClass = (active: boolean) =>
    `rounded-2xl px-3 py-2 text-sm border transition ${
      active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50"
    }`;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-0 shadow-lg">
              <div className="space-y-4 p-8">
                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs">Propuesta privada para Adarzuri</span>
                <div className="space-y-3">
                  <h1 className="text-3xl font-semibold tracking-tight">Sistema IA de captación y diagnóstico inicial</h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-600">
                    Una entrada guiada para potenciales clientes. La IA recoge el caso, detecta el área fiscal/contable/laboral,
                    pide la documentación clave, prioriza el lead y deja a Adarzuri un resumen limpio para actuar.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-slate-100 px-3 py-1">OpenAI API</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Next.js</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Lead scoring</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">Resumen estructurado</span>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card className="border-0 shadow-xl">
              <div className="p-8 pb-4">
                <h2 className="text-xl font-semibold">Impacto directo en negocio</h2>
                <p className="text-slate-600">No sustituye al asesor. Filtra, ordena y acelera la captación.</p>
              </div>
              <div className="space-y-3 px-8 pb-8">
                {[
                  "Detecta si el caso es fiscal, contable, laboral o TicketBAI.",
                  "Pide solo la documentación relevante.",
                  "Genera resumen interno listo para el despacho.",
                  "Marca urgencia y potencial comercial.",
                  "Puede terminar en WhatsApp, email o reserva de llamada.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <p className="text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-0 shadow-xl">
              <div className="p-8">
                <h2 className="text-2xl font-semibold">Simulación de entrada de cliente potencial</h2>
                <p className="text-slate-600">Simula lo que rellenaría un autónomo o pyme antes de hablar con Adarzuri.</p>
              </div>
              <div className="space-y-6 px-8 pb-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <input
                      className="w-full rounded-2xl border border-slate-300 px-3 py-2"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Negocio</label>
                    <input
                      className="w-full rounded-2xl border border-slate-300 px-3 py-2"
                      value={form.business}
                      onChange={(event) => setForm({ ...form, business: event.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tipo de cliente</label>
                    <div className="flex gap-2">
                      {[
                        ["autonomo", "Autónomo"],
                        ["pyme", "Pyme"],
                        ["particular", "Particular"],
                      ].map(([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          className={buttonClass(form.clientType === value)}
                          onClick={() => setForm({ ...form, clientType: value as ClientType })}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Urgencia</label>
                    <div className="flex flex-wrap gap-2">
                      {urgencyOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={buttonClass(form.urgency === option)}
                          onClick={() => setForm({ ...form, urgency: option })}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Población</label>
                  <input
                    className="w-full rounded-2xl border border-slate-300 px-3 py-2"
                    value={form.town}
                    onChange={(event) => setForm({ ...form, town: event.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">Qué necesita</label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((service) => {
                      const Icon = service.icon;
                      const active = form.services.includes(service.value);
                      return (
                        <button
                          key={service.value}
                          type="button"
                          className={buttonClass(active)}
                          onClick={() => toggleService(service.value)}
                        >
                          <span className="inline-flex items-center">
                            <Icon className="mr-2 h-4 w-4" />
                            {service.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Describe tu caso</label>
                  <textarea
                    rows={6}
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    className="w-full rounded-2xl border border-slate-300 px-3 py-2"
                  />
                </div>

                <button
                  className="flex w-full items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-base text-white"
                  onClick={() => setSubmitted(true)}
                  type="button"
                >
                  Analizar con IA <Sparkles className="ml-2 h-4 w-4" />
                </button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-0 shadow-xl">
              <div className="space-y-3 p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold">Panel interno del despacho</h2>
                    <p className="text-slate-600">Lo que recibiría el despacho tras el análisis automático.</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">Lead score {result.score}/100</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full rounded-full bg-slate-900" style={{ width: `${result.score}%` }} />
                </div>
              </div>
              <div className="space-y-6 px-8 pb-8">
                <div className="rounded-2xl bg-slate-100 p-4">
                  <p className="text-sm font-medium text-slate-500">Resumen ejecutivo</p>
                  <p className="mt-2 leading-7 text-slate-800">
                    {submitted ? result.summary : "Pulsa “Analizar con IA” para generar el resumen."}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border p-4">
                    <p className="text-sm font-medium text-slate-500">Señales detectadas</p>
                    <div className="mt-3 space-y-2">
                      {(submitted ? result.detected : ["La IA clasificará el caso y señalará riesgos, área y urgencia."]).map(
                        (item) => (
                          <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                            <span>•</span>
                            <span>{item}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border p-4">
                    <p className="text-sm font-medium text-slate-500">Documentación a pedir</p>
                    <div className="mt-3 space-y-2">
                      {(submitted ? result.docs : ["La IA propondrá qué documentos pedir antes de la llamada."]).map((item) => (
                        <div key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                          <span>•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border p-4">
                  <p className="text-sm font-medium text-slate-500">Oportunidades comerciales sugeridas</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(submitted
                      ? result.opportunities
                      : ["Servicio recurrente", "Implantación", "Consulta inicial", "Planificación"]
                    ).map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <Card className="shadow-none">
                    <div className="p-4">
                      <p className="text-sm text-slate-500">Cliente</p>
                      <p className="mt-1 font-medium">{form.name}</p>
                      <p className="text-sm text-slate-600">{form.business}</p>
                    </div>
                  </Card>
                  <Card className="shadow-none">
                    <div className="p-4">
                      <p className="text-sm text-slate-500">Zona</p>
                      <p className="mt-1 font-medium">{form.town}</p>
                      <p className="text-sm text-slate-600">Gipuzkoa</p>
                    </div>
                  </Card>
                  <Card className="shadow-none">
                    <div className="p-4">
                      <p className="text-sm text-slate-500">Siguiente paso</p>
                      <p className="mt-1 font-medium">Llamada priorizada</p>
                      <p className="text-sm text-slate-600">o respuesta por email</p>
                    </div>
                  </Card>
                </div>

                <div className="rounded-2xl bg-slate-900 p-5 text-white">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Valor para Adarzuri</p>
                  <p className="mt-2 text-lg leading-8">
                    Reduce tiempo administrativo, mejora la calidad de las consultas entrantes y aumenta la probabilidad de
                    convertir visitas en clientes recurrentes.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button className="flex items-center rounded-2xl bg-white px-4 py-2 text-slate-900" type="button">
                      Ver resumen CRM <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <button
                      className="rounded-2xl border border-white/20 bg-transparent px-4 py-2 text-white hover:bg-white/10"
                      type="button"
                    >
                      Enviar por email
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
