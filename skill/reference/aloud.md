# aloud

Play the writer's prose back to them via OpenAI TTS in an interactive session. The eye skips; the ear catches. Tongue-twisters, sing-songy parallel triplets, stumbling consonant clusters, paragraphs that drag — `pace`'s aural diagnostic flags candidates from word patterns, but `aloud` is the command where the writer actually hears the prose.

The session *is* the command. There's no static report.

## Source

The read-aloud tradition: every editor of consequence reads the prose out loud before shipping. Stephen King: "If it doesn't sound right, it isn't right." Eudora Welty wrote that her ear was always the final test.

The OpenAI speech skill ([`github.com/openai/skills`](https://github.com/openai/skills/tree/main/skills/.curated/speech)) provides the TTS engine. `aloud` is the prose-listening workflow on top.

## Dependencies

- **`OPENAI_API_KEY`** must be set in the environment. The command checks at session start. If missing, point the writer at the speech skill's instructions for setting it; never ask them to paste it.
- **System audio player** — one of `afplay` (macOS), `mpv`, `mplayer`, `paplay`, `ffplay` (Linux), `start` (Windows). The command detects which is available.
- **Python 3 + `openai` package** — required by the speech skill's `text_to_speech.py`. Install via `uv pip install openai` (preferred) or `python3 -m pip install openai`.

If anything's missing, the command falls back to emitting file paths the writer can play manually — but warns explicitly that the interactive flow is degraded.

## Load before running

- [_cadence-theory.md](_cadence-theory.md) — rhythm vocabulary used when discussing flagged paragraphs.
- [_style-laws.md](_style-laws.md) — propose, don't edit; voice trumps rule.

## Procedure

### Step 1 — pre-flight

Run in this order, exit early on the first failure:

1. **API key.** `echo $OPENAI_API_KEY` → empty? Exit with the speech-skill instructions for setting it.
2. **Player.** `command -v afplay mpv mplayer paplay ffplay 2>/dev/null` — pick the first that resolves. Save as `$PLAYER`.
3. **Speech skill.**
   ```bash
   node {{scripts_path}}/resolve-speech.mjs
   ```
   Parse the JSON. Save `scriptPath` (path to `text_to_speech.py`). If `source: "fetched"`, mention that pilcrow pulled it into `/tmp/pilcrow/skills/speech/`.
4. **Python.** `command -v python3` — required by the speech CLI.
5. **GC sweep.** Delete any `.mp3` in `/tmp/pilcrow/aloud/` older than 14 days (mtime).

### Step 2 — load voice profile

Run `node {{scripts_path}}/load-context.mjs`. Read VOICE.md fields:
- `aloud-voice:` — default `cedar`. Allowed: `cedar`, `marin`, plus any others listed by `python3 {scriptPath} list-voices`.
- `aloud-speed:` — default `1.0`. Range `0.25`–`4.0`.
- `default-aloud-mode:` — if set, skip the mode question.

If the writer's `genre` is set but `aloud-voice` isn't, use `cedar` for essay/report/memo/explainer and `marin` for fiction/marketing as a default. Don't switch voices mid-session.

### Step 3 — mode selection

Ask the writer (skip if `default-aloud-mode` is set):

> "How do you want to listen?
> - **walkthrough** (default) — I play paragraph 1, you say what you noticed; I play paragraph 2; etc.
> - **full** — I play the whole piece end-to-end, then ask what stuck out.
> - **targeted** — I play only paragraphs flagged by `pace` (longest, opening, closing, anything with an aural-diagnostic hit).
> - **compare** — pass two passages (or a draft + a proposed rewrite) and I play them back-to-back."

### Step 4 — paragraph segmentation

Split the target file into paragraphs. Standard markdown paragraph boundaries: blank line separates. Skip code blocks, tables, and headings unless `--include-non-prose` is set. Number paragraphs `p001`, `p002`, etc. (zero-padded to 3 digits for easy sorting).

If a paragraph exceeds 4096 characters (OpenAI TTS limit), split at sentence boundaries: `p007a`, `p007b`. Play them sequentially as one unit; gate on writer response only after the last chunk.

### Step 5 — generation + playback loop

For each paragraph the session plays:

1. **Hash.** Compute `sha256` of `<text>|<voice>|<model>|<speed>`. The model identifier is the speech skill's default (`gpt-4o-mini-tts-2025-12-15` at the pinned SHA) unless the writer overrode it.
2. **Cache check.** If `/tmp/pilcrow/aloud/<hash>.mp3` exists, use it. (Cache hit — no API call.)
3. **Generate on miss.** Otherwise:
   ```bash
   python3 {scriptPath} speak \
     --input "$paragraph_text" \
     --voice "$voice" \
     --speed "$speed" \
     --out "/tmp/pilcrow/aloud/$hash.mp3"
   ```
4. **Play.** Invoke `$PLAYER /tmp/pilcrow/aloud/<hash>.mp3`. Block until playback finishes. (Each player blocks by default; do not background.)
5. **Gate.** Wait for the writer's response. Do not pre-fetch the next paragraph's audio — that burns API quota on prose the writer might never reach.

### Step 6 — mode-specific prompts

**walkthrough.** After each paragraph:
> "Anything jump out — rhythm, a word that tripped, a beat that landed?"

Capture the writer's verbatim feedback against `pXXX`. Then play the next paragraph.

**full.** Play every paragraph back-to-back, no prompts between. After the last one:
> "Which paragraphs stuck out? Paragraph numbers are fine — `p003`, `p007`."

For each flagged paragraph, replay it (from cache, free) and ask the writer what they heard.

**targeted.** Before playback starts, run `pilcrow critique` or check `pace`'s recent output for paragraphs with `sentence-length-monotony`, `parallel-triplet-density`, `paragraph-monotony`, or `repeated-words-window` hits. Play only those. Same prompt as `walkthrough` between each.

**compare.** Take two inputs (original and rewrite, or `--passage-a` / `--passage-b`). Play A, pause, play B, pause:
> "Which one carried better? What changed when you heard the difference?"

### Step 7 — flagged-paragraph follow-up

For each paragraph the writer flagged, run `pace`'s aural diagnostic (tongue-twisters, word-boundary stumbles, consonant clusters, unintentional rhyme, heavy syllabic stretches) on that paragraph specifically. Propose rewrites. Do not edit the file.

### Step 8 — session report

Emit a short summary at the end:

```
# Aloud session — <file>
Mode: <walkthrough | full | targeted | compare>
Voice: <voice> @ <speed>x
Paragraphs played: <N>
Cache hits: <count>  (saves <approx-N> API calls)

## Flagged by writer (M)

### p003 — "<first 80 chars of the paragraph>…"
Writer said: "<verbatim>"
Aural diagnostic: <tongue-twister at L:C: "...">
Proposed rewrite: <one option>

### p007 — "..."
...

## Audio cache
Stored in /tmp/pilcrow/aloud/. 14-day mtime GC ran at session start, removed <K> stale files.
```

## Voice defaults

| Field | Default | When to override |
|---|---|---|
| voice | `cedar` (neutral) | Brighter (`marin`) for fiction or marketing. Don't switch mid-session — cadence comparisons break. |
| speed | `1.0` | Lower (`0.85`) if the writer is auditing pacing in dense technical prose; higher (`1.15`) for full-read mode on long pieces. |
| model | speech skill's default (`gpt-4o-mini-tts-2025-12-15` at pinned SHA) | Pin to a specific model only if the writer needs reproducible audio across sessions. |

The voice settings live in `VOICE.md`:

```yaml
aloud-voice: cedar
aloud-speed: 1.0
default-aloud-mode: walkthrough
```

## Cache layout

```
/tmp/pilcrow/aloud/
  <sha256(text|voice|model|speed)>.mp3
  <sha256(...)>.mp3
  ...
```

- **Persistent across sessions.** Re-listening to a paragraph the next day costs zero API calls.
- **Content-addressable.** The hash is the manifest. No metadata files; no slug directories.
- **14-day mtime GC.** Runs at session start. Files used recently survive; abandoned ones get reaped.
- **No `--no-cache` flag.** If the writer wants a fresh generation, they tweak a word; the hash changes; the cache misses; new mp3.

## Output

The session is the command. The report (Step 8) is the artifact. There's no JSON or finding-shaped output — `aloud` produces commentary, not findings.

## Anti-patterns

- **Auto-playing without pauses (in walkthrough or targeted mode).** Defeats the point. The pause is where the writer's ear catches.
- **Pre-fetching audio for paragraphs the writer hasn't reached.** Burns API quota; defeats cost discipline.
- **Switching voice mid-session.** Cadence comparisons break — the writer can no longer tell whether the rhythm shifted or the voice did.
- **Skipping the GC sweep.** Disk fills.
- **Emitting only file paths without playback.** The point of `aloud` is the listening session. File-path output is the *fallback* (no player available), with an explicit warning to the writer.
- **Treating cache hits as failures.** A cache hit means the writer is replaying. That's a feature.
- **Editing the file from inside `aloud`.** Propose rewrites for flagged paragraphs; let `polish` or the writer apply them.
- **Long-form prompts between paragraphs.** Keep prompts to one short question. Long prompts break the listening flow.
