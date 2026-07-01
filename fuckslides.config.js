module.exports = {
  name: 'customer-preso',
  title: 'Nightshift — Customer Presentation',
  port: 3003,
  slidesDir: 'slides',

  slides: [
    'cover.html',
    'safe-harbor.html',
    '00-portfolio.html',
    '02-track-record.html',
    '03-platform.html',
    'logs-pitch.html',
    'storage.html',
    'competitive.html',
    'columnar-metrics-tech.html',
    'prometheus.html',
    'promql.html',
    'kubernetes.html',
    'mcp-demo.html',
    'plain-english.html',
    'migrate.html',
    '04-transition.html',
    'world.html',
    'ai-scale.html',
    '05-ai-driven.html',
    '13-otel-collection.html',
    '06-streams.html',
    '07-ki-demo.html',
    'system-model.html',
    '08-discovery.html',
    'ns-transition.html',
    'ns-intro.html',
    'nightshift-hero.html',
    'nightshift-architecture.html',
    'nightshift-capabilities.html',
    'nightshift-ai-index.html',
    'nightshift-brain.html',
    'nightshift-ai-economics.html',
    'nightshift-live-demo.html',
    'nightshift-reveal.html',
    'thank-you.html',
  ],

  labels: [
    'Cover',
    'safe-harbor',
    '00-portfolio',
    '02-track-record',
    '03-platform',
    'logs-pitch',
    'Storage',
    'Competitive',
    'columnar-metrics-tech',
    'Prometheus',
    'PromQL',
    'Kubernetes',
    'MCP Demo',
    'Plain English',
    'Migration',
    '04-transition',
    'World',
    'AI Scale',
    '05-ai-driven',
    '13-otel-collection',
    '06-streams',
    '07-ki-demo',
    'system-model',
    '08-discovery',
    'Nightshift ↗',
    'Nightshift',
    'NS Hero',
    'NS Architecture',
    'NS Capabilities',
    'AI Index',
    'NS Brain',
    'AI Economics',
    'NS Live Demo',
    'NS Reveal',
    'Thank You',
  ],

  pdfOverrides: {
    'storage.html': {
      extra: `
        document.querySelectorAll('.odo-slot').forEach(slot => {
          const strip = slot.querySelector('.odo-strip');
          strip.style.transition = 'none';
          strip.style.transform = 'translateY(-' + ((30 + parseInt(slot.dataset.target)) * 152) + 'px)';
        });
        const arrow = document.getElementById('arrow');
        arrow.style.transition = 'none'; arrow.style.opacity = '1';
        const card = document.getElementById('card-new');
        card.style.transition = 'none'; card.style.opacity = '1'; card.style.transform = 'none';
        const num = document.getElementById('new-number');
        num.style.transition = 'none'; num.style.opacity = '1';
        num.style.transform = 'scale(1)'; num.style.filter = 'none';
      `,
      wait: 300,
    },
    'cheaper.html': {
      extra: `
        const n = document.getElementById('big-num');
        n.style.transition = 'none'; n.style.opacity = '1';
        n.style.transform = 'scale(1)'; n.style.filter = 'none';
        const l = document.getElementById('hero-label');
        l.style.transition = 'none'; l.style.opacity = '1'; l.style.transform = 'none';
      `,
      wait: 200,
    },
    'migrate.html': {
      extra: `
        for (let i = 0; i < 5; i++) {
          const pill = document.getElementById('pill-' + i);
          pill.classList.remove('pill-ready');
          pill.classList.add('pill-migrated');
          pill.textContent = 'Migrated';
        }
        document.getElementById('progress-fill').style.transition = 'none';
        document.getElementById('progress-fill').style.width = '100%';
        document.getElementById('progress-label').classList.add('show');
      `,
      wait: 200,
    },
    'kubernetes.html': {
      extra: ``,
      wait: 300,
    },
  },
  disabled: [
    'nightshift-business-model.html',
  ],
};
