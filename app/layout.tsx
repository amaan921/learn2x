import type { Metadata } from "next";
import "./globals.css";

const title = "Online Tuition Classes 6–10 | Maths, Science & English | Learn2X";
const description = "Learn2X online tuition for CBSE Classes 6–10 in Maths, Science and English. NCERT practice, board revision and fresh Class 9 & 10 batches. Request a demo.";
export const metadata: Metadata = {
  metadataBase: new URL("https://learn2x.in"),
  title,
  description,
  alternates: {canonical: "/"},
  openGraph: {title, description, url:"https://learn2x.in", siteName:"Learn2X Classes", type:"website", locale:"en_IN"},
  twitter: {card:"summary",title,description},
  icons: {icon:"/favicon.svg",shortcut:"/favicon.svg"},
};
const organization = {
  "@context":"https://schema.org",
  "@type":"EducationalOrganization",
  "name":"Learn2X Classes",
  "url":"https://learn2x.in",
  "description":description,
  "email":"learn2xclasses@gmail.com",
  "telephone":"+91 9310429249",
  "hasOfferCatalog":{
    "@type":"OfferCatalog",
    "name":"Online tuition for Classes 6–10",
    "itemListElement":["Mathematics","Science","English"].map(name=>({
      "@type":"Offer",
      "itemOffered":{"@type":"Service","name":name+" online tuition for Classes 6–10","serviceType":"Online tuition","provider":{"@type":"EducationalOrganization","name":"Learn2X Classes"}}
    }))
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization).replace(/</g,"\\u003c")}}/>{children}</body>
    </html>
  );
}
