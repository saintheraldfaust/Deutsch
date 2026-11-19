# Deutsch Daily Deck

A calm German vocabulary trainer for words you want to use. Capture vocabulary from your course or daily life, organize it by lesson, and practise recalling it over time.

Study independently, ask a companion to review with you, or use a group to try vocabulary in conversation. The goal is durable, usable vocabulary, with no streak pressure, rankings or required social activity. Deutsch Deck complements instruction; it is not a complete language course or an official vhs-Lernportal product.

![Deutsch Daily Deck showing a vocabulary card](./public/Deck.PNG)

## Learn, recall, use

- **Learn:** explore a word with its meaning and a natural example. Nouns include their article and plural where available. Missing forms are marked as unrecorded; checked dictionary suggestions can be saved explicitly, while verified usually-singular or usually-plural cases are identified. Save a word for later or add it to reviews when ready.
- **Recall:** try to remember before revealing the answer, then rate how it went. Due reviews take priority and each rating shows when the word will return.
- **Produce:** recall the saved German word from its meaning and example context, including the article for nouns. If another saved translation fits, choose whether to save it as an accepted answer before it is graded.
- **Choose:** recognize the German word from four distinct options. Known overlapping meanings and accepted alternatives are excluded from distractors. Recognition, typed production and self-rated recall have separate results. Correct Produce and Choose answers schedule as Hard; misses schedule as Again.

Correct scheduled quiz answers gradually lengthen review intervals without treating success as difficulty. These intervals are a heuristic, not a measure of mastery.

Adding a word to reviews schedules its first review **10 minutes later**. First reviews and Again retries use elapsed minutes, including across clock changes. Longer intervals follow local calendar days. The study area shows the next review time and a word count without previewing answers. You can repeat today's words without changing their schedules.

The app opens Recall when locally saved reviews are due, otherwise Learn when unseen words remain. It keeps your chosen mode during a visit. **Tune session** lets you choose a study set, inspect reviewed words or reset progress with confirmation.

**Goal & pace** helps you choose a daily allowance and review limit. These support planning, not a prediction of language proficiency. Activity records words practised, not mastery. Optional study pauses default to 60 seconds after three distinct words added to reviews or reviewed. Under **App settings**, choose 3, 5 or 10 words and 30 seconds, 60 seconds or 2 minutes, skip a pause, or turn them off. These are adjustable starting points, not established optimal intervals.

## Learn with others

Community is optional and requires a verified account. Connect by username and mutual consent; your email and wider study progress stay private.

### Companions

Chat privately, share a word, look up vocabulary, and offer kind sentence feedback. A learner chooses whether to save a shared word or suggested sentence to their own deck.

**Review together** lets a companion help you recall five randomly selected words you have already reviewed, optionally from one lesson or topic. The review deck replaces chat until the session ends. Type the English meaning; your companion can mark it correct, invite another attempt, or reveal the full word details. You can ask for a reveal at any point before the answer is shown, and either learner can end the session.

A highlighted **Review** message records that session's first-try recall, recall after retry and revealed answers. These are companion-marked outcomes. They do not change individual review schedules, activity or deck scores, and do not claim mastery.

### Groups

Use groups to ask vocabulary questions, try words in your own sentences, and discuss specific feedback. Members can share word cards, reply, look up words, suggest edits and save useful vocabulary or corrected sentences to their own decks. Group discussion supports later individual practice; posting and reactions do not count as learning progress.

Groups are separate from private chat. Joining is explicit and posts are visible to members. Owners can manage membership and messages; members can report messages and suggestions. There are posting limits, shared rules and moderation. Group reviews do not expose anyone's private deck, scores or study history.

External links stay visible with a warning. A small English/German abuse list holds matching new messages, edits, word cards and suggestions for human review. Members see a neutral placeholder; moderators can restore a false positive. This limited check can miss abuse and misread quoted vocabulary, so reporting remains available. It does not filter private companion chats.

Choose **Use this word** on a shared group word card to write a German sentence. Members can offer optional sentence feedback. **Revise** posts a follow-up linked to your attempt; **Save sentence** asks for an English meaning before adding it to your own deck. Saving does not schedule a review, and group feedback does not score or grade your vocabulary.

Chat updates arrive live when connected. Recently opened conversations can be saved on this device for faster reopening; the app checks them with the server when opened. Use companion tools to turn off **Save recent chats on this device** on a shared device. Up to 20 pending messages can also be kept for 24 hours. After reload, unconfirmed messages wait for an explicit retry. Signing out clears that account's saved chat copies and pending messages.

Reopening a saved chat shows its recent history while updates arrive in the background. Temporary connection failures keep that history visible. A first visit, expired cache or cleared storage can still need an initial download.

## Make the vocabulary yours

Fresh installs include **2,593 starter cards** across core vocabulary and ten themes. Source-supplied A1/A2 labels and examples can contain errors and are not independently verified. Existing decks are preserved.

Use **Add a word** for your own vocabulary. Include a clear meaning and a natural German example; nouns require an article. Lesson and topic tags create study sets. Optional accepted German answers let you define alternative wording, with noun articles included. For larger sets, use the [CSV template](./public/deck-template.csv) or [JSON template](./public/deck-template.json), then choose **Import vocabulary or backup**. Vocabulary imports start fresh, skip duplicates and leave existing cards intact. Review imported content for accuracy.

Tap a German example word in Learn or a revealed review, or a word in chat, to check your deck, starter vocabulary and the bundled dictionary. Choose between meanings when a word has several senses. Saved examples stay available in lookup, verified inflections lead back to personal vocabulary, and failed downloads can be retried. Dictionary glosses are short and may miss context. Adding a dictionary word requires an example sentence. **Listen** has open human recordings matched to every word in the current starter set. Custom words use a local German voice where available. Recordings play only when selected and show their source, author and license. Browser voices that load later are detected; an online browser voice requires a separate explicit choice.

## Your data and choices

- Core study works locally without an account. Two open tabs preserve changes to different words; if both change the same word, refresh before saving. A failed save keeps the current study action pending. After an online visit has cached the app and vocabulary, you can study offline. Community and account sync need a connection. Private and group chats highlight words from your active vocabulary.
- An optional account syncs your deck and goal across devices. New accounts require email verification; password recovery uses a time-limited email code.
- Download backups regularly. Clearing browser data can remove local progress. Backups preserve review state; importing is additive and does not overwrite existing cards.
- Private and group messages are stored on the account server. They are never sent to an AI or translation service. Word lookup runs locally; external dictionary links open only when selected.
- Saved chat copies can briefly be stale and are not protected from other people using the same browser profile. The app keeps bounded recent copies and clears them on sign-out or account change.
- Blocking ends a companion connection. Reporting, leaving groups and notification preferences stay under your control. Optional account and companion emails use Mailjet.

See [privacy and operational details](./CONTRIBUTING.md#privacy-and-service-limits) for cache limits, retention, account recovery and email handling.

## Questions and feedback

Visit the [Deutsch community Q&A](https://github.com/Dustymaterial/Deutsch-community/discussions/categories/q-a) for help using the app, or [discuss a product idea](https://github.com/Dustymaterial/Deutsch-community/discussions/categories/ideas). Report reproducible bugs and track development in [this repository's issues](https://github.com/saintheraldfaust/Deutsch/issues). Public discussions are separate from private in-app companion chats.

## Run locally or contribute

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Local study works without server credentials. See [CONTRIBUTING.md](./CONTRIBUTING.md) for account setup, deployment, scheduling rules and checks, and [AGENTS.md](./AGENTS.md) for product and engineering guidance.

## Sources and license

The app code is [MIT licensed](./LICENSE). The separate [optional voice package](./optional/german-voice/README.md) is GPL-3.0-or-later. An opt-in preview is available from App settings or Offline voice on a study card. Its roughly 77 MB download runs on the device without sending study text to a speech service. Desktop offline tests pass; iOS and Android verification remains outstanding. The adapted starter vocabulary and dictionary are separate **CC BY-SA 4.0** works derived from Wiktionary, Kaikki/Wiktextract and the slovymovy word lists. Human audio has its own attribution and license. See [DATA_SOURCES.md](./DATA_SOURCES.md) for sources, modifications and limitations.
