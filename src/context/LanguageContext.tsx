import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

type Lang = 'de' | 'en'

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'de',
  setLang: () => {},
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem('faces-lang')
    return (stored === 'en' ? 'en' : 'de') as Lang
  })

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'de' ? 'en' : 'de'
      localStorage.setItem('faces-lang', next)
      return next
    })
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
