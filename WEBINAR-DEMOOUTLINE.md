# Demo Handoff — for the Webinar Narrative Author

**Who this is for:** the AI agent building the broader webinar narrative. You have the greater
context; you do **not** yet know the live demo segment. This doc briefs you on *what the demo is,
what it shows, and what it means*, so you can (a) bridge from the broader story **into** the demo and
(b) tie it back out **after**. You don't need any commands or setup — this is about substance and
message, not operations.

**Segment shape:** tell → show → tell. The broader context is told first, then narrowed to this
demo, then the demo is shown live, then we zoom back out to the webinar's larger thread.

---

## 1. The demo in one sentence

A real microservices app on Kubernetes develops a **silent memory leak in one service**, and Elastic
Observability catches it across **multiple signals** while an **AI agent autonomously investigates and
root-causes it** — showing proactive detection, multi-signal correlation, and agentic RCA in a single
incident lifecycle.

## 2. The elevator version (for narration)

We take the OpenTelemetry "Astronomy Shop" demo app running on a live Kubernetes cluster, fully
instrumented with OpenTelemetry (via Elastic's EDOT distribution) shipping metrics, logs, and traces
into Elastic. We turn on a **realistic fault**: the `recommendation` service's cache stops evicting, so
its memory quietly climbs. That leak escalates — the container hits its memory limit, gets **OOMKilled**,
Kubernetes restarts it, it fills up again: a **CrashLoopBackOff**. Elastic sees this coming and reacts
on several fronts at once, and an AI investigation agent — triggered automatically by the alert —
produces a root-cause analysis that correctly blames the leak and *rejects* the noisier symptoms
elsewhere. Then we fix it and watch everything recover.

## 3. The core thesis — the messages to reinforce

These are the points the demo exists to prove. Weave them into the surrounding narrative:

1. **A silent OOM is an *availability* problem, not an *error-rate* one.** When a service runs out of
   memory it doesn't throw application errors — it just *disappears*. So the signals that catch it are
   availability-shaped (restart alerts, SLO burn, throughput collapse, Kubernetes OOM/BackOff events),
   **not** the classic "error rate went red" badge. This is why single-signal monitoring misses it.
2. **The differentiator is correlation + synthesis, not any one detector.** The moat isn't "we have
   anomaly detection" or "we have alerts." It's tying together **metrics + logs/events + traces +
   Kubernetes state** and having an **agent reason across them** to a confident root cause.
3. **Proactive *and* reactive *and* agentic, in one lifecycle.** The same incident shows ML catching the
   leak *early* (lead time), thresholds/SLOs catching the *escalation*, and an agent doing the
   *investigation* a human would otherwise do by hand.
4. **The hard signals are the leak and the throughput collapse — not the OOM.** The OOM itself is easy
   (a threshold). The gradual leak (needs ML) and the silent throughput drop (no error signature) are
   the genuinely hard detections. That's where the platform earns its keep.

## 4. What's actually happening (concrete substance, for accuracy)

- **The app:** OpenTelemetry Astronomy Shop — a realistic polyglot microservices e-commerce app
  (frontend, cart, checkout, recommendation, product-catalog, etc.), the industry-standard OTel demo.
- **Where it runs:** a live Kubernetes (GKE) cluster — **this is real infrastructure, not slides or a
  mockup.** Telemetry flows through OpenTelemetry/EDOT collectors into Elastic (a single-source
  Serverless Observability project).
- **The fault:** the `recommendation` service's cache grows without bound (a feature-flagged
  "cache failure" in the demo app) → its memory climbs from a normal ~40 MiB baseline until it crosses
  the container limit → **OOMKilled → CrashLoopBackOff**.
- **The blast radius:** as `recommendation` drops out, its caller `frontend` starts returning errors —
  so the failure is visible as *both* Kubernetes/memory signals on `recommendation` *and* APM trace
  errors on `frontend`. One incident, multiple data types.

## 5. The five acts (the narrative beats of the "show")

| Act | What the audience sees | The point it makes |
|---|---|---|
| **0 — Baseline** | Healthy system: green dashboards, SLO at target, no alerts | Establishes "normal" so the drift is meaningful |
| **1 — Proactive ML catch** | An anomaly-detection job flags `recommendation`'s memory creeping up **before** it crashes | Lead time you don't get from a static threshold |
| **2 — Escalation** | Memory hits the limit → OOMKilled → repeated restarts → **CrashLoopBackOff alert** + **SLO fast-burn alert** | The availability failure lighting up availability signals |
| **3 — Blast radius** | `frontend` error rate climbs; service map shows a red dependency edge to `recommendation` | Multi-signal: metrics on one service, trace errors on another |
| **4 — Investigation** | The alert **auto-triggers an AI agent** that investigates and root-causes the OOM; a human drill (dashboard → pod → events) corroborates it in under a minute | Agentic RCA + human-in-the-loop converge on the same answer |
| **5 — Remediation** | Fix the limit/leak → pod healthy, errors subside, SLO stabilizes | Closes the loop; recovery is observable too |

**The signature moment (Act 4):** the agent anchors the root cause on `recommendation`'s own memory
behavior and **explicitly rejects** the blast-radius symptoms (the `frontend` errors) as the cause —
i.e., it doesn't get fooled by the loudest signal. That "it reasoned like a good SRE would" beat is the
emotional peak of the demo.

## 6. What "the agent" actually is — the investigation workflow

This is worth understanding, because "an AI investigated it" is the headline and you'll want to describe
it without hand-waving. It is **not** a chatbot and **not** a canned script. It's a **saved automation in
the platform** (a Kibana *Workflow*) that the CrashLoopBackOff alert **triggers automatically** — no human
clicks, no glue code. And it's a **hybrid**: deterministic evidence-gathering from *live* telemetry, then
LLM steps for judgment. That combination is the point — it's **grounded in real data, then reasons over it**,
rather than an LLM guessing from a prompt.

**What it does, in the order a good SRE would:**
1. **Characterize the failing pod** — restarts, memory and CPU utilization vs. their limits, CPU throttling.
2. **Decide the failure mode** — is this an OOM or something else? (Robustly: if Kubernetes didn't record
   the termination reason, it infers OOM from memory being pinned at the limit.) Then it branches:
   - **If OOM:** consult the **ML anomaly** results to tell a *memory leak* (anomaly present → "leak
     suspected") apart from a *load-driven spike* (no anomaly → "load-driven, no leak"). This is how it
     distinguishes the two hard cases.
   - **If not OOM:** pull the pod's logs and have the AI **classify the crash pattern** (connection
     refused, dependency down, timeout, panic, etc.).
3. **Establish scope** — two independent checks: (a) compare *every* service's error rate and latency now
   vs. its 7-day baseline → *isolated to this service* vs. *widespread degradation*; and (b) **blast
   radius** — find the services that actually *call* the failing one and are now erroring (the real
   downstream victims).
4. **Correlate recent Kubernetes changes** — deploys, scaling, image pulls, BackOff/Killing events in the
   last couple hours.
5. **Synthesize a root-cause report** — a structured output: hypothesis + confidence, evidence chain,
   probable cause, recommended next steps, and scope/blast-radius.

**The part that makes it trustworthy (and drives the signature moment):** the synthesis step is given
explicit reasoning rules — *anchor on the failing pod's own signals first; treat other services'
degradation as context, not cause; only blame an upstream cause if the pod's own signals don't explain
it AND the others degraded first; don't invent a "cascading failure" story from coincidental timing;
prefer the simplest local explanation and lower confidence when unsure.* That discipline is exactly why
it correctly blames `recommendation`'s memory and refuses to pin it on the noisier `frontend` errors.

**Why it generalizes (a credibility point, not just a demo trick):** the workflow uses only OpenTelemetry
semantic-convention fields and **no hard-coded service names** — it reads the failing service from the
alert. So the same workflow runs against *any* customer's Kubernetes + OTel environment, and it's built to
tolerate real-world ingest gaps. It's shippable content, not a one-off wired for this stage.

## 7. Format & logistics (so you can time the surrounding narrative)

- **Live**, on real infrastructure. The "show" portion runs roughly **15–20 minutes**.
- Because a memory leak and a crash loop take real time to unfold, parts are **pre-staged** before the
  segment (the leak is already climbing when we arrive at Act 1). The audience sees genuine live data,
  not a recording — but the clock has been started in advance. (Narratively you can treat it as "we
  started this a little while ago so we can watch it play out.")
- It is **one continuous incident**, not a series of disconnected feature tours. That single-thread
  quality is worth setting up in the "tell" before.

## 8. Bridges you can use (into and out of the demo)

**Coming in** (broad → demo): whatever the webinar's larger theme is — agentic operations, AI-assisted
troubleshooting, reducing time-to-resolution, the value of open telemetry standards — this demo is the
*concrete, live proof* of it. A natural transition: *"Everything we've described so far — let's watch it
happen to a real system, in real time."*

**Going out** (demo → broad): the demo grounds several reusable themes you can pick back up:
- **Agentic observability** — an AI agent doing first-line investigation autonomously.
- **AI-driven root cause / lower MTTR** — the human arrives to a *finished* analysis, not a blank console.
- **Open, multi-signal telemetry (OpenTelemetry/EDOT)** — the correlation is only possible because
  metrics, logs, traces, and K8s state are all present and connected.
- **Proactive vs. reactive** — catching the leak early vs. catching the crash.
- **Human + agent workflow** — the agent proposes, the human corroborates and decides.

A natural transition back: *"What you just saw wasn't a scripted best case — it's the platform doing the
correlation and reasoning we opened by talking about."*

## 9. Scope & honesty guardrails (so the narrative doesn't oversell)

- It demonstrates **one incident class** (a memory/availability failure). It's representative, not
  exhaustive — don't imply it covers every failure mode.
- The proactive ML beat depends on the system having **learned a normal baseline first** — it's not
  instant-on magic; it's "give it normal data and it learns what normal is."
- The agent's job here is **investigation and root-cause**, with a human confirming — frame it as
  augmentation, not full autonomy/auto-remediation.

## 10. Mini-glossary (terms the narrative may touch)

- **OTel / OpenTelemetry** — vendor-neutral standard for emitting telemetry; **EDOT** is Elastic's
  supported distribution of it.
- **OOMKilled** — the container was terminated by Kubernetes for exceeding its memory limit.
- **CrashLoopBackOff** — Kubernetes state where a container keeps crashing and being restarted, with
  increasing back-off delay.
- **SLO / error budget / burn rate** — the reliability target, how much failure is tolerable, and how
  fast that tolerance is being consumed. A "fast-burn" alert fires when it's being consumed unusually
  quickly.
- **Blast radius** — the set of *other* services affected by one service's failure.
- **Anomaly detection (ML job)** — learns a metric's normal pattern and flags deviations (here, the
  memory creep).
