# Velche Email Sorter

## 🚀 Overview

**Velche Email Sorter** is a Chrome extension designed to help you take control of your Gmail inbox. With customizable sorting rules and intuitive management tools, Velche ensures your most important emails are always front and center—no more digging through clutter!

---

## ✨ Features

- **Custom Sorting Rules:** Create and manage your own categories to automatically sort emails based on sender, subject, or other criteria.
- **Saved Categories:** Easily view, edit, and delete your saved sorting categories.
- **User-Friendly Interface:** Clean, responsive popup and options pages for effortless rule management.
- **Instant Gmail Integration:** Works directly on your Gmail tab for real-time sorting and organization.

---

## 🔒 Permissions

Velche requires the following Chrome extension permissions:

- `storage` – Save your sorting rules and categories locally.
- `activeTab` – Interact with your currently open Gmail tab.
- `scripting` – Run scripts on Gmail to sort and categorize emails.
- `tabs` – Query and interact with browser tabs.

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Google Chrome](https://www.google.com/chrome/)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/mskstanmay/velche-extension.git
   cd velche-extension
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

### Development

To start the development server with hot reload:

```sh
npm run dev
```

### Build

To build the extension for production:

```sh
npm run build
```

The final extension files will be in the `dist` folder.

### Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked** and select the `dist` folder.

---

## 🧩 Usage

- Click the Velche icon in your Chrome toolbar to open the popup.
- On Gmail, view top senders and manage your sorting categories.
- Use the options page to customize your sorting rules and preferences.

---

## 📁 Project Structure

```
content/      # Content scripts injected into Gmail
options/      # Options/settings page
popup/        # Popup UI for the extension
assets/       # Icons and styles
manifest.json # Chrome extension manifest
```

---

## 🤝 Contributing

We welcome pull requests, feature suggestions, and bug reports!  
Feel free to open an issue or submit a PR.

---

## 📜 License

MIT License

---

**GitHub:** [mskstanmay/velche-extension](https://github.com/mskstanmay/velche-extension)  
**Support & Community:** [Discord](https://discord.gg/pzAbDvZ7bT)

---

**Velche** – Your Gmail, organized
