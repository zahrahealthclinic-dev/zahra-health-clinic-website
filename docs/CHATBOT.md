# Clinic chatbot maintenance

This is a local, rule-based website guide, with no AI API, API key, database,
tracking, external requests or saved conversation history. WhatsApp only opens
when the visitor chooses its link. It is not a diagnostic tool or live booking system.

## Update answers after website edits

Edit the regular website pages, then run from the project folder:

```powershell
node scripts/build-chatbot-data.js
node --test tests/chatbot.test.js
```

Commit the generated `scripts/chatbot/chatbot-knowledge.js` with the website changes. Increment
its `?v=` value on the eleven HTML pages when publishing refreshed answers so
returning visitors receive the new file.

The builder imports published FAQs, treatment cards, doctor profiles and contact
details. Operational answers and English/Roman Urdu aliases are defined in
`scripts/build-chatbot-data.js`. Update these if the booking process or clinic
policies change. Add a regression question to `tests/chatbot.test.js` when fixing
a misunderstood query.

## Files

- `scripts/chatbot/chatbot-knowledge.js`: generated website content and topic aliases.
- `scripts/chatbot/chatbot-engine.js`: matching, follow-ups and medical/unsupported handoff.
- `scripts/chatbot/chatbot.js`: welcome, chat UI, source links, clear/close interactions.
- `css/chatbot.css`: theme, mobile layout and WhatsApp integration.

The same clinic guide appears on all eleven pages. Conversations reset on page
navigation or reload. It answers supported questions and wording variations;
it cannot understand every possible question like an AI model. For unknown,
personal medical, pricing/availability confirmations and unrelated questions it
offers the clinic contact rather than inventing details.

Mobile: the floating WhatsApp button hides only after successful chatbot
initialization; a WhatsApp link remains inside chat. Desktop: both floating
buttons remain. The back-to-top button keeps its separate position.
