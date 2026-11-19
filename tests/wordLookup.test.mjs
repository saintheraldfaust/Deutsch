import assert from 'node:assert/strict'
import test from 'node:test'
import { createKnownWordLookup, englishVariants, findMeaning, findWord, glossKeys, indexMeanings, indexWords, splitMessage } from '../src/wordLookup.ts'

const entry = (id, prompt, meaning, overrides = {}) => ({
  id, source: 'deck', prompt, meaning, category: 'noun', ...overrides,
})

test('chat highlighting reuses its deck index for repeated known and unknown tokens', () => {
  let deckReads = 0
  const entries = Array.from({ length: 2600 }, (_, index) => ({
    get prompt() { deckReads += 1; return index === 0 ? 'der Käse' : `das Wort${index}` },
  }))
  const isKnown = createKnownWordLookup(entries)
  assert.equal(deckReads, entries.length)
  for (let index = 0; index < 1000; index += 1) {
    assert.equal(isKnown('KA\u0308SE'), true)
    assert.equal(isKnown('unbekannt'), false)
  }
  assert.equal(deckReads, entries.length, 'message updates must not rescan vocabulary')
  assert.equal(isKnown('der'), false)
  assert.equal(isKnown('Käsen'), false, 'do not guess inflections for highlighting')
  assert.equal(createKnownWordLookup([])('Käse'), false)
})

test('messages split into words and the text between them', () => {
  assert.deepEqual(splitMessage('Wie geht’s, Tisch-Tennis?'), [
    { text: 'Wie', word: true },
    { text: ' ', word: false },
    { text: 'geht’s', word: true },
    { text: ', ', word: false },
    { text: 'Tisch-Tennis', word: true },
    { text: '?', word: false },
  ])
})

test('single-word headwords and plurals are indexed without their articles', () => {
  const index = indexWords([
    entry('1', 'der Arzt', 'doctor', { plural: 'die Ärzte' }),
    entry('2', 'lernen', 'to learn', { category: 'verb' }),
    entry('3', 'das Auto fahren', 'to drive', { category: 'phrase' }),
  ])

  assert.equal(findWord('arzt', index)?.meaning, 'doctor')
  assert.equal(findWord('ÄRZTE', index)?.id, '1')
  assert.equal(findWord('lernen', index)?.meaning, 'to learn')
  assert.equal(findWord('fahren', index), null)
  assert.equal(findWord('lerne', index), null)
})

test('the learner’s own deck takes priority over starter vocabulary', () => {
  const deck = indexWords([entry('mine', 'der Tisch', 'my table')])
  const starter = indexWords([
    entry('starter', 'der Tisch', 'table', { source: 'starter' }),
    entry('other', 'das Fenster', 'window', { source: 'starter' }),
  ])

  assert.equal(findWord('Tisch', deck, starter)?.id, 'mine')
  assert.equal(findWord('Fenster', deck, starter)?.source, 'starter')
})

test('English glosses reduce to bare lookup words', () => {
  assert.deepEqual(glossKeys('to learn; the past (time); art gallery, gallery').map((item) => item.key), ['learn', 'past', 'gallery'])
  assert.deepEqual(englishVariants('Learning'), ['learning', 'learn', 'learne'])
  assert.ok(englishVariants('stopped').includes('stop'))
  assert.ok(englishVariants('babies').includes('baby'))
})

test('the deck can be searched by its English meanings', () => {
  const entries = [
    entry('1', 'die Gesundheit', 'health', { category: 'noun' }),
    entry('2', 'gesund', 'healthy; well'),
  ]
  const index = indexMeanings(entries)
  assert.equal(findMeaning('Health', index)[0].prompt, 'die Gesundheit')
  assert.equal(findMeaning('health', index)[0].via, 'health')
  assert.equal(findMeaning('well', index)[0].prompt, 'gesund')
  assert.deepEqual(findMeaning('wealth', index), [])
})
