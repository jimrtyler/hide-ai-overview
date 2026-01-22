// Hide AI Overview - Content Script
// Removes Google AI Overview so students engage with primary sources

(function() {
  'use strict';

  // Precise selectors for AI Overview only
  const AI_SELECTORS = [
    'div#eKIzJc',
    'div[id="eKIzJc"]',
    'div.YzCcne[data-mcpr]',
    'div[data-mcp="18"]',
    'div[data-attrid="AIOverview"]',
    'div[data-async-type="aiOverview"]',
    'div[aria-label="AI Overview"]'
  ];

  // Selectors for AI Mode in navigation
  const AI_MODE_SELECTORS = [
    'div.olrp5b',
    'a.XVMlrc[href*="udm=50"]',
    'a[href*="udm=50"]',
    'button.plR5qb',
    'button[jsname="B6rgad"]'
  ];

  function hideElement(el) {
    if (el && !el.dataset.aiHidden) {
      el.style.cssText = 'display: none !important; visibility: hidden !important; height: 0 !important; overflow: hidden !important; margin: 0 !important; padding: 0 !important;';
      el.dataset.aiHidden = 'true';
    }
  }

  function findAndHideAIOverview() {
    // Method 1: Direct selector matching for AI Overview
    AI_SELECTORS.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(hideElement);
      } catch (e) {}
    });

    // Method 2: Hide AI Mode nav button and homepage button
    AI_MODE_SELECTORS.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(el => {
          // For links, hide the parent listitem
          if (el.tagName === 'A') {
            const listItem = el.closest('div[role="listitem"]');
            if (listItem) hideElement(listItem);
            else hideElement(el);
          } else {
            // For buttons and other elements, hide directly
            hideElement(el);
          }
        });
      } catch (e) {}
    });

    // Method 3: Find the h1 containing "AI Overview" and hide its container
    document.querySelectorAll('h1').forEach(h1 => {
      if (h1.textContent && h1.textContent.trim() === 'AI Overview') {
        let container = h1.closest('div[data-mcpr]') || 
                        h1.closest('div.YzCcne') ||
                        h1.closest('div#eKIzJc');
        if (container) {
          hideElement(container);
        }
      }
    });

    // Method 4: Look for the "AI Overview" label span
    document.querySelectorAll('div.Fzsovc').forEach(el => {
      if (el.textContent && el.textContent.trim() === 'AI Overview') {
        let container = el.closest('div[data-mcpr]') || 
                        el.closest('div.YzCcne') ||
                        el.closest('div#eKIzJc');
        if (container) {
          hideElement(container);
        }
      }
    });

    // Method 5: Find "AI Mode" text in nav and hide its container
    document.querySelectorAll('span.R1QWuf').forEach(span => {
      if (span.textContent && span.textContent.trim() === 'AI Mode') {
        const listItem = span.closest('div[role="listitem"]');
        if (listItem) hideElement(listItem);
      }
    });
  }

  // Run immediately
  findAndHideAIOverview();

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', findAndHideAIOverview);
  }

  // Watch for dynamically loaded content
  const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        shouldCheck = true;
        break;
      }
    }
    if (shouldCheck) {
      findAndHideAIOverview();
    }
  });

  // Start observing once body exists
  function startObserver() {
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      requestAnimationFrame(startObserver);
    }
  }
  startObserver();

  // Periodic check for first few seconds (catches async loading)
  setTimeout(findAndHideAIOverview, 500);
  setTimeout(findAndHideAIOverview, 1000);
  setTimeout(findAndHideAIOverview, 2000);

})();
