/**
 * Server-side HTML sanitizer to protect against Stored XSS and malicious injections.
 * Only allows clean article formatting tags and safe attributes.
 */

const ALLOWED_TAGS = new Set([
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "s",
  "strike",
  "ul",
  "ol",
  "li",
  "blockquote",
  "a",
  "img",
  "br",
  "hr",
  "span",
  "div",
  "code",
  "pre",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
]);

const ALLOWED_SCHEMES = ["http:", "https:", "mailto:", "tel:"];

function isSafeUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();

  // Relative URLs starting with / or # are safe
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) {
    // Prevent protocol-relative URLs like //evil.com
    return !trimmed.startsWith("//");
  }

  try {
    const parsed = new URL(url, "https://example.com");
    return ALLOWED_SCHEMES.includes(parsed.protocol);
  } catch {
    return false;
  }
}

export function sanitizeHtml(dirty: string): string {
  if (!dirty || typeof dirty !== "string") {
    return "";
  }

  // 1. Remove dangerous blocks completely (scripts, styles, iframes, objects, forms, svgs)
  let clean = dirty
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/<svg\b[^<]*(?:(?!<\/svg>)<[^<]*)*<\/svg>/gi, "")
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, "");

  // 2. Parse tags and strip disallowed tags and attributes
  clean = clean.replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, tagName, rawAttrs) => {
    const tag = tagName.toLowerCase();

    // If tag is not in whitelist, strip the tag but keep text
    if (!ALLOWED_TAGS.has(tag)) {
      return "";
    }

    const isClosing = match.startsWith("</");
    if (isClosing) {
      return `</${tag}>`;
    }

    // Process attributes
    const attrRegex = /([a-zA-Z0-9-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    const safeAttrs: string[] = [];
    let attrMatch: RegExpExecArray | null;

    let hasTarget = false;
    let hasRel = false;

    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrVal = attrMatch[2] ?? attrMatch[3] ?? attrMatch[4] ?? "";

      // Reject all event handlers (onclick, onload, onerror, etc.)
      if (attrName.startsWith("on")) {
        continue;
      }

      // Check per tag
      if (tag === "a") {
        if (attrName === "href") {
          if (isSafeUrl(attrVal)) {
            safeAttrs.push(`href="${escapeAttr(attrVal)}"`);
          }
        } else if (attrName === "title") {
          safeAttrs.push(`title="${escapeAttr(attrVal)}"`);
        } else if (attrName === "target") {
          if (attrVal === "_blank") {
            hasTarget = true;
            safeAttrs.push(`target="_blank"`);
          }
        } else if (attrName === "rel") {
          hasRel = true;
          safeAttrs.push(`rel="noopener noreferrer"`);
        } else if (attrName === "class") {
          safeAttrs.push(`class="${escapeAttr(attrVal)}"`);
        }
      } else if (tag === "img") {
        if (attrName === "src") {
          if (isSafeUrl(attrVal)) {
            safeAttrs.push(`src="${escapeAttr(attrVal)}"`);
          }
        } else if (attrName === "alt") {
          safeAttrs.push(`alt="${escapeAttr(attrVal)}"`);
        } else if (attrName === "title") {
          safeAttrs.push(`title="${escapeAttr(attrVal)}"`);
        } else if (attrName === "width") {
          safeAttrs.push(`width="${escapeAttr(attrVal)}"`);
        } else if (attrName === "height") {
          safeAttrs.push(`height="${escapeAttr(attrVal)}"`);
        } else if (attrName === "class") {
          safeAttrs.push(`class="${escapeAttr(attrVal)}"`);
        } else if (attrName === "loading") {
          safeAttrs.push(`loading="lazy"`);
        }
      } else {
        // General tags: allow class and id
        if (attrName === "class") {
          safeAttrs.push(`class="${escapeAttr(attrVal)}"`);
        } else if (attrName === "id") {
          const sanitizedId = attrVal.replace(/[^a-zA-Z0-9_-]/g, "");
          if (sanitizedId) {
            safeAttrs.push(`id="${sanitizedId}"`);
          }
        }
      }
    }

    if (tag === "a" && hasTarget && !hasRel) {
      safeAttrs.push(`rel="noopener noreferrer"`);
    }

    const selfClosing = ["br", "hr", "img"].includes(tag) ? " />" : ">";
    const attrsString = safeAttrs.length > 0 ? " " + safeAttrs.join(" ") : "";
    return `<${tag}${attrsString}${selfClosing}`;
  });

  return clean;
}

function escapeAttr(val: string): string {
  return val
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
