import { LEGAL_DOCUMENTS_VERSION } from "../../../content/legal";
import type { Dictionary } from "../../../types/i18n";

export const legal: Dictionary["legal"] = {
  versionLabel: "Version",
  updatedLabel: "Updated on",
  tocLabel: "On this page",
  contactLabel: "Contact",
  privacy: {
    title: "Privacy policy",
    version: LEGAL_DOCUMENTS_VERSION,
    updated: "2026-10-23",
    intro:
      "This policy explains what data the gupp.app website and the Gupp Tank app (iOS and Android) handle, why and for how long. It covers the website, the early-access list and the app.",
    sections: [
      {
        id: "responsible",
        heading: "Who is responsible",
        paragraphs: [
          "The data controller is Josué Araya Marín, an individual, in Costa Rica. You can write to {email} about anything privacy related.",
        ],
      },
      {
        id: "data",
        heading: "What data we handle",
        paragraphs: [
          "We only handle the data each feature needs. On the website and the early-access list:",
        ],
        items: [
          "Early-access sign-up: your email, the language of the page, your tank type (if you choose to give it) and a record that you accepted these texts, with date and version. We do not store your IP address.",
          "Technical data: the site is hosted on Vercel, which may log IP addresses and request data in server logs for security and operation.",
          "Storage in your browser: we save your language, your theme (light or dark) and your cookie choice. It is essential to the site and does not track you.",
          "Analytics: only if you accept it. It measures how the site is used in aggregate and does not include personal data such as your email.",
        ],
      },
      {
        id: "app-data",
        heading: "What the Gupp Tank app handles",
        paragraphs: [
          "When you create an account and use the Gupp Tank app, we handle:",
        ],
        items: [
          "Account: your email and, if you give it, your first and last name and your avatar. If you sign in with Google or Apple we receive your email and name from them. If you register with a password, we store it only as a one-way hash, never in plain text.",
          "Your tanks: their name, size and type, the animals you add, your water parameter readings, dosing and feeding records, reminders and your care history and achievements.",
          "Diagnosis photos: the photos you take to diagnose a fish, and the assessment the AI gives you.",
          "Your device: your time zone, to time reminders; the language of the app; and the push notification token (Firebase Cloud Messaging) of each phone you sign in on, with your notification preferences.",
          "Subscription: your plan and its state, and the purchases made through Google Play or the App Store, handled with RevenueCat.",
          "Crash reports: when the app fails, a technical report goes to Sentry, with no photos and no content of your tanks.",
          "The app does not use your location.",
        ],
      },
      {
        id: "purpose",
        heading: "What we use it for",
        paragraphs: [
          "Your email on the early-access list is used only to tell you when the app is available. We do not use it for anything else, we do not sell it and we do not share it for advertising.",
          "In the app, your data is used to give you the service: your tanks, your readings, your reminders and notifications, your plan, and the AI diagnosis. When you ask for a diagnosis, the photo is sent to Google Gemini, which returns the assessment. We do not use your photos to train or improve any AI model, and we do not keep them anonymized.",
          "Analytics, if you accept it, helps us understand which parts of the site are used so we can improve them.",
        ],
      },
      {
        id: "basis",
        heading: "Basis for handling your data",
        paragraphs: [
          "On the website, your consent. You give it by ticking the checkbox on the form and by choosing your cookie preferences, and you can withdraw it at any time.",
          "In the app, handling your data is necessary to give you the service you asked for by creating an account. The push notifications are optional and you can turn them off in the app or on your phone.",
        ],
      },
      {
        id: "retention",
        heading: "How long we keep it",
        paragraphs: [
          "We keep your early-access email until 6 months after the app launches, or sooner if you unsubscribe. The record of your consent is deleted together with your sign-up.",
          "We keep the data of your app account for as long as the account exists. When you delete your account, everything is deleted immediately: your account, your tanks and everything under them, your history, your notification data and every diagnosis photo and your avatar. Nothing is kept anonymized.",
          "One thing outside our servers does not go at once: the email provider keeps its sending logs, which include the recipient address, for 30 days. We do not keep separate backups of the database. The stores and RevenueCat keep the records of purchases under their own policies and the tax rules that apply to them.",
          "Your cookie choice stays in your browser until you change it or clear the site data.",
        ],
      },
      {
        id: "sharing",
        heading: "Who we share it with",
        paragraphs: [
          "With providers that handle data on our behalf, each for one purpose. Their servers may be outside Costa Rica:",
        ],
        items: [
          "Vercel: hosts the website.",
          "Railway: hosts the API and the database.",
          "Cloudflare R2: stores the diagnosis photos and avatars.",
          "Google Gemini: receives the photo you send for a diagnosis, to produce the assessment.",
          "Firebase (Google): delivers the push notifications.",
          "RevenueCat, Google Play and the App Store: handle subscriptions and purchases.",
          "Sentry: receives crash reports.",
          "Resend: sends the emails, such as the link to reset your password.",
          "If you accept analytics, also the provider of that tool.",
        ],
      },
      {
        id: "rights",
        heading: "Your rights",
        paragraphs: [
          "You can ask for access to your data, to have it corrected or deleted, object to its handling and withdraw your consent. Write to {email}, or use the unsubscribe link each notice will carry: your record is deleted.",
          "You can delete your app account yourself, at any time, from the app (Profile → Delete my account), or by writing to us if you no longer have the app. The steps are on the {deleteAccount} page.",
          "The applicable law is Costa Rica’s Law No. 8968 on the Protection of Individuals regarding the Processing of their Personal Data. If you believe your rights were not respected, you can go to the Data Protection Agency of Costa Rica (Prodhab).",
        ],
      },
      {
        id: "security",
        heading: "Security",
        paragraphs: [
          "The site and the API use encrypted connections (HTTPS), photos are kept in private storage, and access to the data is limited to whoever needs it to run them.",
        ],
      },
      {
        id: "minors",
        heading: "Minors",
        paragraphs: [
          "The site and the app are not aimed at minors. If you believe a minor signed up, write to us and we will delete it.",
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        paragraphs: [
          "If this policy changes, we will publish the new version here with its date. The current version is shown at the top of the page.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms and conditions",
    version: LEGAL_DOCUMENTS_VERSION,
    updated: "2026-09-24",
    intro:
      "These terms govern the use of the gupp.app website and the Gupp Tank early-access sign-up. By using them you accept what follows.",
    sections: [
      {
        id: "scope",
        heading: "What they cover",
        paragraphs: [
          "The site presents information about Gupp Tank, an aquarium management app that is not yet available, and lets you sign up for a launch notice. The app will have its own terms when it is published.",
        ],
      },
      {
        id: "early-access",
        heading: "Early access",
        paragraphs: [
          "Signing up does not guarantee access to the app or a launch date. The only effect of signing up is that we will tell you when the app is available.",
          "You can unsubscribe at any time with the link in each notice or by writing to {email}.",
        ],
      },
      {
        id: "use",
        heading: "Acceptable use",
        paragraphs: [
          "You agree to give truthful data, not to use the form with other people’s emails and not to try to interfere with the site, for example with automated submissions or unauthorized access attempts.",
        ],
      },
      {
        id: "ip",
        heading: "Intellectual property",
        paragraphs: [
          "The Gupp Tank name, the logo, the texts, the images and the design of the site belong to their owner and may not be copied or used without permission, except where the law allows.",
        ],
      },
      {
        id: "information",
        heading: "Site information",
        paragraphs: [
          "The content is informational and describes features under development; they may change before launch. Nothing on the site is veterinary advice: if your animals have a health problem, see a specialist.",
        ],
      },
      {
        id: "liability",
        heading: "Liability",
        paragraphs: [
          "The site is provided as is. To the extent the law allows, the owner is not liable for damages arising from the use of the site or its unavailability.",
        ],
      },
      {
        id: "links",
        heading: "Third-party links",
        paragraphs: [
          "The site links to social networks and other services. We do not control their content or their privacy policies.",
        ],
      },
      {
        id: "changes",
        heading: "Changes",
        paragraphs: [
          "We may update these terms. The current version and its date are shown at the top of the page, and if they change materially we will tell you before they apply to your sign-up.",
        ],
      },
      {
        id: "law",
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of Costa Rica. Any dispute will be submitted to the competent courts of Costa Rica, without prejudice to the rights the law grants you as a consumer.",
        ],
      },
      {
        id: "contact",
        heading: "Contact",
        paragraphs: ["For any question about these terms write to {email}."],
      },
    ],
  },
  deleteAccountLabel: "Delete your account",
  deleteAccount: {
    title: "Delete your Gupp Tank account",
    version: LEGAL_DOCUMENTS_VERSION,
    updated: "2026-10-23",
    intro:
      "How to delete your Gupp Tank account and the data in it, with or without the app installed.",
    sections: [
      {
        id: "in-app",
        heading: "In the app",
        paragraphs: [
          "Open Gupp Tank, go to Profile and choose Delete my account. After you confirm, the account is deleted immediately and the session ends.",
        ],
      },
      {
        id: "without-app",
        heading: "Without the app",
        paragraphs: [
          "If you uninstalled the app or cannot sign in, write to {email} from the email address of the account, with the subject “Delete my account”. We will confirm by reply and delete the account within 30 days.",
        ],
      },
      {
        id: "deleted",
        heading: "What is deleted",
        paragraphs: ["Everything, at once, with no waiting period:"],
        items: [
          "Your account, including your sign-in data.",
          "Every tank and everything under it: animals, water readings, dosing and feeding records, reminders and diagnoses.",
          "Your care history, achievements, notification preferences and notification log, and the push token of each phone.",
          "Every diagnosis photo and your avatar, removed from storage. Photos are deleted, not kept anonymized, and they are not used to train any AI model.",
        ],
      },
      {
        id: "retained",
        heading: "What is kept, and for how long",
        paragraphs: [
          "Only what sits outside our servers and cannot be removed at once. We do not keep separate backups of the database:",
        ],
        items: [
          "The email provider’s sending logs, which include the address the emails went to: 30 days.",
          "Purchase records kept by Google Play, the App Store and RevenueCat, under their own policies and the tax rules that apply to them.",
        ],
      },
      {
        id: "after",
        heading: "After deleting",
        paragraphs: [
          "Deleting your Gupp Tank account does not delete your Google or Apple account, and it does not cancel a subscription: cancel it first in Google Play or the App Store. You can create a new account with the same email later.",
          "More about what we handle is in the privacy policy.",
        ],
      },
    ],
  },
};
