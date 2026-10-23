import { site } from "../content/site";
import { useFormat } from "../hooks/useFormat";
import { useI18n } from "../hooks/useI18n";
import { useLocalePath } from "../hooks/useLocalePath";
import { useSeo } from "../hooks/useSeo";
import { LegalContent } from "../sections/legal/LegalContent";

interface LegalPageProps {
  document: "privacy" | "terms" | "deleteAccount";
}

export function LegalPage({ document }: LegalPageProps) {
  const { locale, t } = useI18n();
  const { legal } = t;
  const doc = legal[document];
  const { date } = useFormat();
  const localePath = useLocalePath();
  const path =
    document === "deleteAccount" ? "/delete-account" : `/${document}`;
  useSeo({
    locale,
    path,
    title: `${doc.title} · ${site.name}`,
    description: doc.intro,
  });

  return (
    <LegalContent
      doc={doc}
      copy={legal}
      updatedText={date(new Date(`${doc.updated}T00:00:00Z`), {
        dateStyle: "long",
        timeZone: "UTC",
      })}
      deleteAccountHref={localePath("/delete-account")}
    />
  );
}
