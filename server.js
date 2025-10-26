/*
Simple Express server to receive orders and send them by email with attachments.
Usage: set environment variables in .env (SMTP settings and COMPANY_EMAIL)
Run:
  npm install
  node server.js
*/

require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: path.join(__dirname, "uploads/") });
app.use(cors());

const PORT = process.env.PORT || 3000;

// health
app.get("/health", (req, res) => res.json({ ok: true }));

// POST /api/order -> fields: order (JSON string), files[] attachments
app.post("/api/order", upload.array("images"), async (req, res) => {
  try {
    const companyEmail = process.env.COMPANY_EMAIL;
    if (!companyEmail) {
      return res.status(500).json({ error: "COMPANY_EMAIL not configured" });
    }

    const orderJson = req.body.order || "{}";
    const order = JSON.parse(orderJson);

    // build HTML body
    let html = `<h2>Nuevo pedido desde FabricaMayorista</h2>`;
    html += `<p><strong>Fecha:</strong> ${new Date().toLocaleString()}</p>`;
    if (order.note) html += `<p><strong>Nota:</strong> ${order.note}</p>`;
    html += "<ul>";
    order.items.forEach((it) => {
      html += `<li><strong>${it.qty}x ${it.name}</strong><br>Talla: ${
        it.size
      } | Color: ${it.colorDisplay}<br>Precio unit: RD$${it.unitPrice.toFixed(
        2
      )} | Subtotal: RD$${it.subtotal.toFixed(2)}</li>`;
    });
    html += "</ul>";
    html += `<p><strong>Total:</strong> RD$${order.total.toFixed(2)}</p>`;

    // create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // attachments from multer
    const attachments = (req.files || []).map((f) => ({
      filename: f.originalname || path.basename(f.path),
      path: f.path,
    }));

    const mail = {
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to: companyEmail,
      subject: `Nuevo pedido - FabricaMayorista - ${new Date().toLocaleString()}`,
      html,
      attachments,
    };

    const info = await transporter.sendMail(mail);

    // cleanup uploaded files
    (req.files || []).forEach((f) => {
      try {
        fs.unlinkSync(f.path);
      } catch (e) {
        /* ignore */
      }
    });

    res.json({ ok: true, info });
  } catch (err) {
    console.error("Error /api/order", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Order server listening on ${PORT}`);
});
