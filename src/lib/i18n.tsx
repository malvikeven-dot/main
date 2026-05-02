"use client";

import React, { createContext, useContext, useState } from "react";

type Locale = "en" | "no";

const translations = {
  en: {
    nav: {
      product: "Product",
      pricing: "Pricing",
      about: "About",
      getStarted: "Get started",
    },
    hero: {
      badge: "Built in Norway, works everywhere",
      headline: "The future of payments",
      headlineBold: "is stablecoin.",
      subtext:
        "Send money globally in seconds. No hidden fees, no delays. Powered by USDC and EURC on Base blockchain.",
      cta1: "Get started",
      cta2: "For business",
      stat1: "Transaction fee",
      stat2: "Settlement time",
      stat3: "Countries supported",
    },
    trustBar: {
      label: "Powered by",
    },
    problem: {
      tag: "The problem with banks",
      headline: "Your bank charges 3%.",
      headlineBold: "We charge 0.3%.",
      subtext:
        "Traditional banks take up to 3–5% on international transfers, plus hidden FX markups and days of waiting. Malvik settles in seconds, transparently, on-chain.",
      card1Title: "Traditional Bank Transfer",
      card1Fee: "2–5% fee + FX markup",
      card1Time: "1–5 business days",
      card1Hidden: "Hidden charges",
      card2Title: "Malvik Payment",
      card2Fee: "0.3% flat fee",
      card2Time: "< 10 seconds",
      card2Hidden: "Fully transparent",
    },
    features: {
      tag: "Why Malvik",
      headline: "Payments that actually work",
      subtext:
        "Everything you need to send, receive and manage global payments — built for Norwegian businesses and consumers.",
      f1Title: "Instant global payments",
      f1Desc:
        "Send to any wallet or bank account worldwide. Transactions settle in under 10 seconds, 24/7/365.",
      f2Title: "Multi-currency support",
      f2Desc:
        "Hold and transact in NOK, USDC, and EURC. Seamless conversion with transparent, real-time rates.",
      f3Title: "Built for Norway",
      f3Desc:
        "BankID onboarding, Fiken & Tripletex integrations, and full Finanstilsynet compliance.",
    },
    howItWorks: {
      tag: "Simple process",
      headline: "Up and running in minutes",
      step1Title: "Sign up",
      step1Desc: "Create your account with BankID. Instant KYC verification.",
      step2Title: "Fund account",
      step2Desc:
        "Deposit NOK via bank transfer or convert directly to USDC/EURC.",
      step3Title: "Send anywhere",
      step3Desc:
        "Pay invoices, send remittances, or integrate via our API — instantly.",
    },
    b2b: {
      tag: "For business",
      headline: "Power your business with stablecoin rails",
      subtext:
        "Integrate Malvik into your existing workflow. Connect to your accounting software and start settling cross-border invoices in minutes.",
      feature1: "RESTful API with full documentation",
      feature2: "Webhooks for real-time payment events",
      feature3: "Fiken & Tripletex native integrations",
      feature4: "Multi-user accounts with role-based access",
      feature5: "Automated reconciliation",
      feature6: "Bulk payment processing",
      cta: "Explore API docs",
    },
    security: {
      tag: "Security first",
      headline: "Trusted, regulated, secure",
      subtext:
        "We take compliance and security as seriously as payments. Malvik operates under Norwegian financial regulation with enterprise-grade security.",
      s1Title: "BankID Verified",
      s1Desc: "Every user is verified with Norwegian BankID for instant, secure KYC.",
      s2Title: "Finanstilsynet",
      s2Desc: "Operating under Norwegian FSA oversight. Full regulatory compliance.",
      s3Title: "Circle Partner",
      s3Desc: "USDC and EURC issued by Circle, fully backed 1:1 with regulated reserves.",
      s4Title: "On-chain Transparency",
      s4Desc: "Every transaction is recorded on Base blockchain. Fully auditable.",
    },
    cta: {
      headline: "Ready to join the future?",
      subtext:
        "Be among the first to experience frictionless global payments. Join our waitlist today.",
      placeholder: "Enter your email",
      button: "Join waitlist",
      privacy: "No spam. Unsubscribe anytime.",
    },
    footer: {
      tagline: "The Nordic stablecoin payment platform.",
      product: "Product",
      company: "Company",
      legal: "Legal",
      links: {
        features: "Features",
        pricing: "Pricing",
        api: "API",
        business: "Business",
        about: "About",
        blog: "Blog",
        careers: "Careers",
        contact: "Contact",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        compliance: "Compliance",
        aml: "AML Policy",
      },
      compliance:
        "Malvik Corporation AS is registered in Norway (Org. 999 999 999). Payment services subject to Finanstilsynet oversight. USDC and EURC are issued by Circle Internet Financial, LLC. Stablecoin holdings are not bank deposits and are not covered by the Norwegian deposit guarantee scheme.",
      copyright: "© 2024 Malvik Corporation AS. All rights reserved.",
    },
  },
  no: {
    nav: {
      product: "Produkt",
      pricing: "Priser",
      about: "Om oss",
      getStarted: "Kom i gang",
    },
    hero: {
      badge: "Bygget i Norge, fungerer overalt",
      headline: "Fremtidens betalinger",
      headlineBold: "er stablecoin.",
      subtext:
        "Send penger globalt på sekunder. Ingen skjulte gebyrer, ingen forsinkelser. Drevet av USDC og EURC på Base blockchain.",
      cta1: "Kom i gang",
      cta2: "For bedrifter",
      stat1: "Transaksjonsgebyr",
      stat2: "Oppgjørstid",
      stat3: "Land støttet",
    },
    trustBar: {
      label: "Drevet av",
    },
    problem: {
      tag: "Problemet med banker",
      headline: "Banken din tar 3%.",
      headlineBold: "Vi tar 0,3%.",
      subtext:
        "Tradisjonelle banker tar opptil 3–5% på internasjonale overføringer, pluss skjulte valutapåslag og dagers ventetid. Malvik gjør opp på sekunder, transparent, on-chain.",
      card1Title: "Tradisjonell bankoverføring",
      card1Fee: "2–5% gebyr + valutapåslag",
      card1Time: "1–5 virkedager",
      card1Hidden: "Skjulte kostnader",
      card2Title: "Malvik-betaling",
      card2Fee: "0,3% fast gebyr",
      card2Time: "< 10 sekunder",
      card2Hidden: "Fullt transparent",
    },
    features: {
      tag: "Hvorfor Malvik",
      headline: "Betalinger som faktisk fungerer",
      subtext:
        "Alt du trenger for å sende, motta og administrere globale betalinger — bygget for norske bedrifter og forbrukere.",
      f1Title: "Øyeblikkelige globale betalinger",
      f1Desc:
        "Send til ethvert lommebok eller bankkonto verden over. Transaksjoner gjøres opp på under 10 sekunder, 24/7/365.",
      f2Title: "Støtte for flere valutaer",
      f2Desc:
        "Hold og transakter i NOK, USDC og EURC. Sømløs konvertering med transparente, sanntidskurser.",
      f3Title: "Bygget for Norge",
      f3Desc:
        "BankID-onboarding, Fiken- og Tripletex-integrasjoner, og full Finanstilsynet-etterlevelse.",
    },
    howItWorks: {
      tag: "Enkel prosess",
      headline: "Oppe og kjørende på minutter",
      step1Title: "Registrer deg",
      step1Desc: "Opprett konto med BankID. Øyeblikkelig KYC-verifisering.",
      step2Title: "Sett inn midler",
      step2Desc:
        "Sett inn NOK via bankoverføring eller konverter direkte til USDC/EURC.",
      step3Title: "Send overalt",
      step3Desc:
        "Betal fakturaer, send pengeoverføringer, eller integrer via API — øyeblikkelig.",
    },
    b2b: {
      tag: "For bedrifter",
      headline: "Driv bedriften din med stablecoin-skinner",
      subtext:
        "Integrer Malvik i din eksisterende arbeidsflyt. Koble til regnskapsprogramvaren din og begynn å gjøre opp grensekryssende fakturaer på minutter.",
      feature1: "RESTful API med full dokumentasjon",
      feature2: "Webhooks for sanntids betalingshendelser",
      feature3: "Fiken & Tripletex native-integrasjoner",
      feature4: "Flerbrukerkontoer med rollebasert tilgang",
      feature5: "Automatisert avstemming",
      feature6: "Massebetaling",
      cta: "Utforsk API-dokumentasjon",
    },
    security: {
      tag: "Sikkerhet først",
      headline: "Pålitelig, regulert, sikker",
      subtext:
        "Vi tar etterlevelse og sikkerhet like alvorlig som betalinger. Malvik opererer under norsk finansregulering med bedriftsklasse sikkerhet.",
      s1Title: "BankID-verifisert",
      s1Desc: "Alle brukere verifiseres med norsk BankID for øyeblikkelig, sikker KYC.",
      s2Title: "Finanstilsynet",
      s2Desc: "Opererer under norsk Finanstilsynet-tilsyn. Full regulatorisk etterlevelse.",
      s3Title: "Circle-partner",
      s3Desc: "USDC og EURC utstedt av Circle, fullt støttet 1:1 med regulerte reserver.",
      s4Title: "On-chain transparens",
      s4Desc: "Hver transaksjon registreres på Base blockchain. Fullt reviderbar.",
    },
    cta: {
      headline: "Klar for fremtiden?",
      subtext:
        "Bli blant de første til å oppleve friksjonsfrie globale betalinger. Bli med på ventelisten i dag.",
      placeholder: "Skriv inn e-post",
      button: "Bli med på ventelisten",
      privacy: "Ingen spam. Avslutt når som helst.",
    },
    footer: {
      tagline: "Den nordiske stablecoin betalingsplattformen.",
      product: "Produkt",
      company: "Selskap",
      legal: "Juridisk",
      links: {
        features: "Funksjoner",
        pricing: "Priser",
        api: "API",
        business: "Bedrift",
        about: "Om oss",
        blog: "Blogg",
        careers: "Karriere",
        contact: "Kontakt",
        privacy: "Personvernpolicy",
        terms: "Vilkår for bruk",
        compliance: "Etterlevelse",
        aml: "AML-policy",
      },
      compliance:
        "Malvik Corporation AS er registrert i Norge (Org. 999 999 999). Betalingstjenester er underlagt tilsyn fra Finanstilsynet. USDC og EURC er utstedt av Circle Internet Financial, LLC. Stablecoin-beholdninger er ikke bankinnskudd og dekkes ikke av den norske innskuddsgarantiordningen.",
      copyright: "© 2024 Malvik Corporation AS. Alle rettigheter forbeholdt.",
    },
  },
};

type TranslationKeys = typeof translations.en;

const I18nContext = createContext<{
  locale: Locale;
  t: TranslationKeys;
  setLocale: (l: Locale) => void;
}>({
  locale: "en",
  t: translations.en,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale] as TranslationKeys;
  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
