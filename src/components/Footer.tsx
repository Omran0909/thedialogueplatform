export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-32">
      <div className="max-w-5xl mx-auto px-8 py-12">
        <p className="text-text-secondary text-sm">
          The Dialogue Platform · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
