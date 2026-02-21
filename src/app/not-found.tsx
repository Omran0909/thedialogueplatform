import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-content px-6 py-24">
      <div className="surface-card mx-auto max-w-prose p-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-secondary">404</p>
        <h1 className="mt-4 text-4xl text-text-primary">Page not found</h1>
        <p className="mt-4 text-base text-text-secondary">
          The page you are looking for has moved or does not exist yet.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0d3f4c]"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
