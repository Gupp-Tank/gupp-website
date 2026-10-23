import { Fragment } from "react";
import { Container } from "../../components/layout/Container";
import { Heading } from "../../components/ui/Heading";
import { Text } from "../../components/ui/Text";
import { PRIVACY_EMAIL } from "../../content/legal";
import type { LegalCopy, LegalDocument } from "../../types/legal";
import "./LegalContent.css";

interface LegalContentProps {
  doc: LegalDocument;
  copy: Pick<
    LegalCopy,
    "versionLabel" | "updatedLabel" | "tocLabel" | "deleteAccountLabel"
  >;
  /** Where `{deleteAccount}` points, already in the active language. */
  deleteAccountHref?: string;
  /** Long, localized date of `doc.updated`. */
  updatedText: string;
}

// Paragraphs may contain "{email}", replaced by a mailto link so the address lives in one place,
// and "{deleteAccount}", replaced by a link to the account deletion page.
function Rich({
  text,
  deleteAccount,
}: {
  text: string;
  deleteAccount?: { href: string; label: string };
}) {
  const parts = text.split(/(\{email\}|\{deleteAccount\})/);
  return (
    <>
      {parts.map((part, index) => {
        if (part === "{email}")
          return (
            <a key={index} href={`mailto:${PRIVACY_EMAIL}`}>
              {PRIVACY_EMAIL}
            </a>
          );
        if (part === "{deleteAccount}") {
          return deleteAccount ? (
            <a key={index} href={deleteAccount.href}>
              {deleteAccount.label}
            </a>
          ) : null;
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

export function LegalContent({
  doc,
  copy,
  updatedText,
  deleteAccountHref,
}: LegalContentProps) {
  const deleteAccount = deleteAccountHref
    ? { href: deleteAccountHref, label: copy.deleteAccountLabel }
    : undefined;
  return (
    <Container className="legal">
      <article className="legal__article" aria-labelledby="legal-title">
        <Heading level={1} size="section" id="legal-title">
          {doc.title}
        </Heading>
        <p className="legal__meta">
          {copy.versionLabel} {doc.version} · {copy.updatedLabel}{" "}
          <time dateTime={doc.updated}>{updatedText}</time>
        </p>
        <Text size="lead" className="legal__intro">
          {doc.intro}
        </Text>

        <nav className="legal__toc" aria-label={copy.tocLabel}>
          <p className="legal__toc-title">{copy.tocLabel}</p>
          <ol>
            {doc.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
        </nav>

        {doc.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="legal__section"
            aria-labelledby={`${section.id}-title`}
          >
            <Heading level={2} size="card" id={`${section.id}-title`}>
              {section.heading}
            </Heading>
            {section.paragraphs.map((paragraph) => (
              <Text key={paragraph}>
                <Rich text={paragraph} deleteAccount={deleteAccount} />
              </Text>
            ))}
            {section.items && (
              <ul className="legal__list">
                {section.items.map((item) => (
                  <li key={item}>
                    <Text>{item}</Text>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </Container>
  );
}
