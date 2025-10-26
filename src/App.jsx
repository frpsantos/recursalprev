import React, { useState } from "react";
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
  const FORMSPREE_ENDPOINT = "";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ use formStatus para evitar conflito com window.status
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

  const planos = [
    { nome: "Avulso", preco: "R$ 599", sub: "por recurso", extras: "Uso sob demanda", features: ["1 recurso por vez", "Entrega em até 7 dias úteis"] },
    { nome: "Lite", preco: "R$ 1.999", sub: "por mês", extras: "Atende demandas sazonais", features: ["5 recursos por mês","Carência de 1 mês","Suporte via chat","R$ 499 por recurso adicional"] },
    { nome: "Pro", preco: "R$ 7.999", sub: "por mês", extras: "Ideal para demandas de médio prazo", features: ["40 recursos por mês","Bônus de 3 recursos no mês","Carência de 6 meses","Suporte via chat","30 minutos/mês em reuniões online","R$ 299 por recurso adicional"] },
    { nome: "Premium", preco: "R$ 9.999", sub: "por mês", extras: "Ótimo para escalar e padronizar recursos", features: ["60 recursos por mês","Bônus de 5 recursos no mês","Carência mínima de 12 meses","Suporte via chat","60 minutos/mês em reuniões online","R$ 199 por recurso adicional"] },
  ];

  function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }

  // ✅ handleSubmit real chamando a API da Vercel
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setFormStatus({ ok: false, error: "" }); // zera estado anterior

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      {/* HEADER (full width com padding dinâmico) */}
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
      <section
        id="top"
        className="w-full px-[5vw] sm:px-[8vw] lg:px-[10vw] pt-20 sm:pt-24 pb-12 sm:pb-16 text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-slate-100 text-slate-700">
          {/* Operando com revisão jurídica especializada */}
        </div>

        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
          <ReactTyped
            strings={["Recursos previdenciários padronizados e com qualidade"]}
            typeSpeed={60}
            backSpeed={10}
            showCursor
          />
        </h1>

        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-[70ch] mx-auto">
          Atendemos escritórios e advogados que desejam escalar a elaboração de recursos previdenciários com padronização, qualidade, previsibilidade operacional, redução de custos operacionais e aumento de receita.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button onClick={() => scrollToId("lead")} className="px-5 py-3 rounded-xl bg-slate-900 text-white font-medium hover:opacity-95">
            Solicitar proposta
          </button>
          <button onClick={() => scrollToId("planos")} className="px-5 py-3 rounded-xl border border-slate-300 font-medium hover:bg-slate-50">
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
                <img src="Haruana.png" alt="Dr. Haruanã Cachorroski Cardoso" className="w-full h-full object-cover object-top" />
              </div>
            </div>

            <div className="text-slate-800 leading-relaxed">
              <p className="text-base sm:text-lg text-slate-700 mb-4">
                A <strong>RecursalPrev</strong> nasceu para fortalecer a credibilidade e a eficiência dos escritórios parceiros, oferecendo operação padronizada, revisão jurídica especializada e previsibilidade no fluxo de produção de recursos previdenciários.
              </p>

              <h3 className="text-lg sm:text-xl font-semibold mt-6">Fundador e CEO</h3>
              <p className="uppercase text-xs sm:text-sm text-slate-500 tracking-wide mb-3">Dr. Haruanã Cachorroski Cardoso</p>

              <p className="text-slate-700 mb-4">
                Com quase <strong>20 anos de atuação</strong> em prática recursal, o Dr. Haruanã é reconhecido por sua ética e excelência técnica em sustentações orais e peças recursais. Também é idealizador do <strong>Canal “Advogado dos Advogados”</strong>, iniciativa que amplia a visibilidade e a autoridade de profissionais e escritórios por meio de conteúdo jurídico de alta qualidade.
              </p>

              <div className="text-sm text-slate-600 mt-4 space-y-1">
                <a href="https://instagram.com/HaruanaCachorroski" target="_blank" rel="noreferrer" className="font-semibold text-slate-900 hover:underline">
                  @HaruanaCachorroski
                </a>
                <div>haruanacachorroski@gmail.com • (83) 98803-0180</div>
              </div>
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
        <div className="w-full px-[5vw] sm:px-[8vw] lg:px-[10vw] py-14 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">Planos RecursalPrev</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 text-center">Planos elaborados para atender suas necessidades.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {planos.map((p) => {
              const palette = {
                Avulso: { border: "border-slate-200", price: "text-slate-800", btn: "bg-slate-900" },
                Lite: { border: "border-sky-300", price: "text-sky-700", btn: "bg-sky-600" },
                Pro: { border: "border-slate-900", price: "text-slate-900", btn: "bg-slate-900" },
                Premium: { border: "border-amber-500", price: "text-amber-600", btn: "bg-amber-500" },
              };
              const colors = palette[p.nome] || palette.Avulso;
              const isPro = p.nome === "Pro";

              return (
                <div
                  key={p.nome}
                  className={[
                    "relative rounded-2xl border bg-white p-6 flex flex-col",
                    "shadow-sm hover:shadow-md transition-shadow",
                    "min-h-[340px]",
                    colors.border,
                    isPro ? "ring-1 ring-slate-900/10" : "",
                  ].join(" ")}
                >
                  {isPro && (
                    <span className="absolute -top-3 left-4 bg-slate-900 text-white text-[10px] tracking-wide px-2 py-1 rounded-md">
                      MAIS POPULAR
                    </span>
                  )}

                  <div className="flex-1">
                    <div className="text-lg font-semibold">{p.nome}</div>
                    <div className={["mt-2 font-bold flex items-start", colors.price].join(" ")}>
                      <span className="text-3xl md:text-4xl">{p.preco}</span>
                      {p.nome !== "Avulso" && (
                        <span className="align-super text-xs md:text-sm text-slate-500 ml-1">
                          {p.sub && (p.sub.includes("mês") ? "/mês" : p.sub.includes("ano") ? "/ano" : `/${p.sub.replace("por ", "")}`)}
                        </span>
                      )}
                    </div>
                    {p.nome === "Avulso" && <div className="text-slate-500 text-sm">{p.sub}</div>}
                    {p.extras && <div className="mt-2 text-slate-600 text-sm">{p.extras}</div>}
                    <ul className="mt-4 grid gap-2 text-sm text-slate-700">
                      {p.features.map((f) => <li key={f}>• {f}</li>)}
                    </ul>
                  </div>

                  <button
                    onClick={(e) => { e.preventDefault(); setForm({ ...form, plano: p.nome }); scrollToId("lead"); }}
                    className={["mt-6 h-11 rounded-xl text-white font-medium hover:opacity-95", colors.btn].join(" ")}
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
        <div className="w-full px-[5vw] sm:px-[8vw] lg:px-[10vw] py-14 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold">Solicite uma proposta</h2>
              <p className="mt-3 text-slate-600 text-sm sm:text-base">Envie seus dados e retornamos em até 1 dia útil com condições para o seu volume.</p>
              <ul className="mt-6 grid gap-2 text-slate-700 text-sm">
                <li>• Proposta em até 5 dia útil</li>
                <li>• Onboarding assistido</li>
                <li>• Suporte com especialista</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 p-4 sm:p-6 bg-white shadow-sm" noValidate>
              {/* Feedback de envio */}
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
                  <input id="nome" className="h-11 rounded-xl border border-slate-300 px-3 w-full" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Ana Silva" required />
                </div>

                <div className="grid gap-1">
                  <label className="text-sm" htmlFor="email">E-mail profissional*</label>
                  <input id="email" type="email" className="h-11 rounded-xl border border-slate-300 px-3 w-full" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="nome@escritorio.com.br" required />
                </div>

                <div className="grid gap-1">
                  <label className="text-sm" htmlFor="whats">WhatsApp</label>
                  <input id="whats" className="h-11 rounded-xl border border-slate-300 px-3 w-full" value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="(DDD) 9 9999-9999" />
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
                  disabled={loading}
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

      {/* FOOTER */}
      <footer id="contato" className="border-t border-slate-200">
        <div className="w-full px-[5vw] sm:px-[8vw] lg:px-[10vw] py-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
          <div>
            <div className="font-semibold">RecursalPrev</div>
            <p className="text-slate-600 text-sm mt-1">Recursos previdenciários para escritórios.</p>
          </div>
          <div className="md:justify-self-end text-sm text-slate-600">contato@recursalprev.com.br</div>
        </div>
      </footer>
    </div>
  );
}
