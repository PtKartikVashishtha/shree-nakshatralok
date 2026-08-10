# ✦ Shree Nakshatralok Jyotish Sansthan

<p align="center">
  <strong>श्री नक्षत्रलोक ज्योतिष संस्थान</strong>
</p>

<p align="center">
  सत्य · सेवा · विश्वास
</p>

<p align="center">
  A modern astrology consultation platform with a secure admin dashboard,
  consultation management, email notifications, and MongoDB persistence.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-environment-variables">Environment</a> •
  <a href="#-deployment">Deployment</a>
</p>

---

## ✨ Overview

**Shree Nakshatralok Jyotish Sansthan** is a full-stack astrology consultation website designed to provide a polished digital presence while making consultation management simple for the astrologer.

Visitors can explore astrology services and submit their birth details and questions through the website.

Every consultation request is:

- Stored securely in MongoDB
- Forwarded to the client's email
- Available inside a protected admin dashboard
- Searchable and manageable
- Assignable with a consultation status
- Exportable as CSV

The project is built with a modern **Next.js App Router architecture** and designed for deployment on **Vercel**.

---

## 🌙 What The Website Offers

### Public Website

Visitors can explore:

- 🔮 Vedic Astrology Consultation
- 📜 Birth Chart / Janam Kundali
- 💍 Marriage Matching / Kundali Milan
- 🪔 Naming Ceremony & Muhurat
- 🪐 Graha Dosh Remedies
- 🏡 Vastu Consultation
- 💎 Gemstone Consultation
- 🎓 Career, Education & Business Guidance
- ❤️ Family & Marital Counseling
- 🌐 Online & Offline Consultation
- 🃏 Tarot Card Reading

### Consultation Form

Visitors can submit:

| Field | Description |
|---|---|
| Name | Visitor's name |
| Date of Birth | Birth date |
| Time of Birth | Birth time |
| Address | Location/address |
| Question | Consultation query |

---

# 🛡️ Admin Dashboard

A private dashboard allows the astrologer to manage incoming consultations.

### Dashboard Features

- 📊 Total consultation statistics
- 📅 Today's requests
- 🗓️ Weekly request count
- 🆕 New requests
- 📞 Contacted requests
- ✅ Completed consultations
- 🔎 Search and filtering
- 🗑️ Delete submissions
- 📥 CSV export
- 🔄 Persistent consultation status

### Consultation Status

Each request can move through:

```text
NEW
  ↓
CONTACTED
  ↓
COMPLETED