import Link from "next/link";
import Image from "next/image";

export type HomeBlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  featuredImage?: string | null;
  readingTime: number;
  publishedAt: string;
};

type Props = {
  blogs: HomeBlogPost[];
};

export default function HomeBlogSection({ blogs }: Props) {
  // If no blogs in database yet, show default curated cards to showcase the topics
  const displayBlogs = blogs && blogs.length > 0
    ? blogs.slice(0, 3)
    : [
        {
          id: "default-1",
          title: "कुंडली में देवगुरु बृहस्पति (गुरु) का महत्व एवं शुभ प्रभाव",
          slug: "understanding-significance-of-brihaspati-in-vedic-astrology",
          category: "वैदिक ज्योतिष",
          excerpt:
            "वैदिक ज्योतिष में बृहस्पति को देवगुरु कहा गया है। जानिए गुरु की स्थिति आपके ज्ञान, धन, विवाह और आध्यात्मिक उन्नति को कैसे दिशा देती है।",
          readingTime: 4,
          publishedAt: new Date().toISOString(),
          featuredImage: "/og-image.jpg",
        },
        {
          id: "default-2",
          title: "आयुर्वेदिक दिनचर्या: प्रकृति के अनुकूल दैनिक जीवनशैली के सूत्र",
          slug: "ayurvedic-dinacharya-daily-routine-lifestyle-rhythms",
          category: "आयुर्वेद",
          excerpt:
            "प्राचीन आयुर्वेद में दिनचर्या को दीर्घायु एवं निरोगी जीवन का आधार माना गया है। वात, पित्त एवं कफ के संतुलन के व्यावहारिक नियम।",
          readingTime: 5,
          publishedAt: new Date().toISOString(),
          featuredImage: "/og-image.jpg",
        },
        {
          id: "default-3",
          title: "विवाह पूर्व कुंडली मिलान: अष्टकूट विचार एवं मांगलिक दोष की सच्चाई",
          slug: "kundali-milan-vedic-marriage-compatibility-guide",
          category: "कुंडली मिलान",
          excerpt:
            "वर-वधू के गुणों का मिलान केवल ३६ गुणों की गिनती नहीं, बल्कि मानसिक अनुकूलता, स्वास्थ्य और दांपत्य सुख का समग्र शास्त्रसम्मत अध्ययन है।",
          readingTime: 6,
          publishedAt: new Date().toISOString(),
          featuredImage: "/og-image.jpg",
        },
      ];

  return (
    <section id="blogs-section" className="home-blog-section">
      <div className="home-blog-glow" />
      <div className="home-blog-inner">

        {/* SECTION HEADER */}
        <div className="home-blog-header">
          <div className="home-blog-header-left">
            <p className="home-blog-eyebrow">
              <span>✦</span> ज्ञान एवं सनातन परंपरा · ARTICLES & WISDOM <span>✦</span>
            </p>

            <h2 className="home-blog-title">
              ज्योतिष एवं आयुर्वेद <em>लेख संग्रह</em>
            </h2>

            <p className="home-blog-subtitle">
              ऋषि परंपरा, ग्रह गोचर के वैज्ञानिक प्रभाव, जन्म कुंडली के सूक्ष्म रहस्य और स्वस्थ जीवनशैली से जुड़े ज्ञानवर्धक लेख।
            </p>
          </div>

          <div className="home-blog-header-right">
            <Link href="/blog" className="home-blog-all-btn">
              <span>सभी लेख देखें</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* ARTICLES GRID */}
        <div className="home-blog-grid">
          {displayBlogs.map((blog) => (
            <article key={blog.id} className="home-blog-card">
              <Link href={`/blog/${blog.slug}`} className="blog-card-link-wrap">
                {/* CARD THUMBNAIL (if available) */}
                <div className="home-blog-thumb">
                  <Image
                    src={blog.featuredImage || "/og-image.jpg"}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="blog-thumb-img"
                  />
                  <span className="blog-category-badge">{blog.category}</span>
                </div>

                <div className="home-blog-body">
                  <div className="blog-meta-top">
                    <span className="blog-read-time">⏱ {blog.readingTime} मिनट का पाठ</span>
                    <span className="blog-date-dot">•</span>
                    <span className="blog-sansthan-tag">श्री नक्षत्रलोक</span>
                  </div>

                  <h3 className="home-blog-heading">{blog.title}</h3>

                  <p className="home-blog-excerpt">{blog.excerpt}</p>

                  <div className="home-blog-footer">
                    <span className="read-more-text">
                      विस्तार से पढ़ें <span className="arrow">↗</span>
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* BOTTOM MOBILE VIEW ALL BUTTON */}
        <div className="home-blog-bottom-bar">
          <Link href="/blog" className="home-blog-all-btn-mobile">
            <span>सभी ज्योतिष एवं आयुर्वेद लेख पढ़ें</span>
            <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
