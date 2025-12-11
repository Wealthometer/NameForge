export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-border overflow-hidden">
      {/* Spotlight background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-32 spotlight-green opacity-20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              NameForge
            </h2>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          {/* Copyright */}
          <div className="text-muted-foreground text-sm">
            Built with ❤️ by <span className="text-primary font-semibold">MiladiCode</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
