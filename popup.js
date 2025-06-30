const GITHUB_TOKEN = "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"; // 🔐 Replace this

const GITHUB_REPO = "Gayathri2803/phishing-detector-extension";
const API_URL = `https://api.github.com/repos/${GITHUB_REPO}/issues`;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("reportBtn").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab?.url) {
      const issueTitle = `🚨 Phishing Report: ${new URL(tab.url).hostname}`;
      const issueBody = `Suspicious phishing site reported:\n\n${tab.url}`;

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github+json"
        },
        body: JSON.stringify({ title: issueTitle, body: issueBody })
      });

      if (response.ok) {
        alert("✅ Report submitted to GitHub!");
      } else {
        alert("❌ Failed to report. Check token and repo permissions.");
        console.error(await response.json());
      }
    }
  });
});
