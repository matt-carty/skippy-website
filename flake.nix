{
  description = "Skippy English School — Astro + TinaCMS dev environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          name = "skippy-english-school";

          packages = with pkgs; [
            # Node — TinaCMS requires active LTS (20 or 22)
            nodejs_22

            # pnpm — recommended by Astro and TinaCMS docs
            pnpm

            # Git — required by TinaCMS for local content commits
            git

            # Sharp dependencies — Astro uses Sharp for image optimisation
            # Sharp bundles its own binary but needs these at runtime on NixOS
            vips
            pkg-config

            # Useful during development
            typescript
            typescript-language-server
          ];

          # Tell Sharp where to find the native vips library on NixOS
          # Without this, Astro's image optimisation will fail at build time
          shellHook = ''
            export PKG_CONFIG_PATH="${pkgs.vips}/lib/pkgconfig:$PKG_CONFIG_PATH"
            export LD_LIBRARY_PATH="${pkgs.vips}/lib:${pkgs.glib.out}/lib:$LD_LIBRARY_PATH"

            echo ""
            echo "🦘 Skippy English School dev environment ready"
            echo ""
            echo "  First time setup:"
            echo "    pnpm install"
            echo ""
            echo "  Start Astro + Tina together:"
            echo "    pnpm dev"
            echo ""
            echo "  Tina admin (local mode):"
            echo "    http://localhost:4321/admin/index.html"
            echo ""
          '';
        };
      }
    );
}
