document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ popup.js loaded");

  const button = document.getElementById("reportBtn");

  if (!button) {
    console.error("❌ Report button not found");
    return;
  }

  button.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab && tab.url) {
      alert(`🚩 Reporting suspected phishing site:\n${tab.url}`);
    }
  });
});
