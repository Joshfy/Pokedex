import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";

/** Pokéball SVG icon */
const PokeballIcon = () => (
  <svg
    viewBox="0 0 100 100"
    className="h-7 w-7"
    aria-hidden="true"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" />
    <path d="M2 50 H98" stroke="currentColor" strokeWidth="4" />
    <circle cx="50" cy="50" r="13" fill="currentColor" />
    <circle cx="50" cy="50" r="8" fill="white" />
    {/* Top half */}
    <path d="M2 50 A48 48 0 0 1 98 50" fill="currentColor" opacity="0.15" />
  </svg>
);

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-80"
        >
          <PokeballIcon />
          <span className="text-lg font-bold tracking-tight">
            Pokédex
          </span>
          <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary sm:inline-block">
            ByJosue
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <span className="hidden text-xs text-muted-foreground sm:block">
            Presiona{" "}
            <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-xs font-mono">
              D
            </kbd>{" "}
            para cambiar tema
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
