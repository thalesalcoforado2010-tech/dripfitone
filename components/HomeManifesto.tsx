"use client";

import { motion } from "framer-motion";

export default function HomeManifesto() {
  return (
    <section className="bg-black py-40">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl leading-snug text-white md:text-3xl"
        >
          Feito para quem transforma energia em movimento.
          <br />
          <span className="text-white/40">
            Para quem vive o agora e constrói o próximo.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
