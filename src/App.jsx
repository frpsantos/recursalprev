import React, { useState } from "react";
import { ReactTyped } from "react-typed";


export default function RecursalPrevLanding() {
  // Executando local: sem envio real
  const FORMSPREE_ENDPOINT = "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ ok: false, error: "" });
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    escritorio: "",
    volume: "",
    plano: "",
    consent: false,
  });

  const planos = [

    {
      nome: "Premium",
      preco: "R$ 169",
      sub: "por recurso",
      extras: "Ótimo para escalar e padronizar recursos",
      features: [
        "Mínimo 60 recursos por mês",
        "Bônus de 5 recursos no mês",
        "Carência miníma de 12 meses",
        "Suporte personalizado 24x7",
         "R$ 269 por recurso adicional",
      ],
    },

    {
      nome: "Pro",
      preco: "R$ 199",
      sub: "por recurso",
      extras: "Ideal para demandas de médio prazo.",
      features: [
        "Mínimo de 40 recursos por mês",
        "Bônus de 3 recursos no mês",
        "Carência de 6 meses",
        "Suporte via chat + 2 horas disponiveis para reuniões online",
        "R$ 299 por recurso adicional",
      ],
    },

/*     {
      nome: "Lite",
      preco: "R$ 399",
      sub: "por recurso",
      extras: "Atende demandas sazionais",
      features: [
        "Mínimo de 5 recursos por mês",
        "Carência de 1 mês",
        "Suporte via chat",
        "R$ 499 por recurso adicional",
      ],
    }, */

    {
      nome: "Avulso",
      preco: "R$ 599",
      sub: "por recurso",
      extras: "Uso sob demanda",
      features: [
        "1 recurso por vez",
        "Entrega em até 24h úteis"
      ],
    },
  
  ];

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      // quando tiver endpoint, descomente para enviar de verdade:
      // if (FORMSPREE_ENDPOINT) {
      //   const res = await fetch(FORMSPREE_ENDPOINT, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(form),
      //   });
      //   if (!res.ok) throw new Error("Falha ao enviar");
      // }
      await new Promise((r) => setTimeout(r, 700)); // simulação local
      setStatus({ ok: true, error: "" });
      setForm({
        nome: "",
        email: "",
        whatsapp: "",
        escritorio: "",
        volume: "",
        plano: "",
        consent: false,
      });
    } catch (err) {
      setStatus({ ok: false, error: "Não foi possível enviar." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b border-slate-200">
        <div className="w-full px-4 md:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollToId("top")}
            className="flex items-center gap-2"
            aria-label="Ir para o topo"
          >
            <div className="h-8 w-8 rounded-xl bg-slate-900 text-white grid place-items-center font-bold">
              R
            </div>
            <span className="font-semibold">RecursalPrev</span>
          </button>

          {/* menu desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button className="hover:text-slate-900" onClick={() => scrollToId("como-funciona")}>
              Como funciona
            </button>
            <button className="hover:text-slate-900" onClick={() => scrollToId("beneficios")}>
              Benefícios
            </button>
            <button className="hover:text-slate-900" onClick={() => scrollToId("planos")}>
              Planos
            </button>
            <button className="hover:text-slate-900" onClick={() => scrollToId("contato")}>
              Contato
            </button>
          </nav>

          {/* CTA desktop */}
          <button
            onClick={() => scrollToId("lead")}
            className="hidden md:inline-flex px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium"
          >
            Quero testar
          </button>

          {/* hambúrguer mobile */}
          <button
            className="md:hidden p-2 rounded-lg border border-slate-300"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
          >
            ☰
          </button>
        </div>

        {/* drawer mobile */}
        {mobileOpen && (
          <div className="md:hidden px-4 pb-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 grid gap-2">
              <button className="text-left py-2" onClick={() => scrollToId("como-funciona")}>
                Como funciona
              </button>
              <button className="text-left py-2" onClick={() => scrollToId("beneficios")}>
                Benefícios
              </button>
              <button className="text-left py-2" onClick={() => scrollToId("planos")}>
                Planos
              </button>
              <button className="text-left py-2" onClick={() => scrollToId("contato")}>
                Contato
              </button>
              <button
                className="mt-2 h-11 rounded-xl bg-slate-900 text-white font-medium"
                onClick={() => scrollToId("lead")}
              >
                Quero testar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="top"
        className="w-full px-4 md:px-8 pt-24 pb-16 flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-[900px]">
          <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            <ReactTyped
              strings={[
                "Recursos previdenciários mais rápidos e padronizados",
              ]}
              typeSpeed={60}
              backSpeed={10}
              showCursor={true}
            />
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Plataforma para escritórios que desejam escalar a elaboração de recursos em processos previdenciários.
          </p>

          <ul className="mt-6 grid gap-3 text-slate-700">
            <li>• Eficiência e agilidade na elaboração de recursos por especialista em recursos</li>
            <li>• Argumentação baseada em casos reais e jurisprudência</li>
            <li>• Estilo adaptado ao seu escritório</li>
          </ul>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollToId("lead")}
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-medium"
            >
              Entrar na lista de teste
            </button>
            <button
              onClick={() => scrollToId("planos")}
              className="px-5 py-3 rounded-xl border border-slate-300 font-medium"
            >
              Ver planos
            </button>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="w-full px-4 md:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { t: "Velocidade com qualidade", d: "Padronize a escrita sem perder rigor técnico." },
            { t: "Base proprietária", d: "Experiência consolidada com 20 anos de experiência em atuação recursal" },
            { t: "Conformidade", d: "Privacidade por padrão e revisão humana obrigatória." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="font-semibold">{c.t}</div>
              <p className="text-slate-600 mt-2 text-sm">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="w-full px-4 md:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold">Planos RecursalPrev</h2>
        <p className="text-sm text-slate-500 mt-1">
          Condições especiais de early access — com revisão humana e suporte incluso.
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {planos.map((p) => (
            <div
              key={p.nome}
              className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col"
            >
              <div className="flex-1">
                <div className="text-lg font-semibold">{p.nome}</div>
                <div className="mt-2 text-2xl font-bold">{p.preco}</div>
                <div className="text-slate-500 text-sm">{p.sub}</div>
                <div className="mt-2 text-slate-600 text-sm">{p.extras}</div>
                <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                  {p.features.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setForm({ ...form, plano: p.nome });
                  scrollToId("lead");
                }}
                className="mt-6 h-11 rounded-xl bg-slate-900 text-white font-medium hover:opacity-95"
              >
                Selecionar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="lead" className="w-full px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Entre na lista de teste</h2>
            <p className="mt-3 text-slate-600">
              Preencha para receber o convite e condições de lançamento.
            </p>
            <ul className="mt-6 grid gap-2 text-slate-700 text-sm">
              <li>• Onboarding prioritário</li>
              <li>• 30 dias para validação</li>
              <li>• Suporte direto com o time</li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 p-4 sm:p-6 bg-white shadow-sm"
            noValidate
          >
            {status.ok && (
              <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-800">
                Obrigado! Recebemos seus dados.
              </div>
            )}
            {status.error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                {status.error}
              </div>
            )}

            <div className="grid gap-4">
              <div className="grid gap-1">
                <label className="text-sm">Nome completo*</label>
                <input
                  className="h-11 rounded-xl border border-slate-300 px-3 w-full"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  placeholder="Ex.: Ana Silva"
                  required
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm">E-mail profissional*</label>
                <input
                  type="email"
                  className="h-11 rounded-xl border border-slate-300 px-3 w-full"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="nome@escritorio.com.br"
                  required
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm">WhatsApp</label>
                <input
                  className="h-11 rounded-xl border border-slate-300 px-3 w-full"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="(DDD) 9 9999-9999"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-sm">Plano selecionado</label>
                <input
                  className="h-11 rounded-xl border border-slate-300 px-3 bg-slate-50 w-full"
                  value={form.plano || "(nenhum)"}
                  readOnly
                />
              </div>

              <label className="flex items-start gap-3 text-sm mt-1">
                <input
                  type="checkbox"
                  className="relative top-1"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                <span>
                  Concordo com o <a href="#contato" className="underline">tratamento de dados</a> para contato e
                  demonstração (LGPD).
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="h-11 rounded-xl bg-slate-900 text-white font-medium hover:opacity-95 disabled:opacity-60"
              >
                {loading ? "Enviando…" : "Quero receber o convite"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contato" className="border-t border-slate-200 py-10">
        <div className="w-full px-4 md:px-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="font-semibold">RecursalPrev</div>
            <p className="text-slate-600 text-sm mt-1">Recursos previdenciários para escritórios.</p>
          </div>
          <div className="justify-self-end text-sm text-slate-600">
            contato@recursalprev.com.br
          </div>
        </div>
      </footer>
    </div>
  );
}

