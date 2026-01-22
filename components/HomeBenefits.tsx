"use client";

import { motion } from "framer-motion";

const items = [
  {
    title: "Tecido técnico premium",
    description:
      "Respirabilidade, elasticidade e toque macio pensados para o uso diário e alta performance.",
  },
  {
    title: "Conforto que acompanha o ritmo",
    description:
      "Modelagem inteligente que se adapta ao corpo sem limitar o movimento.",
  },
  {
    title: "Entrega rápida e confiável",
    description:
      "Logística eficiente para você receber sua peça no tempo certo.",
  },
];

export default function HomeBenefits() {
  return (
    <section className="bg-black py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-20 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="group"
            >
              <h3 className="mb-4 text-lg font-medium text-white">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/55">
                {item.description}
              </p>

              {/* linha viva sutil */}
              <div className="mt-6 h-px w-12 bg-white/10 transition-all duration-300 group-hover:w-20 group-hover:bg-white/25" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
