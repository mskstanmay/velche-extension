import { useEffect, useState } from "react";
import "./App.css";

const githubLink = "https://github.com/mskstanmay/velche-extension";
const supportLink = "https://discord.gg/pzAbDvZ7bT";
const version = "2.0.0";

function App() {
  const [isGmail, setIsGmail] = useState(false);
  const [senders, setSenders] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if current tab is Gmail
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url || "";
      if (url.includes("mail.google.com")) {
        setIsGmail(true);
        fetchSenders(tabs[0].id!);
      }
    });
  }, []);

  const fetchSenders = (tabId: number) => {
    setLoading(true);
    chrome.tabs.sendMessage(tabId, { action: "getSenders" }, (response) => {
      setSenders(response || []);
      setLoading(false);
    });
  };

  const openGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  return (
    <div className="popup-content">
      <h2>Velche Email Sorter</h2>
      <p className="subtitle">Quickly organize and categorize your inbox.</p>

      {isGmail ? (
        <div>
          <h3>Top Senders</h3>
          {loading && <p>Loading senders...</p>}
          {!loading && senders.length === 0 && <p>No senders found.</p>}
          <ul className="sender-list">
            {senders.map((s, i) => (
              <li key={i}>
                <strong>{s.name}</strong> — {s.count}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button className="open-gmail-button" onClick={openGmail}>
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
            alt="Gmail Logo"
            className="gmailLogo"
          />
          Open Gmail
        </button>
      )}

      <div className="popupLinks">
        <p>
          <strong>Need help?</strong>{" "}
          <a href={supportLink} target="_blank" rel="noopener noreferrer">
            Contact Us
          </a>
        </p>
        <p>
          <strong>Github Link: </strong>{" "}
          <a href={githubLink} target="_blank" rel="noopener noreferrer">
            Github
          </a>
          ⭐
        </p>
      </div>

      <div className="version-info">
        <p>Version {version}</p>
      </div>
    </div>
  );
}

export default App;
