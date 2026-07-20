module.exports = {
  name: 'k8s-webinar',
  title: 'Kubernetes Observability, Reimagined — From Alert to Agentic Root Cause',
  port: 3003,
  slidesDir: 'slides',

  slides: [
    'alert-to-answer.html',
    'columnar-metrics-tech.html',
    'skills-vs-workflows.html',
    'workflows.html',
    'discover-metrics.html',
    'kubernetes.html',
    'mcp-demo.html',
    'aws-ootb.html',
    'aws-turn-it-on.html',
    'thank-you.html',
  ],

  labels: [
    'Alert → Answer',
    'Columnar Engine',
    'Skill vs Workflow',
    'Workflows',
    'Discover Metrics',
    'Easy Button (K8s)',
    'MCP / Claude',
    'Lovable AWS OOTB',
    'Turn It On',
    'Close',
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
    'aws-ootb.html': {
      // kpi + service cards fade-ins settle
      wait: 1200,
    },
    'aws-turn-it-on.html': {
      // three panels card-in + discover sparkline grid render
      wait: 1400,
    },
  },

  // Backup slides — pull in live if the conversation goes there
  // (e.g. "does Kibana really speak PromQL?" → promql.html)
  disabled: [
    'cover.html',
    'intro-presenters.html',
    'hook-3am.html',
    'demo-mechanism.html',
    'demo-transition.html',
    'common-cases.html',
    'safe-harbor.html',
    'promql.html',
    'plain-english.html',
    'prometheus.html',
    'metrics-myth.html',
    'competitive.html',
  ],
};
