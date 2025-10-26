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
      nome: "Avulso",
      preco: "R$ 599",
      sub: "por recurso",
      extras: "Uso sob demanda",
      features: ["1 recurso por vez", "Entrega em até 72h úteis"],
    },
    {
      nome: "Lite",
      preco: "R$ 1.999",
      sub: "por mês",
      extras: "Atende demandas sazonais",
      features: [
        "5 recursos por mês",
        "Carência de 1 mês",
        "Suporte via chat",
        "R$ 399 por recurso adicional",
      ],
    },
    {
      nome: "Pro",
      preco: "R$ 7.999",
      sub: "por mês",
      extras: "Ideal para demandas de médio prazo",
      features: [
        "40 recursos por mês",
        "Bônus de 3 recursos no mês",
        "Carência de 6 meses",
        "Suporte via chat",
        "30 minutos/mês em reuniões online",
        "R$ 299 por recurso adicional",
      ],
    },
    {
      nome: "Premium",
      preco: "R$ 9.999",
      sub: "por mês",
      extras: "Ótimo para escalar e padronizar recursos",
      features: [
        "60 recursos por mês",
        "Bônus de 5 recursos no mês",
        "Carência mínima de 12 meses",
        "Suporte jurídico via chat em três processos",
        "60 minutos/mês em reuniões online",
        "R$ 199 por recurso adicional",
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
      // futuramente trocamos por envio real
      await new Promise((r) => setTimeout(r, 700));
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
            <button className="hover:text-slate-900" onClick={() => scrollToId("quem-somos")}>
              Quem somos
            </button>
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
            Solicitar proposta
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
              <button className="text-left py-2" onClick={() => scrollToId("quem-somos")}>
                Quem somos
              </button>
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
                Solicitar proposta
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
            Operando com revisão jurídica especializada
          </div>

          <h1 className="mt-3 text-center text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            <ReactTyped
              strings={["Recursos previdenciários padronizados e com qualidade"]}
              typeSpeed={60}
              backSpeed={10}
              showCursor={true}
            />
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Atendemos escritórios que desejam escalar a elaboração de recursos previdenciários com
            padronização, qualidade e previsibilidade operacional.
          </p>

          <ul className="mt-6 grid gap-3 text-slate-700">
            <li>• Argumentação com base em casos e jurisprudência</li>
            <li>• Processo consolidado com dupla revisão técnica especializada</li>
            <li>• Estilo e padronização adaptados ao seu escritório</li>
          </ul>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollToId("lead")}
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-medium"
            >
              Solicitar proposta
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

      {/* QUEM SOMOS */}

        <section id="quem-somos" className="w-full px-6 md:px-12 py-16 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-10 text-slate-900 border-b border-slate-200 pb-2">
              Quem Somos
            </h2>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
              {/* FOTO À ESQUERDA */}
              <div className="flex-shrink-0">
                <div className="w-[280px] h-[340px] rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                  <img
                    src="Haruana.png"
                    alt="Dr. Haruanã Cachorroski Cardoso"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              {/* TEXTO À DIREITA */}
              <div className="flex-1 text-slate-800 leading-relaxed">
                <p className="text-lg text-slate-700 mb-4">
                  A <strong>RecursalPrev</strong> nasceu para fortalecer a credibilidade e a eficiência dos
                  escritórios parceiros, oferecendo operação padronizada, revisão jurídica especializada e
                  previsibilidade no fluxo de produção de recursos previdenciários.
                </p>

                <h3 className="text-xl font-semibold mt-6">Fundador e CEO</h3>
                <p className="uppercase text-sm text-slate-500 tracking-wide mb-3">
                  Dr. Haruanã Cachorroski Cardoso
                </p>

                <p className="text-slate-700 mb-4">
                  Com quase <strong>20 anos de atuação</strong> em prática recursal, o Dr. Haruanã é reconhecido
                  por sua ética e excelência técnica em sustentações orais e peças recursais. Também é
                  idealizador do <strong>Canal “Advogado dos Advogados”</strong>, iniciativa que amplia a
                  visibilidade e a autoridade de profissionais e escritórios por meio de conteúdo jurídico de
                  alta qualidade.
                </p>

                <div className="text-sm text-slate-600 mt-4">
                  <a
                    href="https://instagram.com/HaruanaCachorroski"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-slate-900 hover:underline"
                  >
                    @HaruanaCachorroski
                  </a>
                  <div>haruanacachorroski@gmail.com • (83) 98803-0180</div>
                </div>
              </div>
            </div>
          </div>
        </section>



      {/* COMO FUNCIONA (âncora simples) */}


<section id="como-funciona" className="w-full px-6 md:px-10 py-16 bg-slate-50">
  <div className="max-w-6xl mx-auto text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-semibold mb-2">Como a RecursalPrev funciona</h2>
    <p className="text-slate-600 max-w-2xl mx-auto">
      Etapas claras, revisão técnica e entregas dentro do prazo — do envio ao recurso final, você acompanha tudo com transparência.
    </p>
  </div>

  {/* mobile: 1 col | desktop: 6 cols */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-6">
    {[
      { title: "Envio do caso", text: "Você encaminha o processo e observações pelo canal seguro da RecursalPrev.", image: "/images/icons/1-envio.svg" },
      { title: "Análise inicial", text: "Revisamos documentos e definimos a melhor estratégia recursal.", image: "/images/icons/2-analise.svg" },
      { title: "Elaboração", text: "O recurso é redigido conforme precedentes e o padrão do seu escritório.", image: "/images/icons/3-elaboracao.svg" },
      { title: "Revisão técnica", text: "Dupla revisão jurídica assegura consistência argumentativa e qualidade técnica.", image: "/images/icons/4-revisao.svg" },
      { title: "Entrega e ajustes", text: "Entrega no prazo do plano, com histórico e possibilidade de ajustes.", image: "/images/icons/5-entrega.svg" },
      { title: "Acompanhamento", text: "Suporte contínuo e reuniões periódicas nos planos Pro e Premium.", image: "/images/icons/6-acompanhamento.svg" },
    ].map((step) => (
      <div key={step.title} className="flex flex-col items-center text-center">
        <div className="w-20 h-20 md:w-20 md:h-20 rounded-full bg-sky-600 grid place-items-center shadow-md">
          <img src={step.image} alt={step.title} className="w-10 h-10 object-contain block" />
        </div>
        <h3 className="mt-3 text-base md:text-sm font-semibold text-slate-900">{step.title}</h3>
        <p className="mt-1 text-slate-600 text-base md:text-sm leading-relaxed max-w-[34ch]">
          {step.text}
        </p>
      </div>
    ))}
  </div>
</section>




      {/* BENEFÍCIOS */}
   

      <section id="beneficios" className="w-full px-6 md:px-10 py-16 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-2">Benefícios da RecursalPrev</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Cada recurso produzido segue um fluxo jurídico estruturado, que combina metodologia, 
            controle de qualidade e suporte contínuo ao escritório parceiro.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Benefício 1 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm">
            <div className="text-sky-600 text-3xl mb-3">⚖️</div>
            <h3 className="font-semibold text-lg text-slate-800">Rigor técnico e revisão jurídica</h3>
            <p className="text-slate-600 text-sm mt-2">
              Todas as peças passam por dupla revisão jurídica, garantindo consistência argumentativa, 
              adequação à jurisprudência e segurança na entrega.
            </p>
          </div>

          {/* Benefício 2 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm">
            <div className="text-sky-600 text-3xl mb-3">📈</div>
            <h3 className="font-semibold text-lg text-slate-800">Previsibilidade operacional</h3>
            <p className="text-slate-600 text-sm mt-2">
              Prazos e volumes definidos por plano. Seu escritório sabe exatamente quando e 
              como receberá cada recurso — sem surpresas.
            </p>
          </div>

          {/* Benefício 3 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm">
            <div className="text-sky-600 text-3xl mb-3">🕒</div>
            <h3 className="font-semibold text-lg text-slate-800">Economia de tempo</h3>
            <p className="text-slate-600 text-sm mt-2">
              O escritório foca na estratégia e no atendimento, enquanto a RecursalPrev 
              cuida da produção técnica e das revisões detalhadas.
            </p>
          </div>

          {/* Benefício 4 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm">
            <div className="text-sky-600 text-3xl mb-3">🤝</div>
            <h3 className="font-semibold text-lg text-slate-800">Parceria e suporte contínuo</h3>
            <p className="text-slate-600 text-sm mt-2">
              Atendimento direto e reuniões mensais (planos Pro e Premium) para alinhar 
              padrões, revisar resultados e aprimorar o desempenho conjunto.
            </p>
          </div>

          {/* Benefício 5 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm">
            <div className="text-sky-600 text-3xl mb-3">🧩</div>
            <h3 className="font-semibold text-lg text-slate-800">Padronização e identidade jurídica</h3>
            <p className="text-slate-600 text-sm mt-2">
              Cada recurso segue o estilo, linguagem e identidade do escritório, 
              garantindo coesão e fortalecimento da marca profissional.
            </p>
          </div>

          {/* Benefício 6 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm">
            <div className="text-sky-600 text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-lg text-slate-800">Confidencialidade e segurança</h3>
            <p className="text-slate-600 text-sm mt-2">
              Todo o fluxo é protegido por canais seguros e controle interno, 
              assegurando a privacidade das informações e dos clientes.
            </p>
          </div>
        </div>
      </section>



      {/* PLANOS */}
      <section id="planos" className="w-full px-4 md:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center">Planos RecursalPrev</h2>
        <p className="text-sm text-slate-500 mt-1 text-center">
          Planos elaborados para atender suas necessidades.
        </p>

        {/* GRID: 4 cards na mesma linha, centralizados e responsivos */}
        <div className="mt-8 flex flex-wrap justify-center items-stretch gap-6">
          {planos.map((p) => {
            // paleta por plano
            const palette = {
              Avulso: { border: "border-slate-200", price: "text-slate-800", btn: "bg-slate-900" },
              Lite: { border: "border-sky-300", price: "text-sky-700", btn: "bg-sky-600" },
              Pro: { border: "border-slate-900", price: "text-slate-900", btn: "bg-slate-900" }, // destaque
              Premium: { border: "border-amber-500", price: "text-amber-600", btn: "bg-amber-500" },
            };
            const colors = palette[p.nome] || palette.Avulso;
            const isPro = p.nome === "Pro";

            return (
              <div
                key={p.nome}
                className={[
                  "relative w-full sm:w-[48%] md:w-[45%] lg:w-[22%] xl:w-[20%]",
                  "rounded-2xl border bg-white p-6 flex flex-col transition-transform",
                  colors.border,
                  isPro ? "shadow-xl scale-[1.03]" : "",
                ].join(" ")}
              >
                {/* selo somente no PRO */}
                {isPro && (
                  <span className="absolute -top-3 left-4 bg-slate-900 text-white text-[10px] tracking-wide px-2 py-1 rounded-md">
                    MAIS POPULAR
                  </span>
                )}

                <div className="flex-1">
                  <div className="text-lg font-semibold">{p.nome}</div>

                  {/* Preço + período (elevado) */}
                  <div className={["mt-2 font-bold flex items-start", colors.price].join(" ")}>
                    <span className="text-3xl md:text-4xl">{p.preco}</span>
                    {p.nome !== "Avulso" && (
                      <span className="align-super text-xs md:text-sm text-slate-500 ml-1">
                        {p.sub?.includes("mês") ? "/mês" : p.sub?.includes("ano") ? "/ano" : `/${p.sub?.replace("por ", "") || "mês"}`}
                      </span>
                    )}
                  </div>

                  {/* Linha do subtítulo apenas no Avulso */}
                  {p.nome === "Avulso" && (
                    <div className="text-slate-500 text-sm">{p.sub}</div>
                  )}

                  {p.extras && <div className="mt-2 text-slate-600 text-sm">{p.extras}</div>}
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
                  className={[
                    "mt-6 h-11 rounded-xl text-white font-medium hover:opacity-95",
                    colors.btn,
                  ].join(" ")}
                >
                  Selecionar
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FORMULÁRIO (proposta) */}
      <section id="lead" className="w-full px-4 md:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Solicite uma proposta</h2>
            <p className="mt-3 text-slate-600">
              Envie seus dados e retornamos em até 1 dia útil com condições para o seu volume.
            </p>
            <ul className="mt-6 grid gap-2 text-slate-700 text-sm">
              <li>• Proposta em até 1 dia útil</li>
              <li>• Onboarding assistido</li>
              <li>• Suporte com especialista</li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-200 p-4 sm:p-6 bg-white shadow-sm"
            noValidate
          >
            {status.ok && (
              <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-800">
                Obrigado! Recebemos sua solicitação. Em breve entraremos em contato.
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
                {loading ? "Enviando…" : "Enviar solicitação"}
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
