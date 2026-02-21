import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/dialogues", label: "Dialogues" },
  { href: "/events", label: "Events" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-line/80 bg-background/90 backdrop-blur-md">
        <div className="mx-auto max-w-content px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-md text-text-primary"
              aria-label={`${siteConfig.name} home`}
            >
              <Image
                src="/assets/logo.png"
                alt={siteConfig.name}
                width={40}
                height={40}
                className="rounded-md object-contain"
                priority
              />
              <div className="leading-tight">
                <span className="block text-sm font-semibold">{siteConfig.name}</span>
                <span className="hidden text-xs text-text-secondary sm:block">Trust and Peace Through Dialogue</span>
              </div>
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="rounded-sm text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                >
                  {label}
                </Link>
              ))}
              <a
                href={siteConfig.socialChannels[0].href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent hover:text-white"
              >
                Official channels
              </a>
            </div>

            <details className="group relative md:hidden">
              <summary className="cursor-pointer list-none rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-text-primary">
                Menu
              </summary>
              <div className="absolute right-0 mt-3 w-64 rounded-xl border border-line bg-surface p-3 shadow-lg">
                <div className="flex flex-col gap-2">
                  {navLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-accent-soft hover:text-text-primary"
                    >
                      {label}
                    </Link>
                  ))}
                  <a
                    href={siteConfig.socialChannels[0].href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md px-3 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft"
                  >
                    Official channels
                  </a>
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="mt-20 border-t border-line/80 bg-[#f8f5ee]">
        <div className="mx-auto max-w-content px-6 py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-semibold text-text-primary">{siteConfig.name}</p>
              <p className="mt-2 text-sm text-text-secondary">
                Building trust and peace through inclusive dialogue design and institutional collaboration.
              </p>
              <p className="mt-3 text-xs text-text-secondary">
                In collaboration with {siteConfig.partners.join(" and ")}.
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">Navigate</p>
              <div className="mt-3 flex flex-col gap-2">
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="w-fit text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">Official Channels</p>
              <div className="mt-3 flex flex-col gap-2">
                {siteConfig.socialChannels.map((channel) => (
                  <a
                    key={channel.href}
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit text-sm text-accent transition-colors hover:text-text-primary"
                  >
                    {channel.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-text-primary">Contact</p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-3 block w-fit text-sm text-accent underline-offset-4 hover:underline"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          <p className="mt-10 border-t border-line/80 pt-6 text-xs text-text-secondary">
            {siteConfig.name} {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
