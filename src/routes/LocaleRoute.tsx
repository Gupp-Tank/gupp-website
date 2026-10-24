import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router";
import { useAnalytics } from "../hooks/useAnalytics";
import { pageOf } from "../lib/analytics";
import { isLocale, localeStore } from "../i18n/locales";
import { NotFoundPage } from "../pages/NotFoundPage";

// Guards `/:locale`: an unsupported language is a 404, and the URL is the
// source of truth for the active language (back/forward and deep links).
export function LocaleRoute() {
  const { locale } = useParams();
  const valid = isLocale(locale);
  const { pathname } = useLocation();
  const analytics = useAnalytics();

  // Always write it, even when <html lang> already matches: the pre-paint script sets
  // the attribute from the URL, so "already matches" says nothing about what is saved.
  useLayoutEffect(() => {
    if (isLocale(locale)) localeStore.set(locale);
  }, [locale]);

  // One event per page the visitor opens, only for pages worth counting (and only with consent).
  useEffect(() => {
    const page = valid ? pageOf(pathname) : null;
    if (page) analytics.track({ name: "page_viewed", page });
  }, [valid, pathname, analytics]);

  return valid ? <Outlet /> : <NotFoundPage />;
}
