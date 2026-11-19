export type WordEntry = {
  id: string
  source: 'deck' | 'starter' | 'dictionary'
  prompt: string
  meaning: string
  category: string
  plural?: string
  example?: string
  translation?: string
  level?: string
  // Set when the tapped word is an inflected form of this entry, e.g. "ging" for "gehen".
  form?: string
  // Set for English → German results: the English word that led to this German entry.
  via?: string
}

export type WordSource = WordEntry
export type MessagePart = { text: string; word: boolean }

const wordPattern = /([\p{L}\p{M}]+(?:[-'’][\p{L}\p{M}]+)*)/u
const singleWord = /^[\p{L}\p{M}]+(?:[-'’][\p{L}\p{M}]+)*$/u

export const normalizeWord = (word: string) => word.normalize('NFC').toLocaleLowerCase('de-DE')

export const stripArticle = (value: string) => value.trim().replace(/^(der|die|das)\s+/i, '')

// Build once per deck change, rather than scanning the deck for every chat token.
export const createKnownWordLookup = (entries: Pick<WordEntry, 'prompt'>[]) => {
  const words = new Set(entries.map((entry) => normalizeWord(stripArticle(entry.prompt))))
  return (word: string) => words.has(normalizeWord(word))
}

export const splitMessage = (text: string): MessagePart[] =>
  text.split(wordPattern).filter(Boolean).map((part) => ({ text: part, word: singleWord.test(part) }))

// Only exact single-word forms (the headword and a noun's plural) are indexed; no inflections are guessed.
export const indexWords = (entries: WordSource[]) => {
  const index = new Map<string, WordEntry[]>()
  for (const entry of entries) {
    for (const form of [entry.prompt, entry.plural]) {
      if (!form) continue
      const word = stripArticle(form)
      if (!singleWord.test(word)) continue
      const key = normalizeWord(word)
      const entries = index.get(key) ?? []
      if (!entries.some((item) => item.id === entry.id)) index.set(key, [...entries, entry])
    }
  }
  return index
}

export const findWords = (word: string, ...indexes: Map<string, WordEntry[]>[]) => {
  const key = normalizeWord(word)
  return indexes.flatMap((index) => index.get(key) ?? [])
}

export const findWord = (word: string, ...indexes: Map<string, WordEntry[]>[]) =>
  findWords(word, ...indexes)[0] ?? null

const englishWord = /^[a-z]+(?:['-][a-z]+)*$/

// English glosses such as "to learn", "the past" or "house (building)" reduce to a bare lookup word.
export const cleanGloss = (gloss: string) =>
  gloss.toLowerCase().replace(/\([^)]*\)/g, '').trim().replace(/^(?:to|a|an|the)\s+/, '').trim()

export const glossKeys = (meaning: string) => meaning.split(/[;,/]/)
  .map(cleanGloss)
  .map((gloss, position) => ({ key: gloss, position }))
  .filter(({ key }) => englishWord.test(key))

// Plain English endings are tried in turn so that "updates", "learning" or "learned" still find "update"/"learn".
export const englishVariants = (word: string) => {
  const value = word.toLowerCase().replace(/’/g, "'")
  const variants = [value]
  const add = (stem: string) => { if (stem.length > 1) variants.push(stem) }
  if (value.endsWith("'s")) add(value.slice(0, -2))
  if (value.endsWith('ies')) add(`${value.slice(0, -3)}y`)
  if (value.endsWith('es')) add(value.slice(0, -2))
  if (value.endsWith('s')) add(value.slice(0, -1))
  for (const ending of ['ing', 'ed']) {
    if (!value.endsWith(ending)) continue
    const stem = value.slice(0, -ending.length)
    add(stem)
    add(`${stem}e`)
    if (stem.length > 2 && stem.at(-1) === stem.at(-2)) add(stem.slice(0, -1))
  }
  if (value.endsWith('ly')) add(value.slice(0, -2))
  return [...new Set(variants)]
}

// Index of deck and starter words by their English meanings, for English → German lookup.
export const indexMeanings = (entries: WordEntry[]) => {
  const index = new Map<string, WordEntry[]>()
  for (const entry of entries) {
    for (const { key, position } of glossKeys(entry.meaning)) {
      if (position > 2) continue
      index.set(key, [...(index.get(key) ?? []), entry])
    }
  }
  return index
}

export const findMeaning = (word: string, ...indexes: Map<string, WordEntry[]>[]) => {
  for (const variant of englishVariants(word)) {
    const found = indexes.flatMap((index) => index.get(variant) ?? [])
    if (found.length) return found.map((entry) => ({ ...entry, via: word }))
  }
  return []
}
