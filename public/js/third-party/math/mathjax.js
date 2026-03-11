/* global NexT, CONFIG, MathJax */

document.addEventListener('page:loaded', () => {
  if (!CONFIG.enableMath) return;

  if (typeof MathJax === 'undefined') {
    window.MathJax = {
      tex: {
        inlineMath: { '[+]': [['$', '$']] },
        displayMath: { '[+]': [['$$', '$$']] },
        packages: { '[+]': ['base', 'ams', 'newcommand', 'noerrors', 'noundefined'] },
        tags      : CONFIG.mathjax.tags
      },
      loader: {
        load: ['[tex]/ams']
      },
      startup: {
        ready: () => {
          MathJax.startup.defaultReady();
          MathJax.startup.promise.then(() => {
            console.log('MathJax is ready with ams package');
          });
        }
      },
      options: {
        renderActions: {
          insertedScript: [200, () => {
            document.querySelectorAll('mjx-container').forEach(node => {
              const target = node.parentNode;
              if (target.nodeName.toLowerCase() === 'li') {
                target.parentNode.classList.add('has-jax');
              }
            });
          }, '', false]
        }
      }
    };
    NexT.utils.getScript(CONFIG.mathjax.js, {
      attributes: {
        defer: true
      }
    });
  } else {
    MathJax.startup.document.state(0);
    MathJax.typesetClear();
    MathJax.texReset();
    MathJax.typesetPromise();
  }
});
