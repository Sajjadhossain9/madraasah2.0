import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dict, type Lang, type Dict } from "./i18n";
import { getStorageItem, setStorageItem } from "./utils/storage";

type AppCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  dark: boolean;
  setDark: (d: boolean) => void;
  page: string;
  setPage: (p: string) => void;
};

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = getStorageItem("dh-lang") as Lang | null;
    return saved && ["bn", "en", "ar"].includes(saved) ? saved : "bn";
  });
  const [dark, setDarkState] = useState<boolean>(() => getStorageItem("dh-dark") === "1");
  const [page, setPageState] = useState<string>(() => {
    try {
      return window.location.hash.replace("#/", "") || "home";
    } catch {
      return "home";
    }
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    setStorageItem("dh-lang", l);
  };
  const setDark = (d: boolean) => {
    setDarkState(d);
    setStorageItem("dh-dark", d ? "1" : "0");
  };
  const setPage = (p: string) => {
    setPageState(p);
    try { window.location.hash = `/${p}`; } catch {}
    try { window.scrollTo({ top: 0, behavior: "smooth" }); } catch {}
  };

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = dict[lang].dir;
    html.setAttribute("data-lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const onHash = () => {
      try { setPageState(window.location.hash.replace("#/", "") || "home"); }
      catch { setPageState("home"); }
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <Ctx.Provider value={{ lang, setLang, t: dict[lang], dark, setDark, page, setPage }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useApp must be inside AppProvider");
  return c;
}
