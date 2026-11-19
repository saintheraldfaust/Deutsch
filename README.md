# Deutsch by TFRI

An open-source system for learning and retaining German vocabulary, developed by The Faust Research Institute (TFRI). It combines active recall, deterministic spaced repetition and peer-assisted practice, connecting individual study with language use in context.

Vocabulary is represented as lexical units: meaning, grammatical forms and example usage. Individual review supports recall; companion sessions and sentence feedback provide opportunities to apply vocabulary. Core study runs locally, with optional account sync and consent-based community features.

![Revealed German recall card with meaning, article, plural and example usage](./public/Recall.png)

I needed to learn German for work, but I had postponed studying until the time available was short. My target was B1 in roughly 100 days, starting from zero. I needed a systematic way to practise alongside my coursework.

After trying other platforms, I made [vhs-Lernportal](https://www.vhs-lernportal.de/) my primary course platform. It fits the way I learn and provides the structure I need. Deutsch began with a complementary problem: how to retain the vocabulary I encounter in those lessons and make it available when I need to use it.

The implementation follows that problem closely. Recall comes before the answer is revealed. Review schedules bring vocabulary back across study sessions. Articles, plurals and examples keep words connected to their grammatical forms and usage. Companion review and sentence feedback provide opportunities to retrieve and apply vocabulary with another learner.

Deutsch is built around how I think and learn, informed by research on retrieval and distributed practice, and refined through my own use. I am sharing a system that is helping me structure that work. The B1 timeline is my personal constraint, not an outcome the software can guarantee.

I am sharing Deutsch as a starting point for others to adapt. Fork it, change the interface, adjust the practice modes or review logic, and shape it around how you learn. The current design reflects my needs; your experience can inform a different implementation. Make those choices explicit, test their effects, and keep refining what supports your learning.

German is the starting point. I expect this work to develop into separate applications for other languages, sharing the underlying approach while accounting for each language’s grammar, vocabulary and usage. That is a future direction, with the German implementation as the current focus.

## Learning model

Research on foreign-language vocabulary has found that repeated retrieval can improve delayed recall. Research on distributed practice also shows that the spacing between study sessions interacts with the intended retention period. These findings inform the recall-and-review loop. See [Karpicke and Roediger (2008)](https://pubmed.ncbi.nlm.nih.gov/18276894/) and [Cepeda et al. (2006)](https://pubmed.ncbi.nlm.nih.gov/16719566/).

The implementation makes these mechanisms explicit and inspectable. Its review intervals and practice defaults remain engineering heuristics; the research does not establish them as an optimal configuration or validate this application as a route to B1.

Four practice modes separate introduction, recall, production and recognition:

- **Learn** introduces vocabulary through meanings, grammatical forms and contextual examples. Nouns include articles and available plural forms. Missing forms remain explicitly unrecorded; verified dictionary suggestions can be saved. Words can be saved for later study or added to scheduled reviews.
- **Recall** presents a retrieval prompt before revealing the answer. Learners rate their recall and see the resulting review interval.
- **Produce** requests the saved German expression from its meaning and example context, including noun articles. Alternative translations can be explicitly accepted before grading.
- **Choose** presents four distinct German options. Known overlapping meanings and accepted alternatives are excluded from distractors.

Mode outcomes remain distinct. Correct Produce and Choose responses use **Hard** scheduling; misses use **Again**. Successful scheduled quiz responses progressively extend intervals. Scheduling is heuristic and does not establish mastery or language proficiency.

Adding vocabulary to reviews schedules its first review **10 minutes later**. First reviews and Again retries use elapsed minutes; longer intervals follow local calendar days. The study area displays the next review time and word count without exposing answers. Repeating today's words leaves their schedules unchanged.

The initial mode is Recall when locally stored reviews are due, otherwise Learn when unseen vocabulary remains. Reviews becoming due or progress syncing do not automatically change the selected mode during a visit. **Tune session** provides study-set filters, review history and confirmed progress resets.

**Goal & pace** configures daily allowances and review limits. Activity records participation in practice, not mastery. Optional study pauses default to 60 seconds after three distinct words are added to reviews or reviewed. **App settings** supports intervals of 3, 5 or 10 words and pauses of 30 seconds, 60 seconds or 2 minutes. Pauses can be skipped or disabled; these defaults are adjustable heuristics.

The system complements language instruction. It is not a complete course or an official vhs-Lernportal product. Its learning model prioritizes recall and contextual use without streak pressure or public rankings.

![Vocabulary study with word lookup and Goal & pace controls](./public/Db-TFRI.png)

## Collaborative practice

Community participation is optional and requires a verified account. Companion connections use usernames and mutual consent. Email addresses and wider study progress remain private.

### Companions

Private conversations support vocabulary sharing, local word lookup and optional sentence feedback. Shared vocabulary and suggested sentences enter a learner's deck only through an explicit save.

**Review together** samples five previously reviewed words, optionally restricted to a lesson or topic. A card deck temporarily replaces the conversation history. The learner submits an English meaning; the companion can confirm it, request another attempt or reveal the complete lexical unit. The learner can request a reveal, and either participant can end the session.

A highlighted **Review** message summarizes first-attempt recall, recall after retry and revealed answers. These companion-marked outcomes remain separate from individual review schedules, activity and deck scores.

### Groups

Opt-in groups support vocabulary questions, sentence production and specific feedback. Members can share word cards, look up terms, suggest revisions and explicitly save vocabulary or corrected sentences.

**Use this word** turns a shared card into a German sentence prompt. **Revise** links a subsequent attempt to the original; **Save sentence** requires an English meaning before adding it to the learner's deck. Group participation and feedback do not schedule reviews or grade vocabulary.

Group content is separate from private chat and visible to members. Owners manage membership and messages; members can report content and suggestions. Posting limits, shared rules and a moderation queue constrain misuse without exposing private decks, scores or study history.

External links remain visible with a warning. A limited English/German abuse list holds matching messages, edits, word cards and suggestions for human review. Moderators can restore false positives. The filter can miss abuse or misinterpret quoted vocabulary; reporting remains available. Private companion messages are not subject to this filter.

Conversations receive live updates when connected. Recent history can be stored on the device and displayed immediately while the server checks for updates. Connection failures preserve cached history; first visits, expired caches and cleared storage can require an initial download. Up to 20 pending messages can be retained for 24 hours. Unconfirmed messages require an explicit retry after reload.

![Group vocabulary sharing with the personal activity calendar open](./public/Peer.png)

## Vocabulary and language tools

New installations include **2,593 starter cards** covering core vocabulary and ten themes. Source-supplied A1/A2 labels and examples are not independently verified and can contain errors. Existing decks are preserved.

**Add a word** captures personal vocabulary with a meaning and German example; nouns require an article. Lesson and topic tags define study sets. Accepted German alternatives preserve explicit wording choices, including noun articles. [CSV](./public/deck-template.csv) and [JSON](./public/deck-template.json) templates support larger imports through **Import vocabulary or backup**. Newly imported vocabulary starts without review history; imports skip duplicates and preserve existing cards. Imported content requires accuracy review.

Word lookup is available in German examples during Learn, revealed reviews and chat. It searches personal vocabulary, starter content and a separately loaded dictionary. Multiple senses remain selectable, saved examples retain their context, and verified inflections can resolve to personal vocabulary. Dictionary glosses are context-free and coverage is incomplete. Adding a dictionary entry requires an example sentence. Private and group chats highlight words from active vocabulary.

**Listen** provides attributed human recordings matched to every headword in the current starter set. Matching does not guarantee the appropriate pronunciation for every homograph. Custom vocabulary uses a local German voice where available. Recordings load only on request and identify their author, source and license. Remote browser speech requires a separate explicit choice.

An optional **offline German voice preview** is available through App settings or a study card. Its approximately **77 MB** download synthesizes speech on the device without sending study text to a speech service. Desktop offline checks pass; physical iOS and Android verification remains outstanding. Synthesized pronunciation can be imperfect, and browser storage can be reclaimed.

## Local data and privacy

- **Local study:** core practice requires no account. Offline study is available after the app and vocabulary have been cached during an online visit. Concurrent tabs preserve changes to different words; conflicting edits to one word require a refresh. Failed persistence keeps the study action pending.
- **Optional sync:** an account synchronizes vocabulary and goals across devices. New accounts require email verification; password recovery uses time-limited codes. Sync and community services require a connection.
- **Data recovery:** backups preserve review state. Imports are additive by default. Clearing browser data can remove local progress, so external backups remain necessary.
- **Message handling:** private and group messages reside on the account server and are never sent to an AI or translation service. Word lookup runs locally; external dictionary links open only on request.
- **Device storage:** recent chat copies can be stale and accessible to other people using the same browser profile. **Save recent chats on this device** can be disabled in companion tools. Signing out or changing accounts clears saved chat copies and pending messages.
- **Consent and controls:** blocking ends a companion connection. Reporting, group membership and notification preferences remain under learner control. Optional account and companion emails use Mailjet.

[Privacy and operational details](./CONTRIBUTING.md#privacy-and-service-limits) document cache limits, retention, account recovery and email handling.

## Discussion and feedback

The [community Q&A](https://github.com/Dustymaterial/Deutsch-community/discussions/categories/q-a) covers product usage and learning behavior. [Ideas discussions](https://github.com/Dustymaterial/Deutsch-community/discussions/categories/ideas) support product proposals; [repository issues](https://github.com/saintheraldfaust/Deutsch/issues) track reproducible defects and implementation work. Public discussions are separate from private in-app conversations.

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Open the URL printed by Vite. Local study requires no server credentials. [CONTRIBUTING.md](./CONTRIBUTING.md) covers account setup, deployment and validation. [AGENTS.md](./AGENTS.md) defines product and engineering constraints.

## Licensing and sources

Application code is [MIT licensed](./LICENSE). The separate [offline voice component](./optional/german-voice/README.md) is GPL-3.0-or-later and retains its own source and model provenance.

The adapted starter vocabulary and dictionary are separate **CC BY-SA 4.0** works derived from Wiktionary, Kaikki/Wiktextract and the slovymovy word lists. Human recordings retain their individual attribution and licenses. [DATA_SOURCES.md](./DATA_SOURCES.md) documents sources, modifications and coverage limitations.
