import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { WordLookupContext as Context } from './wordLookupContext'
import { loadDictionary } from './dictionaryLoader'
import { lookupEnglish, type Dictionary } from './dictionaryLookup'
import { distinctWordSenses, germanLookup } from './lookupResults'
import { createKnownWordLookup, findMeaning, indexMeanings, normalizeWord, type WordEntry } from './wordLookup'
import { loadStarterPack, type StarterPack } from './starterDeck'

export function useWordLookup(word: string | null) {
  const context = useContext(Context)
  const [dictionary, setDictionary] = useState<Dictionary | null>(null)
  const [starterPack, setStarterPack] = useState<StarterPack | null>(null)
  const [failed, setFailed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const enabled = Boolean(word)
  useEffect(() => {
    if (!enabled) return
    let current = true
    // Load external resources asynchronously; local results remain usable.
    queueMicrotask(() => { if (current) { setLoading(true); setFailed(false) } })
    Promise.allSettled([
      loadDictionary().then((data) => { if (current) setDictionary(data) }),
      loadStarterPack().then((data) => { if (current) setStarterPack(data) }),
    ]).then((results) => { if (current) { setLoading(false); setFailed(results.some((result) => result.status === 'rejected')) } })
    return () => { current = false }
  }, [enabled, attempt])
  const personal = useMemo(() => context.cards.filter((card) => card.status === 'active').map((card): WordEntry => ({
    id: card.id, source: 'deck', prompt: card.prompt, meaning: card.meaning, category: card.category,
    plural: card.plural, example: card.example, translation: card.translation,
  })), [context.cards])
  const isKnown = useMemo(() => createKnownWordLookup(personal), [personal])
  const starter = useMemo(() => (starterPack?.cards ?? []).map((card): WordEntry => ({
    id: card.id, source: 'starter', prompt: card.article ? `${card.article} ${card.word}` : card.word,
    meaning: card.meaning, category: card.category, plural: card.plural, example: card.example,
    translation: card.translation, level: card.level,
  })), [starterPack])
  const german = useMemo(() => word ? germanLookup(word, personal, starter, dictionary) : [], [word, personal, starter, dictionary])
  const english = useMemo(() => word ? distinctWordSenses([
    ...findMeaning(word, indexMeanings(personal), indexMeanings(starter)),
    ...(dictionary ? lookupEnglish(dictionary, word) : []),
  ]) : [], [word, personal, starter, dictionary])
  const inDeck = useCallback((entry: WordEntry) => personal.some((card) =>
    normalizeWord(card.prompt) === normalizeWord(entry.prompt) && card.category === entry.category
    && normalizeWord(card.meaning) === normalizeWord(entry.meaning)), [personal])
  const onAdd = (entry: WordEntry) => {
    const original = entry.source === 'starter' ? starterPack?.cards.find((item) => item.id === entry.id) : undefined
    return original ? context.onAddStarter(original) : context.onAdd(entry)
  }
  return { german, english, loading: loading || (enabled && !dictionary && !starterPack && !failed), unavailable: failed, retry: () => setAttempt((value) => value + 1), inDeck, onAdd,
    isKnown }
}
