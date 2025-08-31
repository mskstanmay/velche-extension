console.log("Background worker running");

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});
