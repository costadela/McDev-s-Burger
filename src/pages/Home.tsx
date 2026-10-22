import { Link } from "react-router-dom";
import { Flame, Beef, Terminal } from "lucide-react";

const destaques = [
  {
    icon: Flame,
    titulo: "Chapa na hora",
    texto: "Seu burger preparado na hora, do primeiro ao último ingrediente.",
  },
  {
    icon: Beef,
    titulo: "Blend artesanal",
    texto: "Carne suculenta, queijo derretido e bacon crocante.",
  },
  {
    icon: Terminal,
    titulo: "Pedido em 3 cliques",
    texto: "Escolheu, confirmou, pronto. Sem bug.",
  },
];

const btnBase =
  "inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-bold transition duration-200 hover:-translate-y-0.5 w-full sm:w-auto";

export default function Home() {
  return (
    <main className="overflow-x-hidden bg-black text-white">
      {/* HERO */}
      <section className="relative mx-auto grid max-w-300 items-center gap-8 px-6 pt-8 pb-6 md:grid-cols-[1.05fr_1fr] md:px-12 md:pt-20 md:pb-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[10%] right-[-10%] size-[60vw] max-h-175 max-w-175 rounded-full bg-[radial-gradient(circle,rgba(255,164,27,0.28),transparent_65%)] blur-3xl"
        />

        {/* Texto */}
        <div className="relative z-10">
          <span className="inline-block rounded-full border border-[#ffa41b]/40 bg-[#ffa41b]/10 px-4 py-1.5 font-mono text-sm text-[#ffa41b]">
            {"</>"} hambúrguer artesanal
          </span>

          <h1 className="mt-5 mb-4 text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.05] font-extrabold tracking-tight">
            Sabor de verdade,
            <br />
            <span className="bg-linear-to-r from-[#ffa41b] to-[#ff7a00] bg-clip-text text-transparent">
              feito pra devs.
            </span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg">
            Pão brioche tostado, carne suculenta e ingredientes de qualidade. O
            único deploy que você vai querer fazer em produção às 19h.
          </p>

          <div className="mt-8 mb-6 flex flex-wrap items-center gap-4">
            <Link
              to="/login"
              className={`${btnBase} bg-linear-to-br from-[#ffa41b] to-[#ff7a00] text-neutral-900 shadow-[0_8px_30px_rgba(255,140,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,140,0,0.55)]`}
            >
              Pedir agora 🍔
            </Link>

            <pre
              aria-hidden="true"
              className="bg-neutral m-0 inline-block rounded-xl border border-neutral-800 px-5 py-3.5 font-mono text-sm leading-relaxed text-neutral-300"
            >
              <code>
                <span className="text-purple-400">const</span> fome ={" "}
                <span className="text-blue-400">true</span>;{"\n"}
                <span className="text-purple-400">if</span> (fome){" "}
                <span className="text-[#ffa41b]">pedirAgora</span>();
              </code>
            </pre>
          </div>
        </div>

        {/* Imagem */}
        <div className="relative z-10 order-first md:order-0">
          <img
            src="/hero-burger.png"
            alt="Cheeseburger artesanal com bacon, queijo cheddar e molho especial"
            className="block w-full rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,0.6)] motion-safe:animate-[float_6s_ease-in-out_infinite]"
          />
          <span className="absolute top-[8%] left-[2%] rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-semibold whitespace-nowrap backdrop-blur motion-safe:animate-[float_5s_ease-in-out_infinite] md:left-[-4%]">
            🧀 Cheddar derretido
          </span>
          <span className="absolute right-[2%] bottom-[10%] rounded-full border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm font-semibold whitespace-nowrap backdrop-blur [animation-delay:1.2s] motion-safe:animate-[float_5s_ease-in-out_infinite] md:right-[-3%]">
            🥓 Bacon crocante
          </span>
        </div>
      </section>

      {/* DESTAQUES */}
      <section className="mx-auto grid max-w-300 gap-5 px-6 pt-4 pb-16 md:grid-cols-3 md:px-12">
        {destaques.map((d) => {
          const Icon = d.icon;

          return (
            <article
              key={d.titulo}
              className="bg-neutral rounded-2xl border border-neutral-800 p-6 transition duration-200 hover:-translate-y-1 hover:border-[#ffa41b]"
            >
              <Icon
                size={30}
                strokeWidth={1.8}
                className="text-[#ffa41b]"
                aria-hidden="true"
              />

              <h3 className="mt-3 mb-1.5 text-lg font-semibold">{d.titulo}</h3>

              <p className="text-[0.95rem] leading-normal text-neutral-400">
                {d.texto}
              </p>
            </article>
          );
        })}
      </section>

      {/* CTA FINAL */}
      <section className="bg-neutral mx-6 mb-16 rounded-[28px] border border-[#ffa41b]/25 px-6 py-14 text-center md:mx-auto md:max-w-250">
        <h2 className="mb-2.5 text-[clamp(1.8rem,4vw,2.6rem)] font-bold">
          Deu fome? <span className="text-[#ffa41b]">Bora de deploy.</span>
        </h2>

        <p className="mb-7 text-neutral-400">
          Escolha seu burger favorito e receba quentinho.
        </p>
        <Link
          to="/Menu"
          className={`${btnBase} bg-linear-to-br from-[#ffa41b] to-[#ff7a00] px-10 py-4 text-lg text-neutral-900 shadow-[0_8px_30px_rgba(255,140,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,140,0,0.55)]`}
        >
          Ver cardápio →
        </Link>
      </section>
    </main>
  );
}
