// C:\Users\Utente\WeTrust\web\pages\requests.js

import { useEffect, useState } from "react";
import Link from "next/link";

const API_BASE = "http://localhost:4000";

export default function RequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/requests`);
        const data = await res.json();
        setRequests(data.requests || []);
      } catch (err) {
        console.error(err);
        setError("Errore nel caricare le richieste.");
      } finally {
          setLoading(false);
      }
    }
    load();
  }, []);

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
          <h1>Richieste recenti</h1>
          <p className="subtitle">
            Ogni volta che qualcuno preme <strong>I need</strong>, qui nasce una
            nuova richiesta di aiuto.
          </p>

          {loading && <p>Caricamento…</p>}
          {error && <p>{error}</p>}

          {!loading && !error && requests.length === 0 && (
            <p>Ancora nessuna richiesta. Prova a crearne una dalla home.</p>
          )}

          <div className="list">
            {requests.map((r) => (
              <article key={r.id} className="card">
                <h2>{r.title}</h2>
                <p className="desc">{r.description}</p>
                <div className="meta">
                  {r.city && <span>{r.city}</span>}
                  {r.status && (
                    <span className={`badge badge-${r.status}`}>
                      {r.status}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
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
          max-width: 1120px;
          margin: 0 auto;
          padding: 20px;
        }

        .subtitle {
          font-size: 14px;
          color: #e5e7eb;
          margin-bottom: 16px;
        }

        .list {
          display: grid;
          gap: 12px;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        }

        .card {
          border-radius: 18px;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(148, 163, 184, 0.4);
          padding: 14px 16px;
          font-size: 14px;
        }

        .card h2 {
          font-size: 16px;
          margin-bottom: 6px;
        }

        .desc {
          font-size: 14px;
          margin-bottom: 8px;
        }

        .meta {
          display: flex;
          gap: 8px;
          font-size: 12px;
          color: #cbd5f5;
        }

        .badge {
          padding: 2px 8px;
          border-radius: 999px;
          border: 1px solid rgba(148, 163, 184, 0.7);
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
