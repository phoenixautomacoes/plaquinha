import { renderToString } from "react-dom/server";
import { AppShell } from "./AppShell";

export function render() {
  return renderToString(<AppShell />);
}

import { SITE_URL, plans } from "./components/landing/content";

export const origin = SITE_URL;
export const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://phoenixautomacoes.com.br/#organization",
      name: "Phoenix Automações",
      url: "https://phoenixautomacoes.com.br/",
      logo: `${origin}/logo-fenix2.png`,
    },
    {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      name: "Phoenix NFC Pro",
      url: `${origin}/`,
      inLanguage: "pt-BR",
      publisher: { "@id": "https://phoenixautomacoes.com.br/#organization" },
    },
    {
      "@type": "Product",
      "@id": `${origin}/#placa`,
      name: "Placa Balcão Express — Phoenix NFC Pro",
      description:
        "Placa de acrílico de 10 × 15 cm personalizada com nome e logo, NFC configurado e QR Code para balcão.",
      image: `${origin}/og-placa.png`,
      brand: { "@type": "Brand", name: "Phoenix Automações" },
      offers: {
        "@type": "Offer",
        url: `${origin}/#precos`,
        priceCurrency: "BRL",
        price: plans[0].price.toFixed(2),
        seller: { "@id": "https://phoenixautomacoes.com.br/#organization" },
      },
    },
  ],
};
