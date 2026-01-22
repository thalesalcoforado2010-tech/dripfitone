export default function Footer() {
  return (
    <footer className="bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-xs tracking-widest text-white/30">
            © {new Date().getFullYear()} DRIPFIT ONE
          </p>

          <div className="flex gap-6 text-xs text-white/40">
            <a href="#" className="hover:text-white transition">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition">
              Suporte
            </a>
            <a href="#" className="hover:text-white transition">
              Termos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
