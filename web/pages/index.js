// C:\Users\Utente\WeTrust\web\pages\index.js
// Home WeTrust con header uguale a Richieste/Contatti: nav a sinistra, logo a destra

import { useState } from "react";
import Link from "next/link";

const API_BASE =
process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function Home() {
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleINeed(e) {
    e.preventDefault();
    setFeedback("");

    if (!description.trim()) {
      setFeedback("Scrivi almeno una frase sul tuo bisogno.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, city }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Errore API");
      }

      setDescription("");
      setCity("");
      setFeedback("Richiesta inviata. La trovi nella pagina Richieste.");
    } catch (err) {
      console.error(err);
      setFeedback("Errore nel salvataggio della richiesta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="page">
        {/* HEADER UGUALE A RICHIESTE/CONTATTI */}
        <header className="header">
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/requests">Richieste</Link>
            <Link href="/contact">Contatti</Link>
          </nav>

          <div className="logo-area">
            <img src="/WeT.png" alt="WeTrust symbol" className="logo-icon" />
            <img src="/WeTrust.png" alt="WeTrust logo" className="logo-full" />
          </div>
        </header>

        <main className="main">
          <section className="hero">
            {/* SOTTO: CHIEDI AIUTO A SINISTRA, CARD A DESTRA */}
            <div className="hero-content">
              <div className="hero-left">
                <h1>
                  Chiedi aiuto.
                  <br />
                  Trova persone affidabili vicino a te.
                </h1>

                <p className="subtitle">
                  Un solo pulsante, tre strati: fiducia, aiuto e pagamento
                  sicuro.
                  <br />
                  WeTrust trasforma la fiducia locale in aiuto reale.
                </p>

                {/* FORM I NEED */}
                <form className="need-form" onSubmit={handleINeed}>
                  <label className="need-label">
                    Scrivi qui il tuo bisogno (pulsante <strong>I need</strong>):
                  </label>
                  <textarea
                    className="need-textarea"
                    placeholder="Es. Ho bisogno di qualcuno che accompagni mia madre dal medico domani mattina…"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <div className="need-row">
                    <input
                      className="need-city"
                      placeholder="Città / zona (facoltativo)"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Invio…" : "I need"}
                    </button>
                  </div>
                  {feedback && <p className="need-feedback">{feedback}</p>}
                </form>
              </div>

              <div className="hero-right">
                <div className="card">
                  <div className="card-header">Uno sguardo all’app</div>
                  <div className="bubble">
                    <div className="bubble-label">Esempio di richiesta</div>
                    <div className="bubble-text">
                      «Mi serve qualcuno che accompagni mia madre dal medico
                      domani mattina.»
                    </div>
                  </div>
                  <ul className="hero-list">
                    <li>L’AI capisce il bisogno, la zona e l’urgenza.</li>
                    <li>
                      Trova persone affidabili con Trust-ID e badge di aiuto nel
                      quartiere.
                    </li>
                    <li>
                      Tu scegli se pagare, scambiare tempo (TimeBack) o usare
                      voucher solidali.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* COME FUNZIONA */}
          <section className="section">
            <h2>Come funziona</h2>
            <div className="grid3">
              <div className="card">
                <h3>Trust</h3>
                <p>
                  Profili verificati, vouch umani, badge contestuali. Nessun voto
                  tossico, solo fiducia reale e note di contesto.
                </p>
              </div>
              <div className="card">
                <h3>Help</h3>
                <p>
                  Scrivi o vocalizza il tuo bisogno. L’AI propone aiuto vicino,
                  remoto o tramite istituzioni locali collegate a WeTrust.
                </p>
              </div>
              <div className="card">
                <h3>Pay</h3>
                <p>
                  Paga con escrow sicuro, scambia crediti-tempo (TimeBack) o usa
                  voucher solidali pagati da aziende, comuni e privati.
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="footer">
          <span>© {new Date().getFullYear()} WeTrust.</span>
          <span className="footer-note">
            Fiducia umana → Aiuto reale → Pagamento semplice.
          </span>
        </footer>
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

        /* HEADER come richieste/contatti: nav sinistra, logo destra */
        .header {
  max-width: 1120px;
  margin: 0 auto;
  padding: 16px 20px 4px;
  display: flex;
  align-items: center;
  justify-content: center;  /* PRIMA era space-between */
  gap: 16px;
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

        .main {
          flex: 1;
          max-width: 1120px;
          margin: 0 auto;
          padding: 10px 20px 40px;
        }

        .hero {
          margin-top: 20px;
        }

        /* SOTTO: contenuto principale */
        .hero-content {
          display: grid;
          grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
          gap: 32px;
          align-items: flex-start;
        }

        .hero-left h1 {
          font-size: clamp(32px, 4vw, 40px);
          line-height: 1.1;
          margin-bottom: 12px;
          color: #f9fafb;
        }

        .subtitle {
          font-size: 16px;
          color: #e5e7eb;
          max-width: 540px;
          margin-bottom: 16px;
        }

        .need-form {
          margin-top: 8px;
        }

        .need-label {
          font-size: 13px;
          margin-bottom: 4px;
          display: block;
        }

        .need-textarea {
          width: 100%;
          min-height: 80px;
          border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          padding: 8px 10px;
          font-size: 14px;
          resize: vertical;
        }

        .need-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 6px;
          align-items: center;
        }

        .need-city {
          flex: 1;
          min-width: 160px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
          background: rgba(15, 23, 42, 0.9);
          color: #e5e7eb;
          padding: 8px 12px;
          font-size: 14px;
        }

        .btn-primary {
          border-radius: 999px;
          border: none;
          padding: 8px 18px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          background: linear-gradient(135deg, #00b4ff, #00e0a0);
          color: #020617;
        }

        .need-feedback {
          margin-top: 6px;
          font-size: 13px;
          color: #e5e7eb;
        }

        .hero-right .card {
          border-radius: 20px;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(148, 163, 184, 0.4);
          padding: 16px 18px;
        }

        .card-header {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          margin-bottom: 10px;
        }

        .bubble {
          border-radius: 18px;
          background: linear-gradient(135deg, #00b4ff, #00e0a0);
          color: #020617;
          padding: 10px 12px;
          margin-bottom: 12px;
        }

        .bubble-label {
          font-size: 11px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .bubble-text {
          font-size: 13px;
        }

        .hero-list {
          margin: 0;
          padding-left: 18px;
          font-size: 13px;
          color: #d1d5db;
        }

        .section {
          margin-top: 24px;
        }

        .section h2 {
          font-size: 22px;
          margin-bottom: 12px;
        }

        .grid3 {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        }

        .grid3 .card {
          border-radius: 18px;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(148, 163, 184, 0.4);
          padding: 12px 14px;
          font-size: 14px;
          color: #d1d5db;
        }

        .footer {
          max-width: 1120px;
          width: 100%;
          margin: 0 auto;
          padding: 16px 20px 24px;
          font-size: 12px;
          color: #9ca3af;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: space-between;
          border-top: 1px solid rgba(15, 23, 42, 0.7);
        }

        .footer-note {
          opacity: 0.9;
        }

        @media (max-width: 900px) {
          .hero-content {
            grid-template-columns: 1fr;
          }

          .hero-right {
            margin-top: 16px;
          }

          .header {
            flex-direction: column;
            align-items: flex-start;
          }

          .logo-area {
            align-self: flex-end;
          }
        }

        @media (max-width: 600px) {
          .logo-full {
            height: 80px;
          }
        }
      `}</style>
    </>
  );
}
