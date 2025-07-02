chrome.webNavigation.onCompleted.addListener(async ({ tabId, url }) => {
  try {
    console.log("🔍 Navigated to:", url);

    const response = await fetch("https://raw.githubusercontent.com/Gayathri2803/phishing-detector-extension/main/phishing-list.json");
    const data = await response.json();

    const hostname = new URL(url).hostname;
    console.log("🌐 Hostname detected:", hostname);

    const isPhishing = data.blacklist.includes(hostname);

    if (isPhishing) {
      console.log("🚨 Phishing site detected:", hostname);
      chrome.scripting.executeScript({
        target: { tabId },
        func: redirectToWarning
      });
    } else {
      console.log("✅ Site is safe");
    }

  } catch (error) {
    console.error("❌ Error checking phishing list:", error);
  }
}, { url: [{ schemes: ["http", "https"] }] });

function redirectToWarning() {
  window.location.href = chrome.runtime.getURL("warning.html");
}
