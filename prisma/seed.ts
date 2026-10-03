import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.upsert({
      where: {
        email,
      },
      update: {
        passwordHash,
      },
      create: {
        email,
        name: "Administrator",
        passwordHash,
      },
    });

    console.log("Admin user created/updated successfully.");
  } else {
    console.log("ADMIN_EMAIL or ADMIN_PASSWORD not set, skipping admin user creation.");
  }

  // ---------------------------------------------------------
  // SEED INITIAL BLOG ARTICLES (If none exist)
  // ---------------------------------------------------------
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    console.log("Seeding initial authentic Vedic Blog articles...");

    await prisma.blogPost.create({
      data: {
        title: "Understanding the Significance of Brihaspati (Jupiter) in Vedic Astrology",
        slug: "understanding-significance-of-brihaspati-in-vedic-astrology",
        category: "Jyotish",
        author: "Pt. Radhey Shyam Sharma",
        status: "PUBLISHED",
        publishedAt: new Date(),
        featuredImage: "/og-image.jpg",
        seoTitle: "Brihaspati (Jupiter) in Vedic Astrology | Shree Nakshatralok",
        seoDescription: "Discover how Brihaspati (Devaguru Jupiter) influences wisdom, fortune, dharma, marriage, and spiritual growth in your Janam Kundali.",
        seoKeywords: "Brihaspati, Jupiter, Vedic Astrology, Janam Kundali, Guru Graha, Dharma",
        excerpt: "In Vedic astrology, Brihaspati (Jupiter) is revered as Devaguru—the preceptor of the celestial beings. Discover how Jupiter’s placement shapes wisdom, intellect, family happiness, and auspicious fortune.",
        content: `
<h2>The Guru of Wisdom: Devaguru Brihaspati</h2>
<p>In Vedic astrology (Jyotish), Jupiter is revered as <strong>Devaguru Brihaspati</strong>—the divine counselor, teacher, and guardian of wisdom, righteousness (Dharma), and higher consciousness. As the greatest benefic planet among the Navagrahas, Jupiter signifies expansive growth, benevolent fortune, and divine grace.</p>

<blockquote class="border-l-4 border-[#b78a40] pl-4 italic text-[#685851] my-4">
  "गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः । गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः ॥"
</blockquote>

<h2>Key Astrological Significations of Jupiter</h2>
<ul class="list-disc pl-5 my-4 space-y-2">
  <li><strong>Dharma &amp; Ethics:</strong> Brihaspati governs moral clarity, righteous conduct, and adherence to spiritual traditions.</li>
  <li><strong>Wisdom &amp; Learning:</strong> Unlike Mercury, which rules intellectual quickness and communication, Jupiter represents profound wisdom, philosophical discernment, and spiritual realization.</li>
  <li><strong>Wealth &amp; Prosperity:</strong> Known as the Dhanakaraka, Jupiter rules lawful wealth, generous abundance, and auspicious endeavors.</li>
  <li><strong>Children &amp; Family:</strong> As Putrakaraka, Jupiter governs fertility, children, and harmonious family lineage.</li>
  <li><strong>Marriage for Women:</strong> In a woman's Janam Kundali, Jupiter is traditionally examined as the primary significator (Karaka) for the husband and marital longevity.</li>
</ul>

<h2>Signs and Houses Ruled by Brihaspati</h2>
<p>Jupiter owns the natural 9th and 12th houses of the zodiac—governing the signs of <strong>Dhanu (Sagittarius)</strong> and <strong>Meena (Pisces)</strong>. Jupiter attains its highest exaltation (Uccha) in the gentle sign of <strong>Karka (Cancer)</strong> at 5 degrees, where its spiritual benevolence flows without obstruction. Conversely, Jupiter is debilitated (Neecha) in <strong>Makara (Capricorn)</strong>, where practical and worldly constraints may stifle its philosophical expansiveness.</p>

<h2>Signs of a Harmonious Jupiter in the Birth Chart</h2>
<p>When Brihaspati is placed favorably in auspicious houses (Kendra or Trikona) and free from severe affliction by Rahu or Saturn, the native is blessed with honesty, devotion, respected social standing, sound judgment, and natural optimism. Even in turbulent periods, an auspicious Jupiter acts as a celestial protective shield, mitigating afflictions from harsher planets.</p>

<h2>Traditional Astrological Remedies for Guru Graha</h2>
<p>If Jupiter is combust, afflicted, or poorly placed in your chart, traditional Vedic practices recommend the following remedies under guided consultation:</p>
<ol class="list-decimal pl-5 my-4 space-y-2">
  <li>Worship of Lord Vishnu and recitation of the <em>Vishnu Sahasranama</em> on Thursdays.</li>
  <li>Wearing yellow garments or offering yellow flowers, chana dal, and turmeric at sacred temples.</li>
  <li>Chanting the Brihaspati Beej Mantra: <em>"Om Gram Greem Graum Sah Guruve Namah"</em>.</li>
  <li>Consulting a Vedic astrologer before wearing a natural Yellow Sapphire (Pukhraj) or its alternative, Yellow Topaz.</li>
</ol>

<p>Every Janam Kundali holds a unique planetary configuration. A detailed birth-chart reading helps reveal how Devaguru Brihaspati influences your destiny, education, wealth, and spiritual evolution.</p>
        `.trim(),
      },
    });

    await prisma.blogPost.create({
      data: {
        title: "Ayurvedic Dinacharya: Aligning Daily Routine with Natural Rhythms",
        slug: "ayurvedic-dinacharya-daily-routine-lifestyle-rhythms",
        category: "Ayurveda",
        author: "Pt. Radhey Shyam Sharma",
        status: "PUBLISHED",
        publishedAt: new Date(),
        featuredImage: "/og-image.jpg",
        seoTitle: "Ayurvedic Dinacharya: Daily Routine Guide | Shree Nakshatralok",
        seoDescription: "Learn how the ancient Ayurvedic science of Dinacharya (daily routine) harmonizes Vata, Pitta, and Kapha to cultivate vibrant health and peaceful longevity.",
        seoKeywords: "Ayurveda, Dinacharya, Daily Routine, Vata, Pitta, Kapha, Vedic Health, Jyotish and Ayurveda",
        excerpt: "Dinacharya is the ancient Ayurvedic science of daily routine. Discover how waking before sunrise, mindful cleansing, and honoring doshic cycles creates balance, energy, and radiant wellbeing.",
        content: `
<h2>The Living Wisdom of Dinacharya</h2>
<p>Ayurveda and Vedic Jyotish share a common understanding of the cosmos: the human body (microcosm) is intimately connected to the movements of the sun, moon, and seasons (macrocosm). <strong>Dinacharya</strong> (daily conduct or routine) is the foundational Ayurvedic practice of synchronizing our biological clock with nature’s circadian cycles.</p>

<h2>1. Awakening in Brahma Muhurat</h2>
<p>Ayurveda emphasizes waking during <strong>Brahma Muhurat</strong> (approximately 1 hour and 36 minutes before sunrise). During this time, the atmosphere is charged with pure sattvic energy, clarity, and peace. Waking before sunrise allows the subtle energy of Vata to bring lightness, enthusiasm, and focus for the day ahead.</p>

<h2>2. Morning Cleansing &amp; Sensory Care</h2>
<ul class="list-disc pl-5 my-4 space-y-2">
  <li><strong>Ushapan (Hydration):</strong> Drinking warm water, preferably stored overnight in a copper vessel, gently awakens digestive fire (Agni) and encourages natural elimination.</li>
  <li><strong>Jihwa Nirlekhana (Tongue Scraping):</strong> Gently scraping the tongue with a copper or silver scraper clears metabolic toxins (Ama) and stimulates the internal organs through the taste buds.</li>
  <li><strong>Danta Dhavana:</strong> Brushing with herbal powders like neem, babool, or clove tones gums and purifies breath.</li>
  <li><strong>Netra Seka:</strong> Splashing cool water on the eyes balances Pitta dosha and soothes eye strain.</li>
</ul>

<h2>3. Abhyanga: The Art of Warm Oil Massage</h2>
<blockquote class="border-l-4 border-[#b78a40] pl-4 italic text-[#685851] my-4">
  "Abhyanga should be resorted to daily; it wards off old age, exertion and aggravation of Vata." — Charaka Samhita
</blockquote>
<p>Massaging warm sesame oil (or coconut oil during summer) into the skin calms the nervous system, nourishes tissues (Dhatus), improves circulation, and grounds anxious thoughts.</p>

<h2>4. Harmonizing with Doshic Hours</h2>
<p>The 24-hour day is divided into six periods governed by the three doshas:</p>
<ul class="list-disc pl-5 my-4 space-y-2">
  <li><strong>06:00 AM – 10:00 AM (Kapha):</strong> Sluggishness transitions into steadiness. Ideal for physical exercise (Vyayama) and yoga.</li>
  <li><strong>10:00 AM – 02:00 PM (Pitta):</strong> Digestive fire is at its peak. The largest meal of the day should be consumed around midday.</li>
  <li><strong>02:00 PM – 06:00 PM (Vata):</strong> Mental energy and creative focus peak. Ideal for study, consultations, and creative work.</li>
  <li><strong>06:00 PM – 10:00 PM (Kapha):</strong> Earth and water energy slow the body down. Have a light dinner and wind down for sleep before 10:00 PM.</li>
</ul>

<p>By bringing our daily lifestyle into accord with these ancient principles, we cultivate resilience, clarity of mind, and harmonious longevity.</p>
        `.trim(),
      },
    });

    console.log("Blog articles seeded successfully.");
  }

  // ---------------------------------------------------------
  // SEED INITIAL PANCHANG ENTRIES (If none exist)
  // ---------------------------------------------------------
  const panchangCount = await prisma.panchang.count();
  if (panchangCount === 0) {
    console.log("Seeding authentic daily Panchang entries...");

    const istOffset = 5.5 * 60 * 60 * 1000;
    const nowIST = new Date(Date.now() + istOffset);

    // Seed today's Panchang
    const todayStr = nowIST.toISOString().split("T")[0];

    // Seed tomorrow's Panchang
    const tomorrowDate = new Date(nowIST.getTime() + 24 * 60 * 60 * 1000);
    const tomorrowStr = tomorrowDate.toISOString().split("T")[0];

    await prisma.panchang.create({
      data: {
        date: todayStr,
        dateObj: new Date(`${todayStr}T12:00:00Z`),
        dayName: "Saturday · शनिवार",
        location: "Muzaffarnagar, Uttar Pradesh",
        sunrise: "06:16 AM",
        sunset: "06:04 PM",
        moonrise: "11:15 PM",
        moonset: "12:10 PM",
        tithi: "Krishna Paksha Ashtami up to 04:32 PM, then Navami",
        nakshatra: "Ardra up to 03:45 PM, then Punarvasu",
        yoga: "Variyan up to 01:20 PM, then Parigha",
        karana: "Kaulava up to 04:32 PM, then Taitila",
        paksha: "Krishna Paksha",
        vikramSamvat: "2083",
        shakaSamvat: "1948",
        ayana: "Dakshinayana",
        ritu: "Sharad (शरद ऋतु)",
        moonSign: "Mithuna (मिथुन - Gemini)",
        sunSign: "Kanya (कन्या - Virgo)",
        rahukaal: "09:15 AM – 10:45 AM",
        yamaganda: "01:30 PM – 03:00 PM",
        gulikaKaal: "06:16 AM – 07:45 AM",
        abhijitMuhurat: "11:46 AM – 12:34 PM",
        brahmaMuhurat: "04:38 AM – 05:27 AM",
        auspiciousTimings: "Amrit Kaal: 02:15 PM – 03:45 PM; Vijaya Muhurat: 02:05 PM – 02:53 PM",
        inauspiciousTimings: "Dur Muhurat: 06:16 AM – 07:04 AM; Rahukaal: 09:15 AM – 10:45 AM",
        festivals: "Kalashtami Vrat · Bhairava Puja",
        specialNotes: "Auspicious day for spiritual contemplation, worship of Lord Shiva and Bhairava, and donation of black sesame seeds or mustard oil.",
        status: "PUBLISHED",
      },
    });

    await prisma.panchang.create({
      data: {
        date: tomorrowStr,
        dateObj: new Date(`${tomorrowStr}T12:00:00Z`),
        dayName: "Sunday · रविवार",
        location: "Muzaffarnagar, Uttar Pradesh",
        sunrise: "06:17 AM",
        sunset: "06:03 PM",
        moonrise: "11:58 PM",
        moonset: "01:15 PM",
        tithi: "Krishna Paksha Navami up to 05:10 PM, then Dashami",
        nakshatra: "Punarvasu up to 04:40 PM, then Pushya",
        yoga: "Parigha up to 02:05 PM, then Shiva",
        karana: "Gara up to 05:10 PM, then Vanija",
        paksha: "Krishna Paksha",
        vikramSamvat: "2083",
        shakaSamvat: "1948",
        ayana: "Dakshinayana",
        ritu: "Sharad (शरद ऋतु)",
        moonSign: "Karka (कर्क - Cancer)",
        sunSign: "Kanya (कन्या - Virgo)",
        rahukaal: "04:30 PM – 06:00 PM",
        yamaganda: "12:00 PM – 01:30 PM",
        gulikaKaal: "03:00 PM – 04:30 PM",
        abhijitMuhurat: "11:45 AM – 12:33 PM",
        brahmaMuhurat: "04:39 AM – 05:28 AM",
        auspiciousTimings: "Amrit Kaal: 07:15 AM – 08:45 AM; Godhuli Muhurat: 06:03 PM – 06:27 PM",
        inauspiciousTimings: "Rahukaal: 04:30 PM – 06:00 PM; Yamaganda: 12:00 PM – 01:30 PM",
        festivals: "Surya Puja · Ravi Vrat",
        specialNotes: "Sunday dedicated to Lord Surya. Offering Arghya with copper pot at sunrise promotes vitality, leadership, and inner illumination.",
        status: "PUBLISHED",
      },
    });

    console.log("Panchang entries seeded successfully.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });