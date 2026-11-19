import { useMemo } from 'react'
import { ChatWordPeek } from './ChatWordPeek'
import { normalizeWord, splitMessage, type WordEntry } from './wordLookup'
import { splitMessageLinks } from './messageLinks'

export type MessageWordTools = {
  activeWord: { messageId: string; key: string; word: string } | null
  wordChipsFor: string | null
  pickWord: (messageId: string, word: string) => void
  isKnown: (word: string) => boolean
  german: WordEntry[]
  english: WordEntry[]
  loading: boolean
  unavailable: boolean
  retry?: () => void
  inDeck: (entry: WordEntry) => boolean
  onAdd: (entry: WordEntry) => void
  onClose: () => void
  toggleChips: (messageId: string) => void
}

export function MessageWords({ id, text, tools }: { id: string; text: string; tools: MessageWordTools }) {
  const isKnown = tools.isKnown
  const activeKey = tools.activeWord?.messageId === id ? tools.activeWord.key : null
  const words = useMemo(() => splitMessageLinks(text).map((section, index) => section.href
    ? <a key={index} href={section.href} target="_blank" rel="noopener noreferrer">{section.text}</a>
    : splitMessage(section.text).map((part, wordIndex) => {
      if (!part.word) return part.text
      const key = normalizeWord(part.text)
      return <span className={`companion-word${isKnown(part.text) ? ' known' : ''}${activeKey === key ? ' active' : ''}`} key={`${index}-${wordIndex}`} data-word={part.text}>{part.text}</span>
    })), [text, isKnown, activeKey])
  return <>
    <p className="companion-message-text" onClick={(event) => {
      if (!(event.target instanceof Element) || window.getSelection()?.toString()) return
      const target = event.target.closest<HTMLElement>('[data-word]')
      if (target?.dataset.word) tools.pickWord(id, target.dataset.word)
    }}>{words}</p>
    {tools.wordChipsFor === id && <div className="companion-word-chips" role="group" aria-label="Look up a word from this message">
      {[...new Map(splitMessageLinks(text).filter((part) => !part.href).flatMap((part) => splitMessage(part.text)).filter((part) => part.word).map((part) => [normalizeWord(part.text), part.text])).values()].map((word) => <button key={word} type="button" lang="de" aria-pressed={tools.activeWord?.messageId === id && tools.activeWord.key === normalizeWord(word)} onClick={() => tools.pickWord(id, word)}>{word}</button>)}
    </div>}
    {tools.activeWord?.messageId === id && <ChatWordPeek
      key={`${id}-${tools.activeWord.key}`}
      word={tools.activeWord.word}
      german={tools.german}
      english={tools.english}
      loading={tools.loading}
      unavailable={tools.unavailable}
      onRetry={tools.retry}
      inDeck={tools.inDeck}
      onAdd={tools.onAdd}
      onClose={tools.onClose}
    />}
  </>
}
