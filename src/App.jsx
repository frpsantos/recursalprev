import React, { useMemo, useState } from "react";
import { ReactTyped } from "react-typed";

// Alerta
function Alert({ type = "success", children }) {
  const styles =
    type === "success"
      ? "bg-green-50 border-green-200 text-green-800"
      : "bg-red-50 border-red-200 text-red-800";
  const icon = type === "success" ? "✅" : "⚠️";

  return (
    <div
      className={`mb-4 rounded-xl border p-3 text-sm flex items-start gap-2 ${styles}`}
      role={type === "success" ? "status" : "alert"}
      aria-live="polite"
    >
      <span className="text-base leading-none">{icon}</span>
      <div>{children}</div>
    </div>
  );
}

export default function RecursalPrevLanding() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formStatus, setFormStatus] = useState({ ok: false, error: "" });

  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    escritorio: "",
    volume: "",
    plano: "",
    consent: false,
  });

  // validação leve
  const emailOk = useMemo(() => /.+@.+\..+/.test(form.email.trim()), [form.email]);
  const nomeOk = useMemo(() => form.nome.trim().length >= 3, [form.nome]);
  const readyToSubmit = nomeOk && emailOk && form.consent && !loading;

  // máscara simples
  function maskWhats(v) {
    const digits = v.replace(/\D/g, "");
    if (!digits) return "";
    const d = digits.padEnd(11, "");
    return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7, 11)}`
      .trim()
      .replace(/[-\s]+$/, "");
  }

  // planos (Avulso Especial na 2ª posição)
  const planos = [
    { nome: "Avulso", preco: "R$ 599", sub: "por recurso", extras: "Uso sob demanda para peças simples", features: ["1 recurso por vez", "Entrega em até 7 dias úteis"] },
    { nome: "Avulso Especial", preco: "R$ 1.599", sub: "por recurso", extras: "Recurso para Instâncias Superiores", features: ["1 recurso por vez", "Entrega em até 7 dias úteis","Instâncias: TRU, TNU, STJ, STF." ] },
    { nome: "Lite", preco: "R$ 1.999", sub: "mês", extras: "Atende demandas sazonais", features: ["5 recursos por mês","Carência de 1 mês","Suporte via chat","R$ 499 por recurso adicional"] },
    { nome: "Pro", preco: "R$ 7.999", sub: "mês", extras: "Ideal para demandas de médio prazo", features: ["40 recursos por mês","Bônus de 3 recursos no mês","Carência de 6 meses","Suporte via chat","20 minutos/mês em reuniões online","R$ 299 por recurso adicional"] },
    { nome: "Premium", preco: "R$ 9.999", sub: "mês", extras: "Ótimo para escalar e padronizar recursos", features: ["60 recursos por mês","Bônus de 5 recursos no mês","Carência mínima de 12 meses","Suporte via chat","40 minutos/mês em reuniões online","R$ 199 por recurso adicional"] },
  ];

  // paleta por plano
  const palette = {
    Avulso: { border: "border-slate-200", price: "text-slate-800", btn: "bg-slate-900" },
    "Avulso Especial": { border: "border-purple-400", price: "text-purple-700", btn: "bg-purple-600" },
    Lite: { border: "border-sky-300", price: "text-sky-700", btn: "bg-sky-600" },
    Pro: { border: "border-slate-900", price: "text-slate-900", btn: "bg-slate-900" },
    Premium: { border: "border-amber-500", price: "text-amber-600", btn: "bg-amber-500" },
  };

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ ok: false, error: "" });

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Falha no envio");

      setFormStatus({ ok: true, error: "" });
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
      console.error(err);
      setFormStatus({ ok: false, error: "Não foi possível enviar o e-mail. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800 overflow-x-hidden">
      {/* CSS do letreiro */}
      <style>{`
        @keyframes rp-marquee { 
          0% { transform: translateX(100%); } 
          100% { transform: translateX(-100%); } 
        }
      `}</style>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="w-full px-[5vw] sm:px-[6vw] lg:px-[8vw] py-3 flex items-center justify-between">
          <button onClick={() => scrollToId("top")} className="flex items-center gap-2" aria-label="Ir para o topo">
            <div className="flex items-center gap-2">
              <img src="/LogoPrincipal.png" alt="RecursalPrev" className="h-8 w-auto" />
              <span className="font-semibold text-slate-800">RecursalPrev</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {[
              ["Quem somos", "quem-somos"],
              ["Como funciona", "como-funciona"],
              ["Benefícios", "beneficios"],
              ["Planos", "planos"],
              ["Contato", "contato"],
            ].map(([label, id]) => (
              <button key={id} className="hover:text-slate-900" onClick={() => scrollToId(id)}>
                {label}
              </button>
            ))}
          </nav>

          <button onClick={() => scrollToId("lead")} className="hidden md:inline-flex px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium">
            Solicitar proposta
          </button>

          <button
            className="md:hidden p-2 rounded-lg border border-slate-300"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
          >
            ☰
          </button>
        </div>

 
     
        {/* Banner letreiro — sempre em uma linha (mobile safe) */}
        <style>{`
          @keyframes rp-marquee-line {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* move metade do trilho duplicado */
          }

          @media (prefers-reduced-motion: reduce) {
            .rp-marquee-line {
              animation: none !important;
              transform: none !important;
            }
          }
        `}</style>

        <div
          className="
            relative overflow-hidden border-t border-slate-200 bg-slate-900 text-white
            [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]
          "
        >
          {/* trilho duplicado */}
          <div
            className="
              rp-marquee-line flex w-[300%]
              [animation:rp-marquee-line_30s_linear_infinite]
            "
          >
            {/* cópia 1 */}
            <div className="flex items-left gap-12 w-1/2 shrink-0 py-2 text-xs sm:text-sm">
              <span className="px-6">🚀 Preço especial de lançamento</span>
              <span className="px-6">🔥 Black Friday</span>
              <span className="px-6">🚀 Preço especial de lançamento</span>
              <span className="px-6">🔥 Black Friday</span>
              <span className="px-6">🚀 Preço especial de lançamento</span>
              <span className="px-6">🔥 Black Friday</span>
              <span className="px-6">🚀 Preço especial de lançamento</span>
              <span className="px-6">🔥 Black Friday</span>
        
            </div>
          </div>
        </div>



        {/* Menu Mobile */}
        <div className={["md:hidden px-[5vw] pb-3 transition-all duration-200", mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"].join(" ")}>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 grid gap-1">
            {[
              ["Quem somos", "quem-somos"],
              ["Como funciona", "como-funciona"],
              ["Benefícios", "beneficios"],
              ["Planos", "planos"],
              ["Contato", "contato"],
            ].map(([label, id]) => (
              <button key={id} className="text-left py-2 rounded-lg hover:bg-slate-50" onClick={() => scrollToId(id)}>
                {label}
              </button>
            ))}
            <button className="mt-2 h-11 rounded-xl bg-slate-900 text-white font-medium" onClick={() => scrollToId("lead")}>
              Solicitar proposta
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="w-full px-4 sm:px-[8vw] lg:px-[10vw] pt-16 sm:pt-24 pb-10 sm:pb-16 text-center">
        <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
          <ReactTyped
            strings={["Recursos previdenciários padronizados e com qualidade"]}
            typeSpeed={50}
            backSpeed={10}
            showCursor
          />
        </h1>

        <p className="mt-3 text-slate-600 text-sm sm:text-lg max-w-[70ch] mx-auto">
          Atendemos escritórios e advogados que desejam escalar a elaboração de recursos previdenciários com padronização, qualidade, previsibilidade operacional, redução de custos operacionais e aumento de receita.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <button onClick={() => scrollToId("lead")} className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 text-white font-medium hover:opacity-95">
            Solicitar proposta
          </button>
          <button onClick={() => scrollToId("planos")} className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 font-medium hover:bg-slate-50">
            Ver planos
          </button>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section id="quem-somos" className="w-full bg-white">
        <div className="w-full px-[5vw] sm:px-[8vw] lg:px-[10vw] py-14 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-10 text-slate-900">Quem Somos</h2>

          <div className="grid grid-cols-1 lg:grid-cols-[320px,1fr] gap-8 sm:gap-10 items-start">
            <div className="justify-self-center lg:justify-self-start">
              <div className="w-[260px] sm:w-[280px] aspect-[7/8] rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                <img src="/Haruana.png" alt="Dr. Haruanã Cachorroski Cardoso" className="w-full h-full object-cover object-top" />
              </div>
            </div>

            <div className="text-slate-800 leading-relaxed">
              <p className="text-base sm:text-lg text-slate-700 mb-4">
                A <strong>RecursalPrev</strong> nasceu para fortalecer a credibilidade e a eficiência dos escritórios parceiros, oferecendo operação padronizada, revisão jurídica especializada e previsibilidade no fluxo de produção de recursos previdenciários.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold mt-6">Fundador e CEO</h3>
              <p className="uppercase text-xs sm:text-sm text-slate-500 tracking-wide mb-3">Dr. Haruanã Cachorroski Cardoso</p>

              <p className="text-slate-700 mb-4">
                Com quase <strong>20 anos de atuação</strong> em prática recursal, o Dr. Haruanã é reconhecido por sua ética e excelência técnica em sustentações orais e peças recursais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="w-full bg-slate-50">
        <div className="w-full px-[5vw] sm:px-[8vw] lg:px-[10vw] py-14 sm:py-16">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">Como a RecursalPrev funciona</h2>
            <p className="text-slate-600 max-w-[70ch] mx-auto text-sm sm:text-base">
              Etapas claras, revisão técnica e entregas dentro do prazo — do envio ao recurso final, você acompanha tudo com transparência.
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { title: "Envio do caso", text: "Você encaminha o processo e observações pelo canal seguro da RecursalPrev.", emoji: "📨" },
              { title: "Análise inicial", text: "Revisamos documentos e definimos a melhor estratégia recursal.", emoji: "🔍" },
              { title: "Elaboração", text: "O recurso é redigido com base na expertise técnica-jurídica de Dr Haruanã, acrescida de uma base de precedentes atualizados, sem perder a identidade do seu escritório.", emoji: "✍️" },
              { title: "Revisão técnica", text: "Dupla revisão jurídica assegura consistência argumentativa e qualidade técnica.", emoji: "📝" },
              { title: "Entrega e ajustes", text: "Entrega no prazo do plano, com histórico e possibilidade de ajustes.", emoji: "✅" },
              { title: "Acompanhamento", text: "Suporte contínuo e reuniões periódicas nos planos Pro e Premium.", emoji: "🤝" },
            ].map((step) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-2 border-sky-600 grid place-items-center shadow-md">
                  <span className="text-2xl sm:text-3xl">{step.emoji}</span>
                </div>
                <h3 className="mt-3 text-sm sm:text-base font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-1 text-slate-600 text-xs sm:text-sm leading-relaxed max-w-[34ch]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="w-full bg-white">
        <div className="w-full px-[5vw] sm:px-[8vw] lg:px-[10vw] py-14 sm:py-16">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-2">Benefícios da RecursalPrev</h2>
            <p className="text-slate-600 max-w-[70ch] mx-auto text-sm sm:text-base">
              Cada recurso produzido segue um fluxo jurídico estruturado, que combina metodologia, controle de qualidade e suporte contínuo ao escritório parceiro.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              ["⚖️","Rigor técnico e revisão jurídica","Todas as peças passam por dupla revisão jurídica, garantindo consistência argumentativa, adequação à jurisprudência e segurança na entrega."],
              ["📈","Previsibilidade operacional","Prazos e volumes definidos por plano. Seu escritório sabe exatamente quando e como receberá cada recurso — sem surpresas."],
              ["🕒","Economia de tempo","O escritório ou advogado foca no aumento da carteira de clientes, estratégia e atendimento, enquanto a RecursalPrev cuida dos prazos, com a produção técnica e revisões detalhadas dos recursos."],
              ["🤝","Parceria e suporte contínuo","Atendimento direto e reuniões mensais (planos Pro e Premium) para alinhar padrões, revisar resultados e aprimorar o desempenho conjunto."],
              ["🧩","Padronização e identidade jurídica","Cada recurso segue o estilo, linguagem e identidade do escritório, garantindo coesão e fortalecimento da marca profissional."],
              ["🔒","Confidencialidade e segurança","Todo o fluxo é protegido por canais seguros e controle interno, assegurando a privacidade das informações e dos clientes."],
            ].map(([icon, title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm">
                <div className="text-sky-600 text-2xl sm:text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-base sm:text-lg text-slate-800">{title}</h3>
                <p className="text-slate-600 text-sm mt-2">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="w-full">
        <div className="w-full px-4 sm:px-[8vw] lg:px-[10vw] py-14 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">Planos RecursalPrev</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">Planos elaborados para atender suas necessidades.</p>

          <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 max-w-screen-xl mx-auto">
            {planos.map((p) => {
              const colors = palette[p.nome] || palette.Avulso;
              const isPro = p.nome === "Pro";

              return (
                <div
                  key={p.nome}
                  className={[
                    "relative rounded-2xl border bg-white p-4 sm:p-6 lg:p-7 flex flex-col",
                    "shadow-sm hover:shadow-md transition-shadow",
                    "min-h-[280px] md:min-h-[340px]",
                    colors.border,
                    isPro ? "ring-1 ring-slate-900/10" : "",
                    p.nome === "Avulso Especial" ? "lg:translate-y-[-4px]" : "",
                  ].join(" ")}
                >
                  {isPro && (
                    <span className="absolute -top-3 left-4 bg-slate-900 text-white text-[10px] tracking-wide px-2 py-1 rounded-md">
                      MAIS POPULAR
                    </span>
                  )}

                  <div className="flex-1">
                    <div className="text-lg font-semibold">{p.nome}</div>

                    {/* Preço: não quebrar “R$” */}
                    <div className={["mt-2 font-bold flex items-baseline flex-wrap", colors.price].join(" ")}>
                      {/* <span className="text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight tabular-nums sm:whitespace-nowrap whitespace-normal">
                        {p.preco.replace(" ", "\u00A0")}
                      </span> */}

                      <span className="text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight tabular-nums sm:whitespace-nowrap whitespace-normal">
                        {p.preco.replace(" ", "\u00A0")}
                      </span>



                      {p.nome !== "Avulso" && p.nome !== "Avulso Especial" && (
                        <span className="align-super text-[11px] sm:text-xs md:text-sm text-slate-500 ml-1">
                          {p.sub && (p.sub.includes("mês") ? "/mês" : p.sub.includes("ano") ? "/ano" : `/${p.sub.replace("por ", "")}`)}
                        </span>
                      )}
                    </div>

                    {(p.nome === "Avulso" || p.nome === "Avulso Especial") && (
                      <div className="text-slate-500 text-xs sm:text-sm">por recurso</div>
                    )}

                    {p.extras && <div className="mt-2 text-slate-600 text-sm">{p.extras}</div>}

                    <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                      {p.features.map((f) => <li key={f}>• {f}</li>)}
                    </ul>
                  </div>

                  <button
                    onClick={(e) => { e.preventDefault(); setForm({ ...form, plano: p.nome }); scrollToId("lead"); }}
                    className={["mt-6 h-11 rounded-xl text-white font-medium hover:opacity-95 w-full sm:w-auto", colors.btn].join(" ")}
                  >
                    Selecionar
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section id="lead" className="w-full">
        <div className="w-full px-4 sm:px-[8vw] lg:px-[10vw] py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">Solicite uma proposta</h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">Envie seus dados e retornamos com ascondições para o seu volume.</p>
              <ul className="mt-6 grid gap-2 text-slate-700 text-sm">
                <li>• Proposta em até 5 dia útil</li>
                <li>• Onboarding assistido</li>
                <li>• Suporte com especialista</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 p-4 sm:p-6 bg-white shadow-sm" noValidate>
              {formStatus.ok && (
                <Alert type="success">
                  <strong>Enviado!</strong> Recebemos sua solicitação. Em breve entraremos em contato.
                </Alert>
              )}

              {formStatus.error && (
                <Alert type="error">
                  {formStatus.error}
                </Alert>
              )}

              <div className="grid gap-4">
                <div className="grid gap-1">
                  <label className="text-sm" htmlFor="nome">Nome completo*</label>
                  <input id="nome" className={`h-11 rounded-xl border px-3 w-full ${nomeOk ? "border-slate-300" : "border-rose-400"}`} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Ana Silva" required aria-invalid={!nomeOk} />
                </div>

                <div className="grid gap-1">
                  <label className="text-sm" htmlFor="email">E-mail profissional*</label>
                  <input id="email" type="email" className={`h-11 rounded-xl border px-3 w-full ${emailOk ? "border-slate-300" : "border-rose-400"}`} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nome@escritorio.com.br" required aria-invalid={!emailOk} />
                </div>

                <div className="grid gap-1">
                  <label className="text-sm" htmlFor="whats">WhatsApp</label>
                  <input id="whats" inputMode="tel" className="h-11 rounded-xl border border-slate-300 px-3 w-full" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: maskWhats(e.target.value) })} placeholder="(DD) 9 9999-9999" />
                </div>

                <div className="grid gap-1">
                  <label className="text-sm" htmlFor="plano">Plano selecionado</label>
                  <input id="plano" className="h-11 rounded-xl border border-slate-300 px-3 bg-slate-50 w-full" value={form.plano || "(nenhum)"} readOnly />
                </div>

                <label className="flex items-start gap-3 text-sm mt-1">
                  <input type="checkbox" className="relative top-1" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
                  <span>Concordo com o <a href="#contato" className="underline">tratamento de dados</a> para contato e demonstração (LGPD).</span>
                </label>

                <button
                  type="submit"
                  disabled={!readyToSubmit}
                  className="h-11 rounded-xl bg-slate-900 text-white font-medium hover:opacity-95 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 px-5"
                >
                  {loading && (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4A4 4 0 008 12H4z"></path>
                    </svg>
                  )}
                  {loading ? "Enviando…" : "Enviar solicitação"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER (contatos centralizados + copyright) */}
      <footer id="contato" className="border-t border-slate-200 bg-white">
        <div className="w-full px-[5vw] sm:px-[8vw] lg:px-[10vw] py-10 text-sm text-slate-700 text-center">
          {/* Linha de contatos centralizada */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 mb-6">
            {/* CNPJ */}
            <div className="flex items-center gap-2">
              {/* Ícone documento */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
                <path d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5z"/>
              </svg>
              <span><strong>CNPJ:</strong> 63.391.044/0001-00</span>
            </div>

            {/* Telefone */}
            <div className="flex items-center gap-2">
              {/* Ícone telefone */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24 11.36 11.36 0 0 0 3.56.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.56 1 1 0 0 1-.24 1.01l-2.2 2.2z"/>
              </svg>
              <a href="tel:+5583986169783" className="hover:underline text-sky-700">
                (83) 98616-9783
              </a>
            </div>

            {/* E-mail */}
            <div className="flex items-center gap-2">
              {/* Ícone envelope */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
                <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"/>
              </svg>
              <a href="mailto:contato@recursalprev.com.br" className="hover:underline text-sky-700">
                contato@recursalprev.com.br
              </a>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-2">
              {/* Ícone Instagram */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7zm0 2.5A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zM17.5 6a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 17.5 6z"/>
              </svg>
              <a
                href="https://instagram.com/HaruanaCachorroski"
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-sky-700"
              >
                @HaruanaCachorroski
              </a>
            </div>
          </div>

          {/* Linha divisória */}
          <div className="h-px bg-slate-200 my-4" />

          {/* Copyright */}
          <div className="text-center text-slate-600 text-sm">
            © 2025 RecursalPrev. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

