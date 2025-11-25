// C:\Users\Utente\WeTrust\web\pages\contact.js

import { useState } from "react";
import Link from "next/link";

const API_BASE =
process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback("");

    if (!email.trim() || !message.trim()) {
      setFeedback("Email e messaggio sono obbligatori.");
      return;
    }

    try {
      setSending(true);
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      await res.json();
      setFeedback("Messaggio inviato. Ti risponderemo il prima possibile.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setFeedback("Errore durante l'invio del messaggio.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <div className="page">
        <header className="header">
          {/* PRIMA LINK, POI LOGHI (invertiti) */}
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/requests">Richieste</Link>
            <Link href="/contact">Contatti</Link>
          </nav>

          <div className="logo-area">
            <img src="/WeT.png" alt="WeTrust symbol" className="logo-icon" />
            <img
              src="/WeTrust.png"
              alt="WeTrust logo"
              className="logo-full"
            />
          </div>
        </header>

        <main className="main">
          <h1>Contatti</h1>
          <p className="subtitle">
            Vuoi parlare di partnership o investimento? Scrivici qui, il
            messaggio arriva al team WeTrust.
          </p>

          <form className="form" onSubmit={handleSubmit}>
            <label>
              Nome (facoltativo)
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              Messaggio
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <button type="submit" disabled={sending}>
              {sending ? "Invio…" : "Invia messaggio"}
            </button>

            {feedback && <p className="feedback">{feedback}</p>}
          </form>
        </main>
      </div>

      <style jsx>{`
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    circle at top left,
    #00b4ff 0,
    #00e0a0 20%,
    #020617 55%
  );
  color: #e5e7eb;
  font-family: system-ui, -apple-system, BlinkMacSystemFont,
    "SF Pro Text", "Helvetica Neue", Arial, sans-serif;
}

        .header {
  max-width: 1120px;
  margin: 0 auto;
  padding: 16px 20px 4px;
  display: flex;
  align-items: center;
  justify-content: center;  /* PRIMA era space-between */
  gap: 16px;
}

       .logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 64px;    /* spinge i loghi un po’ più a destra */
}

        .logo-icon {
          width: 40px;
        }

        .logo-full {
          height: 80px;
        }

        .nav {
  display: flex;
  gap: 12px;
  font-size: 14px;
  margin-right: 64px;   /* spinge i link un po’ più a sinistra */
}

.nav a {
  color: #ffffff !important;
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.6);
}

.nav a:visited {
  color: #ffffff !important;
}

.nav a:hover {
  color: #ffffff !important;
}

        .main {
          flex: 1;
          max-width: 640px;
          margin: 0 auto;
          padding: 20px;
        }

        .subtitle {
          font-size: 14px;
          margin-bottom: 16px;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        label {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 14px;
        }

        input,
        textarea {
          border-radius: 10px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          padding: 8px 10px;
          font-size: 14px;
        }

        textarea {
          min-height: 80px;
          resize: vertical;
        }

        button {
          align-self: flex-start;
          border-radius: 999px;
          border: none;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #00b4ff, #00e0a0);
          color: #020617;
        }

        .feedback {
          margin-top: 6px;
          font-size: 13px;
        }

        @media (max-width: 600px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}
