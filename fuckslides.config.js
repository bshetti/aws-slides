module.exports = {
  name: 'k8s-webinar',
  title: 'Kubernetes Observability, Reimagined — From Alert to Agentic Root Cause',
  port: 3003,
  slidesDir: 'slides',

  slides: [
    'cover.html',                 // 1  retitled → webinar name
    'safe-harbor.html',           // 2
    'intro-presenters.html',      // 3  NEW — "Let's talk about K8s investigations"
    'hook-3am.html',              // 4  the "3 AM" hook — it's 3am and you have these issues
    'alert-to-answer.html',       // 5  NEW — "the investigation runs before you open the alert"
    'columnar-metrics-tech.html', // 6  reuse — "Elastic's new columnar metrics engine"
    'kubernetes.html',            // 7  reuse — the easy button (OOTB K8s)
    'skills-vs-workflows.html',   // 8  NEW — Tool vs Skill vs Workflow decision rule
    'workflows.html',             // 9  NEW — Workflows run the investigation (Agents + Skills)
    'discover-metrics.html',      // 10 NEW — analyze metrics in Discover
    'mcp-demo.html',              // 11 reuse — agentic / MCP in Claude
    'demo-mechanism.html',        // 12 NEW — how we cause it + what signals light up
    'demo-transition.html',       // 13 NEW  → LIVE DEMO (Elastic UI, then Claude/MCP)
    'common-cases.html',          // 14 NEW  (return from demo)
    'thank-you.html',             // 15 reuse, retitled to CTA / close
  ],

  labels: [
    'Cover',
    'Safe Harbor',
    'K8s Investigations',
    '3 AM Hook',
    'Alert → Answer',
    'Columnar Engine',
    'Easy Button (K8s)',
    'Skill vs Workflow',
    'Workflows',
    'Discover Metrics',
    'MCP / Claude',
    'How We Break It',
    '→ Live Demo',
    'Common Cases',
    'Turn It On',
  ],

  pdfOverrides: {
    'kubernetes.html': {
      extra: ``,
      wait: 300,
    },
    'alert-to-answer.html': {
      // let the flow sweep + answer card scale-in settle
      wait: 3200,
    },
    'common-cases.html': {
      // grid tiles + shipped-alert chips
      wait: 1600,
    },
    'skills-vs-workflows.html': {
      // cards + workflow diagram + evidence bar stats settle
      wait: 2500,
    },
    'workflows.html': {
      // panels + capability chips settle
      wait: 1400,
    },
    'discover-metrics.html': {
      // app panel + chart grid settle
      wait: 1200,
    },
    'demo-mechanism.html': {
      // incident/signals/conclusion flow + arrows settle
      wait: 1500,
    },
    'demo-transition.html': {
      wait: 1600,
    },
    'intro-presenters.html': {
      wait: 1400,
    },
  },

  // Backup slides — pull in live if the conversation goes there
  // (e.g. "does Kibana really speak PromQL?" → promql.html)
  disabled: [
    'promql.html',
    'plain-english.html',
    'prometheus.html',    // removed from deck — kept as a backup ("meet SREs where they are")
    'metrics-myth.html',  // removed from deck — kept as a backup
    'competitive.html',   // removed from deck — kept as a backup proof-points slide
  ],
};
