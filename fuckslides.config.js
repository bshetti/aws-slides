module.exports = {
  name: 'k8s-webinar',
  title: 'Kubernetes Observability, Reimagined — From Alert to Agentic Root Cause',
  port: 3003,
  slidesDir: 'slides',

  slides: [
    'cover.html',                 // 1  retitled → webinar name
    'safe-harbor.html',           // 2
    'intro-presenters.html',      // 3  NEW — "Let's talk about K8s investigations"
    'columnar-metrics-tech.html', // 4  reuse — "Elastic's new columnar metrics engine"
    'kubernetes.html',            // 5  reuse — the easy button (OOTB K8s)
    'alert-to-answer.html',       // 6  NEW
    'workflows.html',             // 7  NEW — Workflows run the investigation (Agents + Skills)
    'discover-metrics.html',      // 8  NEW — analyze metrics in Discover
    'mcp-demo.html',              // 9  reuse — agentic / MCP in Claude
    'demo-transition.html',       // 10 NEW  → LIVE DEMO (Elastic UI, then Claude/MCP)
    'common-cases.html',          // 11 NEW  (return from demo)
    'thank-you.html',             // 12 reuse, retitled to CTA / close
  ],

  labels: [
    'Cover',
    'Safe Harbor',
    'K8s Investigations',
    'Columnar Engine',
    'Easy Button (K8s)',
    'Alert → Answer',
    'Workflows',
    'Discover Metrics',
    'MCP / Claude',
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
    'workflows.html': {
      // panels + capability chips settle
      wait: 1400,
    },
    'discover-metrics.html': {
      // app panel + chart grid settle
      wait: 1200,
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
    'hook-3am.html',      // removed from deck — kept as a backup (the "3 AM" hook)
    'metrics-myth.html',  // removed from deck — kept as a backup
    'competitive.html',   // removed from deck — kept as a backup proof-points slide
  ],
};
