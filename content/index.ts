// content/index.ts

// Extract all sender emails visible in the Gmail inbox
function extractSenders(): string[] {
  const senders: string[] = [];

  // Look for elements that Gmail often uses to show senders
  document
    .querySelectorAll<HTMLElement>("span[email], .yW span, .yX.xY span")
    .forEach((el) => {
      const text = el.textContent?.trim();
      if (text) senders.push(text);
    });

  return senders;
}

// Count how many times each sender email appears
function getSenderCounts() {
  const senders = extractSenders();
  const counts: Record<string, number> = {};

  senders.forEach((s) => {
    counts[s] = (counts[s] || 0) + 1;
  });

  // Convert to array format App.tsx expects: [{name, count}]
  return Object.entries(counts).map(([name, count]) => ({
    name,
    count,
  }));
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "getSenders") {
    const result = getSenderCounts();
    console.log("📬 Extracted senders:", result);
    sendResponse(result);
  }
});
