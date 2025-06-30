document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("reportBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url) {
      alert(`Thank you! Reporting:\n${tab.url}`);
    }
  });
});