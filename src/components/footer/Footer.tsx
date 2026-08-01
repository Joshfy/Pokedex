import { Globe, Code2, ExternalLink, ArrowUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-border/40 bg-background/80 backdrop-blur-md support-[backdrop-filter]:bg-background/50 py-8 mt-auto overflow-hidden">
      {/* Glow ambiental de fondo */}
      <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 h-32 w-96 rounded-full bg-primary/10 blur-3xl opacity-50" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Branding & Dev Credits */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <div className="flex items-center gap-2 font-black text-lg tracking-tight text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Code2 className="h-4 w-4" />
            </div>
            <span>Pokédex <span className="text-primary font-mono text-sm font-normal">v1.0</span></span>
          </div>
          <p className="text-xs text-muted-foreground flex flex-wrap items-center justify-center md:justify-start gap-1">
            Desarrollado por{" "}
            <span className="font-bold text-foreground bg-linear-to-r from-foreground via-primary to-foreground bg-clip-text">
              Josue Dolores Espinoza
            </span>
          </p>
        </div>

        {/* Portfolio Button & Action */}
        <div className="flex items-center gap-3">
          <a
            href="https://josue-dev.sistempost.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:shadow-md hover:scale-105"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary transition-transform group-hover:rotate-12" />
            <span>Mi Portafolio</span>
            <Globe className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
            <ExternalLink className="h-3 w-3 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollToTop}
            className="h-9 w-9 rounded-xl border-border/50 bg-background/50 hover:bg-muted transition-all hover:scale-105"
            title="Volver arriba"
            aria-label="Volver arriba"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-muted-foreground font-medium">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
