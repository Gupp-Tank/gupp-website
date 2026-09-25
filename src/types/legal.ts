export interface LegalSection {
  id: string
  heading: string
  /** Paragraphs. `{email}` is replaced by a mailto link to the privacy contact. */
  paragraphs: string[]
  items?: string[]
}

export interface LegalDocument {
  title: string
  /** Same value as LEGAL_DOCUMENTS_VERSION; shown so a visitor can tell which text they accepted. */
  version: string
  /** ISO date (YYYY-MM-DD). */
  updated: string
  intro: string
  sections: LegalSection[]
}

export interface LegalCopy {
  privacy: LegalDocument
  terms: LegalDocument
  versionLabel: string
  updatedLabel: string
  tocLabel: string
  contactLabel: string
}
