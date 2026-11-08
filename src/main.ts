import { initTheme } from './theme.ts';
import { initModals } from './modals.ts';
import { showToast } from './toast.ts';
import { auditCookies } from './cookies.ts';
import { auditVault } from './vault.ts';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initModals();

  const audit = auditCookies();
  const vault = auditVault();
  console.log(`[OTHRYS] UUID Generator initialized. Cookies: ${audit.totalCookies}, Client-Vault: ${vault.clientSideOnly}`);

  const inputEl = document.getElementById('app-input') as HTMLTextAreaElement | null;
  const outputRegion = document.getElementById('output-region');
  const processBtn = document.getElementById('action-process');
  const clearBtn = document.getElementById('action-clear');
  const copyBtn = document.getElementById('action-copy');

  if (processBtn && inputEl && outputRegion) {
    processBtn.addEventListener('click', () => {
      const val = inputEl.value;
      if (!val.trim()) {
        showToast('Please enter input to process.');
        return;
      }
      outputRegion.innerHTML = `<pre style="font-family: var(--font-mono); white-space: pre-wrap;">Processed (${val.length} chars):\n${escapeHtml(val)}</pre>`;
      showToast('Processing complete!');
    });
  }

  if (clearBtn && inputEl && outputRegion) {
    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      outputRegion.innerHTML = '<div class="output-placeholder">Output results will appear here in real-time.</div>';
      showToast('Cleared');
    });
  }

  if (copyBtn && inputEl) {
    copyBtn.addEventListener('click', async () => {
      if (!inputEl.value) {
        showToast('Nothing to copy.');
        return;
      }
      await navigator.clipboard.writeText(inputEl.value);
      showToast('Copied to clipboard!');
    });
  }
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
