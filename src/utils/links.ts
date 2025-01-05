export function getCanonicalUrl() {
  const canonicalLink: HTMLLinkElement = document.querySelector(
    'link[rel="canonical"]',
  )!;
  if (canonicalLink) {
    return canonicalLink.href;
  } else {
    return null;
  }
}
