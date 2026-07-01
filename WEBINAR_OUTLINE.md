# Kubernetes Observability, Reimagined — From Alert to Agentic Root Cause

**Master webinar outline & script** — the blueprint for building the fuckslides deck in this folder.

> This is the working document. fuckslides renders **HTML slides** (`slides/*.html`, ordered in `fuckslides.config.js`), so this MD is the script that drives them: for each beat it lists the slide to use (reuse an existing one or build new), the visual/animation intent, and the **full scripted Jesse ⇄ Bahubali dialogue** that becomes the speaker notes (`notes.json`).

---

## At a glance

| | |
|---|---|
| **Title** | Kubernetes Observability, Reimagined — From Alert to Agentic Root Cause |
| **Format** | Two-person conversation (not a lecture). Bahubali hosts and drives; Jesse Miller (PM) brings the product story and the "why we built it this way." |
| **Runtime** | ~45 min total → ~20–25 min conversation over slides + **15+ min live demo** + Q&A buffer |
| **Presenters** | **Bahubali** (host / technical) · **Jesse Miller** (Product Manager) |
| **Rule of the room** | Fewer slides, more discussion. Slides are *conversation props* and *visual anchors* — they set up a question, land one proof point, then get out of the way. |

### The five things the audience must leave believing

1. **Elastic does metrics — at scale.** There is a real, purpose-built **columnar metrics engine** (a metrics database) underneath, engineered for **high-cardinality** workloads like Kubernetes — *without* blowing up the budget.
2. **Elastic is the "easy button" for SREs.** Pre-built K8s dashboards, day-one alert templates, and per-workload ML baselines mean you don't build observability — you turn it on.
3. **From alert to answer, automatically.** Investigation Workflows run the diagnosis before the human opens the alert. Not a link to a dashboard — a structured root-cause hypothesis with evidence.
4. **Agentic, in the tools you already use.** The Elastic Observability MCP app brings that same investigation depth into Claude, Cursor, and any MCP client — cluster health, dependency graphs, blast radius, alert creation, inline.
5. **This is real and it's now** — demonstrated live on an OOMKill cascade, end to end.

---

## Reusable slide inventory (what's already in `slides/`)

The copied deck already contains most of the visuals this webinar needs. Reuse these; only build the handful marked **NEW**.

| Existing slide | Reuse for | Notes |
|---|---|---|
| `cover.html` | Slide 1 — retitle to the webinar name | Swap headline + subtitle only |
| `safe-harbor.html` | Slide 2 — safe harbor | As-is |
| `columnar-metrics-tech.html` | Slide 6 — the metrics engine / metrics DB | Core "Elastic does metrics" proof |
| `competitive.html` | Slide 7 — speed/cost proof points | 30× faster, 4× cheaper framing |
| `prometheus.html` | Slide 8 — meet SREs where they are | Prometheus-native ingest |
| `promql.html` | Slide 8b (optional) — PromQL in Kibana | Only if time allows |
| `kubernetes.html` | Slide 9 — the easy button / OOTB K8s | Already shows `jmiller-robot-shop` cluster 🎯 |
| `mcp-demo.html` | Slide 11 — agentic / MCP in Claude | Sets up the second half of the demo |
| `plain-english.html` | Slide 11b (optional) — talk to your infra | Conversational framing |
| `thank-you.html` | Slide 16 — close | Retitle CTA |

**Build new (5 slides):** `intro-presenters.html`, `hook-3am.html`, `metrics-myth.html`, `alert-to-answer.html`, `demo-transition.html`, `common-cases.html`. (Six if you keep presenters separate from the hook.)

---

## Proposed slide order (drop into `fuckslides.config.js`)

```js
slides: [
  'cover.html',              // 1  retitled
  'safe-harbor.html',        // 2
  'intro-presenters.html',   // 3  NEW
  'hook-3am.html',           // 4  NEW
  'metrics-myth.html',       // 5  NEW
  'columnar-metrics-tech.html', // 6  reuse
  'competitive.html',        // 7  reuse
  'prometheus.html',         // 8  reuse
  'kubernetes.html',         // 9  reuse  (the easy button)
  'alert-to-answer.html',    // 10 NEW
  'mcp-demo.html',           // 11 reuse
  'demo-transition.html',    // 12 NEW  → LIVE DEMO (Elastic UI, then Claude/MCP)
  'common-cases.html',       // 13 NEW  (return from demo)
  'thank-you.html',          // 14 reuse, retitled to CTA/close
],
```

Keep `promql.html` and `plain-english.html` in `disabled: []` as backup slides you can pull in live if the conversation goes there.

---

# The script, slide by slide

> Notation: **[B]** = Bahubali, **[J]** = Jesse. Everything under "Dialogue" is meant to be lightly rehearsed, not read verbatim — it's the spine of the conversation and the content for `notes.json`.

---

## 1 — Cover · `cover.html` (retitle)

**On screen:** Title *"Kubernetes Observability, Reimagined"* / subtitle *"From Alert to Agentic Root Cause."* Elastic logo. Dark dot-grid, big 900-weight headline.
**Animation:** existing fade-up on title; let it settle before anyone speaks.

**Dialogue**
- **[B]** "Welcome in, everyone. Today we're talking about the worst part of running Kubernetes — the 3 AM part — and how it's about to look completely different. I've got Jesse Miller with me, who owns a lot of this on the product side."
- **[J]** "Glad to be here. Fair warning: about halfway through we stop talking and I make Bahubali break a real cluster on camera."
- **[B]** "That's the plan. Let's go."

---

## 2 — Safe harbor · `safe-harbor.html`

**On screen:** existing safe-harbor language.
**Animation:** none.

**Dialogue**
- **[B]** "Quick legal beat — some of what we show is forward-looking, so make your buying decisions on what's generally available. Ten seconds, and we move on."

---

## 3 — Who's talking · `intro-presenters.html` **(NEW)**

**On screen:** two simple cards, left/right — *Bahubali · Host / Technical* and *Jesse Miller · Product Manager, Observability*. A thin center line/handshake motif.
**Animation:** two cards fade-up staggered (0.15s / 0.30s); center connector draws in.

**Dialogue**
- **[B]** "Thirty seconds on us. I spend my days in customers' clusters helping SRE teams stop fires. Jesse — you decide what we build to make that possible."
- **[J]** "Right. My job is basically to make sure that when you're staring at a CrashLoopBackOff, the product already did the boring 40 minutes of correlation for you. We'll come back to that phrase — *the boring 40 minutes* — a lot today."
- **[B]** "So the format: I'm going to ask Jesse the questions I actually get asked by SREs. He answers. Then we go prove it live."

---

## 4 — The 3 AM problem · `hook-3am.html` **(NEW)**

**On screen:** a dark "pager" moment. Center: `CrashLoopBackOff` in mono red. Around it, four disconnected tool tiles (metrics, logs, traces, k8s events) that visibly *don't* connect — dotted broken lines between them.
**Animation:** pager buzz (subtle shake on the alert chip), then the four tiles fade in around it; the broken connector lines flicker but never complete. Optional counter: `restarts data-target="147"`.

**Dialogue**
- **[B]** "Here's the moment we're designing for. It's 3 AM. A pod is in CrashLoopBackOff. What does that hour actually look like today, Jesse?"
- **[J]** "It looks like tab roulette. You've got restart counts in one tool, memory limits in a second, the log line that matters in a third, and the k8s events in a fourth — and none of them share an identity for the pod. So the human becomes the join key. At 3 AM. That's the problem. It's not that the data doesn't exist — it's that nothing correlated it for you."
- **[B]** "And every one of those tabs is a place to lose ten minutes."
- **[J]** "Exactly. Our whole thesis is: the *machine* should do the correlation, and the human should get an answer. Everything after this slide is us earning that claim."

---

## 5 — "But Elastic doesn't do metrics…" · `metrics-myth.html` **(NEW)**

**On screen:** a big struck-through myth. Line 1 (crossed out): *"Elastic is a log tool."* Line 2 (revealed): *"Elastic has a purpose-built metrics engine."* Small tag: *high cardinality · at scale · on budget.*
**Animation:** first line types out, then a strike-through sweeps across it; second line fades up bold underneath; the three tags pop in.

**Dialogue**
- **[B]** "I have to start here, because it's the number-one objection I hear: *'Isn't Elastic just logs? For metrics I'll keep Prometheus or Datadog.'* Jesse — kill that myth."
- **[J]** "Happily. Elastic has a real metrics database underneath — a columnar time-series engine we built specifically for metrics. Not logs with a metrics label on top. Purpose-built columnar storage, a metrics query path, and — this is the part people don't expect — it's engineered for **high cardinality**. Kubernetes is the ultimate cardinality monster: every pod, container, namespace, node is a new series. That's exactly the workload this engine eats."
- **[B]** "And the reason people churn off other tools at scale is the bill."
- **[J]** "That's the whole point. High cardinality is where the *other* vendors' pricing explodes. We re-engineered storage so you can keep **all** the data — which, spoiler, is what makes the AI part actually work — without the cardinality tax. So the answer to the objection is: metrics, at Kubernetes scale, on a budget you can defend to your CFO."
- **[B]** "Let's show them the engine."

---

## 6 — The metrics engine (the metrics DB) · `columnar-metrics-tech.html`

**On screen:** existing three-pillar tech slide — *Blazing Fast Query*, *Storage Efficiency*, *Prometheus Ingest & PromQL* — with the deep engineering bullets.
**Animation:** existing reveals. Don't read the bullets; point at the three pillars.

**Dialogue**
- **[B]** "This is the engine. Three things, Jesse — the headline of each pillar."
- **[J]** "Left: query performance — vectorized, parallel column reads, so investigations come back fast, which matters a lot once AI is doing the querying for you. Middle: storage efficiency — true columnar files, doc-value skippers instead of heavyweight indices. Last year we stored a datapoint in ~25 bytes; now it's under 4. That ~6× is *why* keeping all the data is affordable. Right: it speaks Prometheus and PromQL natively — same protocol in, same query language, one storage layout underneath."
- **[B]** "So for the SRE that already lives in Prometheus…"
- **[J]** "…nothing about their instrumentation changes. Same wire protocol, same queries — better engine, cheaper storage. We'll hit that on the next slide."
- **[B]** "The thing I want people to hold onto: *store more, cheaper* isn't a nice-to-have. It's the fuel for the AI investigation you're about to see."

---

## 7 — Why we win competitively · `competitive.html`

**On screen:** existing proof-point slide — the "×" comparison numbers vs Prometheus / Mimir / ClickHouse and the cost line vs Datadog.
**Animation:** existing counters snap up.

**Dialogue**
- **[B]** "Put numbers on it. When I'm in a competitive deal, what do I say?"
- **[J]** "Faster queries than Prometheus and Mimir, strong edge on ClickHouse, storage efficiency that beats the field, and PromQL compatibility so there's no relearning. And on Datadog specifically — meaningfully cheaper at the same cardinality. The pitch isn't 'switch and compromise.' It's 'same language, upgrade the engine, cut the bill.'"
- **[B]** "That's the framing I use: it's an upgrade, not a migration."

---

## 8 — Meet SREs where they are · `prometheus.html`

**On screen:** existing Prometheus slide — native ingest, PromQL, "live in a day."
**Animation:** existing.
**Backup:** `promql.html` and `plain-english.html` are in `disabled:` — pull `promql.html` in live if someone asks "does Kibana really speak PromQL."

**Dialogue**
- **[B]** "So concretely — an SRE running Prometheus and Grafana today. What's the switching cost?"
- **[J]** "Close to zero to try. Point your Prometheus remote-write at Elastic, keep writing PromQL, keep your Grafana muscle memory. You can be live in a day, and the dashboards and alerts convert over. The whole design principle is: don't ask the SRE to relearn their job. Give them their world, faster and cheaper — and *then* layer the new stuff on top."
- **[B]** "Which is the perfect setup for the actually-new stuff. Let's talk about the easy button."

---

## 9 — The easy button: OOTB Kubernetes · `kubernetes.html`

**On screen:** existing lovable-OOTB K8s slide — 93% stat, revamped dashboards & alerts, OOTB SLOs & agent skills, K8s workflows, the live cluster-health mock (note: it literally shows a `jmiller-robot-shop` cluster — call that out for a laugh).
**Animation:** existing dashboard reveal.

**Dialogue**
- **[B]** "Jesse — I don't want to *build* observability. I want to turn it on. What do I get out of the box?"
- **[J]** "The new Kubernetes integration ships with the dashboards already built — and built for drill-down, not just pretty tiles. It ships alert templates that fire on day one: CrashLoopBackOff, OOMKilled, pending pods, node disk pressure — the classics, pre-wired. And ML anomaly detection that learns a baseline *per workload*, so it flags a memory-growth trajectory before it becomes an incident."
- **[B]** "Per-workload is the key word — my payments service and my batch job don't behave the same."
- **[J]** "Right, a global threshold is useless. The ML learns 'normal' for each workload. And — Bahubali, look at the cluster list on screen…"
- **[B]** "…that's *your* robot-shop cluster, Jesse. Are we about to break your cluster on this webinar?"
- **[J]** "We absolutely are. That's the demo. But first, one more capability — the part that turns an alert into an answer."

---

## 10 — From alert to *answer* · `alert-to-answer.html` **(NEW)**

**On screen:** a left-to-right flow, four nodes → one answer card:
`Alert fires` → `Check termination reason` → `Consult ML anomaly index` → `Assess upstream health vs 7-day baseline` → **`Root-cause hypothesis + evidence + next steps`**.
**Animation:** nodes light up in sequence (staggered), a progress line sweeps left→right, then the final **answer card** scales up with a subtle glow. Optional stat: `time-to-context data-target="0" data-suffix=" min for the human"`.

**Dialogue**
- **[B]** "This is the piece I think people underestimate. Walk me through what happens the instant an alert fires."
- **[J]** "The Investigation Workflow runs the diagnosis automatically — before you even open the alert. It checks the termination reason from the k8s API. It consults the ML anomaly index to see what was already abnormal. It assesses upstream service health against a 7-day baseline to catch a cascade. And it writes a **structured root-cause hypothesis** — with the evidence it used and recommended next steps."
- **[B]** "So when the human wakes up and clicks the page…"
- **[J]** "…they don't get a link to six dashboards. They get *an answer* to react to. The boring 40 minutes already happened. That's the shift — the human moves from *investigator* to *decision-maker*."
- **[B]** "And for teams that live in an IDE or an agent, this same depth follows them. Which is the next slide."

---

## 11 — Agentic, in your tools · `mcp-demo.html`

**On screen:** existing MCP demo slide — Elastic Observability MCP app in Claude, plain-English question → real data (health, dependencies, blast radius).
**Animation:** existing.
**Backup:** `plain-english.html` if you want to dwell on the conversational angle.

**Dialogue**
- **[B]** "Not everyone lives in Kibana. My SREs live in Claude, in Cursor, in the terminal. What do they get?"
- **[J]** "The Elastic Observability MCP app exposes the *same* investigation depth to any MCP-compatible client — Claude, Cursor, whatever. Cluster health, service dependency graphs, blast-radius analysis, even alert creation — all inline, without leaving the IDE. So the on-call engineer can ask, in plain English, 'what's the blast radius of the cart service right now,' and get a real answer grounded in the metrics engine."
- **[B]** "Which means the second half of our demo is: do the exact same investigation we just did in the UI — but from inside Claude."
- **[J]** "Same data, same brains, different surface. Let's go break something."

---

## 12 — To the demo · `demo-transition.html` **(NEW)**

**On screen:** big transitional statement — *"Let's cause an OOMKill cascade."* Small subtitle: *jmiller-robot-shop · live.* A "record" dot pulsing.
**Animation:** headline fade-up; a red record dot pulses; optional 3-2-1 style tick. Keep it clean — this slide is on screen for 15 seconds before you alt-tab to the live environment.

**Dialogue**
- **[B]** "Alright — slides down, real environment up. Here's what we're going to do, and I'll narrate the whole way. Jesse, set the scene."
- **[J]** "We've got the robot-shop app running on a cluster. We're going to squeeze a memory limit so a workload starts getting OOMKilled, and it'll cascade upstream. Then we watch Elastic catch it, correlate it, and hand us a root cause — twice. Once in the UI, once in Claude."

### 🔴 LIVE DEMO — Part A: Elastic UI (~8–9 min)

Narrate as a story, not a tour. Suggested beats:

1. **Steady state (30s).** Show the OOTB Kubernetes dashboard — clusters healthy, `jmiller-robot-shop` green. "This is normal. Remember this shape."
2. **Break it (1 min).** Apply the tightened memory limit / load. Show restarts starting to climb on the target workload. Let the audience see `OOMKilled` appear as the termination reason.
3. **The alert fires (1 min).** The day-one OOMKilled alert template triggers — *without anyone building it.* Call that out: "Nobody configured this. It shipped."
4. **ML already knew (1–2 min).** Open the anomaly detection for that workload — show the memory-growth trajectory was flagged as anomalous *before* the crash. "The baseline is per-workload. It didn't need a threshold."
5. **The Investigation ran itself (2–3 min).** Open the alert → show the **auto-generated root-cause hypothesis**: termination reason = OOMKilled, correlated ML anomaly, upstream service health vs 7-day baseline, blast radius, recommended next steps. Emphasize: "I opened this alert *after* it was already diagnosed."
6. **Drill-down proof (1 min).** Click one piece of evidence to show it's real, queryable data from the metrics engine — not a canned summary.

> **Presenter cue (notes):** If ingest lag makes the live break slow, say "while that propagates…" and narrate the ML/anomaly story on already-running data. Have a pre-broken workload ready as a fallback.

### 🔴 LIVE DEMO — Part B: Claude + MCP (~6–7 min)

1. **Switch to Claude (30s).** "Same incident. Now I'm an SRE who lives in my IDE. I never open Kibana."
2. **Ask in plain English (2 min).** e.g. *"What's unhealthy in jmiller-robot-shop right now, and why?"* — show the MCP app returning cluster health + the OOMKilled workload, grounded in real metrics.
3. **Blast radius (2 min).** *"What's the blast radius of that workload?"* — show the dependency graph / upstream impact come back inline.
4. **Agentic RCA (1–2 min).** Let Claude walk the root cause using the Elastic skills — the same hypothesis the UI produced, reasoned out conversationally. "Same answer, different surface. The engine did the work both times."
5. **Optional: act (1 min).** Show creating an alert (or drafting the remediation) from inside Claude to close the loop.

> **Key line to land coming out of the demo:** "Two surfaces, one metrics engine, one investigation. The human never became the join key."

---

## 13 — The cases you'll actually hit · `common-cases.html` **(NEW)**

**On screen:** a clean grid of the everyday K8s failure modes, each with the signal Elastic uses and the day-one alert that covers it. Header: *"Not an edge case. Tuesday."*
**Animation:** grid tiles fade-up staggered; on each tile, a small "✓ shipped alert" chip pops in after the label.

Grid content:

| Failure mode | What it looks like | How Elastic catches it (day one) |
|---|---|---|
| **CrashLoopBackOff** | Pod restarts climbing, never stays Ready | Restart-count alert + termination-reason correlation |
| **OOMKilled** | Container hits memory limit, gets killed, repeats | OOMKilled alert template + per-workload memory-growth ML |
| **Pending pods** | Pods stuck Pending, can't schedule | Scheduling/pending alert + node capacity correlation |
| **Node disk pressure** | Node evicting pods, disk filling | Disk-pressure alert + node metrics from the metrics engine |
| **Memory-leak trajectory** | Slow climb toward the limit over hours | ML anomaly flags the *trajectory* before the crash |
| **Upstream cascade** | One workload's failure ripples to dependents | Blast-radius / dependency analysis vs 7-day baseline |

**Dialogue**
- **[B]** "Coming out of that — I don't want anyone thinking 'cool demo, but my incidents are boring.' These *are* the boring ones. Jesse, this grid is basically every ticket my SREs write."
- **[J]** "That's the point. CrashLoopBackOff, OOMKilled, pending pods, disk pressure, a slow memory leak, a cascade — every one of these has a day-one alert and a signal path already wired. You're not building detection for the common cases. They ship on. The ML and the investigation are what turn the *nasty* version of each of these into a two-minute read instead of a two-hour night."
- **[B]** "The easy button — for the stuff that actually pages you."

---

## 14 — Close & CTA · `thank-you.html` (retitle)

**On screen:** retitle to a clear CTA — *"Turn it on."* Three paths: existing Elastic customers (enable the K8s integration), Prometheus/Grafana shops (remote-write, live in a day), Datadog accounts (same cardinality, lower bill). Contact + `elastic.co/observability`.
**Animation:** existing.

**Dialogue**
- **[B]** "So — what do people do Monday?"
- **[J]** "Three doors. Already on Elastic? Turn on the Kubernetes integration and you've got the dashboards, the alerts, and the ML today. On Prometheus or Grafana? Point remote-write at us — you're live in a day and nothing about your queries changes. On Datadog and feeling the cardinality bill? Same data, lower cost, and this whole investigation experience on top."
- **[B]** "And if you're in an agentic workflow — grab the Observability MCP app and put this inside Claude, like we just did."
- **[J]** "One engine. Metrics at Kubernetes scale, on budget. An easy button for the common cases, and an AI that does the boring 40 minutes so your on-call gets an answer instead of a page."
- **[B]** "Thanks everyone — we'll take questions now, and we're both around after. Let's get into it."

---

# Build notes for whoever assembles the deck

- **Design system (match existing slides):** 1280×720 fixed; background `#0d0f14`; radial dot-grid `::before`; Inter font; accent cyan `#38BDF8`; `fade-up` keyframe with staggered `animation-delay`; each slide ends with `<script src="/js/fuckslides.js"></script>`. Copy the header/`<style>` block from `columnar-metrics-tech.html` as the starting template for the NEW slides.
- **Counters:** use `<span data-target="147" data-suffix="×"></span>` — animates on reveal, snaps in PDF export.
- **Scroll reveals:** `class="reveal"` + `.reveal.visible`.
- **Speaker notes:** paste each slide's **Dialogue** block into `notes.json` under that slide's filename. Press `N` in the player to see them live; `P` for presenter view (current + next + notes + timer). Because there are two presenters, consider prefixing each note line with **[B]** / **[J]** so you can both track who's up.
- **New slides to create:** `intro-presenters.html`, `hook-3am.html`, `metrics-myth.html`, `alert-to-answer.html`, `demo-transition.html`, `common-cases.html`.
- **Config:** update `slides:`/`labels:` in `fuckslides.config.js` to the order above; leave `promql.html`, `plain-english.html`, and any unused nightshift slides in `disabled:`.
- **Run it:** `npm run serve` (or `fuckslides serve`) → the player opens locally. `G` = overview/reorder, `T` = filmstrip, `P` = presenter view, `F` = fullscreen.
- **Export:** `fuckslides pptx` / `npm run pdf` when you need a shareable artifact. Add PDF overrides for any mid-animation slides (see the existing `pdfOverrides` block for the pattern).

# Timing sketch (~45 min)

| Segment | Slides | ~Time |
|---|---|---|
| Open + safe harbor + intros | 1–3 | 3 min |
| The problem + the metrics myth | 4–5 | 4 min |
| Metrics engine + competitive + Prometheus | 6–8 | 6 min |
| Easy button + alert-to-answer + MCP | 9–11 | 6 min |
| **Live demo (UI + Claude/MCP)** | 12 | **15–16 min** |
| Common cases | 13 | 3 min |
| Close/CTA + Q&A | 14 | 7–8 min |
