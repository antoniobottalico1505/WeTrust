// C:\Users\Utente\WeTrust\api\index.js
// WeTrust API – demo con richieste IN MEMORIA + invio email contatti

const fastify = require("fastify");
const cors = require("@fastify/cors");
const nodemailer = require("nodemailer");

// archivio in memoria (si resetta se riavvii l'API)
const requests = [
  {
    id: "1",
    title: "Accompagnare mia madre dal medico",
    description:
      "Cerco qualcuno di affidabile per accompagnare mia madre di 78 anni alla visita in ospedale domani mattina.",
    city: "Torino",
    status: "open",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Aiuto con spesa settimanale",
    description:
      "Mi serve una mano con la spesa al supermercato una volta a settimana.",
    city: "Milano",
    status: "matched",
    createdAt: new Date().toISOString(),
  },
];

async function start() {
  const app = fastify({ logger: true });

  await app.register(cors, { origin: true });

  // --- CONFIGURAZIONE MAILER (usa variabili d'ambiente) ---
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true", // true se usi 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // healthcheck
  app.get("/health", async () => {
    return { status: "ok", service: "wetrust-api" };
  });

  // lista richieste
  app.get("/requests", async () => {
    return { requests };
  });

  // nuova richiesta (pulsante I need)
  app.post("/requests", async (request, reply) => {
    const { description, city } = request.body || {};

    if (!description || !description.trim()) {
      reply.code(400);
      return { ok: false, error: "Descrivi almeno in poche parole il bisogno." };
    }

    const cleanDescription = description.trim();

    const newRequest = {
      id: String(Date.now()),
      title: cleanDescription.slice(0, 80),
      description: cleanDescription,
      city: city && city.trim(),
      status: "open",
      createdAt: new Date().toISOString(),
    };

    requests.unshift(newRequest);

    return { ok: true, request: newRequest };
  });

  // contatti (nome, email, messaggio) + invio email a Antonio
  app.post("/contact", async (request, reply) => {
    const { name, email, message } = request.body || {};
    app.log.info({ name, email, message }, "Nuovo contatto WeTrust");

    if (!email || !message) {
      reply.code(400);
      return { ok: false, error: "Email e messaggio sono obbligatori." };
    }

    try {
      await transporter.sendMail({
        from: `"WeTrust Contatti" <${
          process.env.SMTP_FROM || process.env.SMTP_USER
        }>`,
        to: "antoniobottalico1505@gmail.com",
        replyTo: email,
        subject: "Nuovo contatto dal sito WeTrust",
        text:
          `Nome: ${name || "(non fornito)"}\n` +
          `Email: ${email}\n\n` +
          `Messaggio:\n${message}`,
      });

      return { ok: true };
    } catch (err) {
      app.log.error(err, "Errore invio email contatto");
      reply.code(500);
      return {
        ok: false,
        error:
          "Messaggio ricevuto ma c'è stato un errore nell'invio dell'email.",
      };
    }
  });

  // PORTA PER RENDER + LOCALE
  const PORT = process.env.PORT || process.env.API_PORT || 4000;
  const HOST = "0.0.0.0";

  try {
    const address = await app.listen({ port: PORT, host: HOST });
    app.log.info(`Server listening at ${address}`);
    console.log(`API WeTrust in ascolto su http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
