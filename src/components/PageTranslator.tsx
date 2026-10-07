import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_TRANSLATIONS } from "../data/pageTranslations";
import { useLanguage, type Language } from "../i18n";

type TranslationState = { original: string; translated: string };

const textStates = new WeakMap<Text, TranslationState>();
const attrStates = new WeakMap<Element, Record<string, TranslationState>>();
const TRANSLATED_ATTRS = ["placeholder", "title", "aria-label", "alt"];

function translateString(source: string, language: Language) {
  if (language === "sv") return source;
  const leading = source.match(/^\s*/)?.[0] ?? "";
  const trailing = source.match(/\s*$/)?.[0] ?? "";
  const normalized = source.trim().replace(/\s+/g, " ");
  const translated = PAGE_TRANSLATIONS[normalized]?.[language];
  return translated ? `${leading}${translated}${trailing}` : source;
}

/**
 * Applies the selected language to all static page content (not just the
 * navigation): text nodes and common accessibility/placeholders attributes.
 * Re-runs whenever React commits new DOM so switching form steps, opening the
 * menu or navigating keeps the page translated.
 */
export default function PageTranslator() {
  const { language } = useLanguage();
  const { pathname } = useLocation();
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const root = document.body;
    if (!root) return;

    const apply = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || !node.nodeValue?.trim()) return NodeFilter.FILTER_REJECT;
          if (parent.closest("script, style, textarea, [data-no-translate]")) return NodeFilter.FILTER_REJECT;
          // Keep the Swedish option value stable while translating its label.
          if (parent.tagName === "OPTION" && !parent.hasAttribute("value")) {
            parent.setAttribute("value", parent.textContent ?? "");
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      let text: Text | null;
      while ((text = walker.nextNode() as Text | null)) {
        const current = text.nodeValue ?? "";
        let state = textStates.get(text);

        // React may reuse a text node for a new price or form value. Preserve
        // that new source instead of restoring an older cached value.
        if (!state || (current !== state.original && current !== state.translated)) {
          state = { original: current, translated: current };
          textStates.set(text, state);
        }

        const next = translateString(state.original, language);
        state.translated = next;
        if (text.nodeValue !== next) text.nodeValue = next;
      }

      root.querySelectorAll<HTMLInputElement>("[placeholder]").forEach((el) => translateAttrs(el, language));
      root.querySelectorAll("[aria-label], [title], [alt]").forEach((el) => translateAttrs(el, language));
    };

    const translateAttrs = (el: Element, lang: Language) => {
      let states = attrStates.get(el);
      if (!states) states = {};

      for (const attr of TRANSLATED_ATTRS) {
        const current = el.getAttribute(attr);
        if (!current) continue;
        let state = states[attr];
        if (!state || (current !== state.original && current !== state.translated)) {
          state = { original: current, translated: current };
          states[attr] = state;
        }
        const next = translateString(state.original, lang);
        state.translated = next;
        if (el.getAttribute(attr) !== next) el.setAttribute(attr, next);
      }
      attrStates.set(el, states);
    };

    apply();

    // React may commit new nodes shortly after routing or state changes.
    timer.current = window.setTimeout(apply, 120);

    const observer = new MutationObserver((mutations) => {
      if (mutations.length === 0) return;
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(apply, 120);
    });

    observer.observe(root, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: TRANSLATED_ATTRS,
    });

    return () => {
      observer.disconnect();
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [language, pathname]);

  return null;
}
