const shortWords = [
  "а",
  "без",
  "бы",
  "в",
  "во",
  "да",
  "для",
  "до",
  "же",
  "за",
  "и",
  "из",
  "или",
  "к",
  "ко",
  "ли",
  "либо",
  "на",
  "над",
  "не",
  "ни",
  "но",
  "о",
  "об",
  "обо",
  "от",
  "по",
  "под",
  "при",
  "про",
  "с",
  "со",
  "у",
  "через",
];

const shortWordPattern = new RegExp(
  `(^|[\\s([{«„“\"—–-])(${shortWords.join("|")})[ \\t]+(?=[\\p{L}\\p{N}«„“\"])`,
  "giu",
);

const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;

    if (
      !node.nodeValue.trim() ||
      !parent ||
      parent.closest("script, style, noscript, textarea, code, pre")
    ) {
      return NodeFilter.FILTER_REJECT;
    }

    return NodeFilter.FILTER_ACCEPT;
  },
});

const textNodes = [];

while (textWalker.nextNode()) {
  textNodes.push(textWalker.currentNode);
}

textNodes.forEach((node) => {
  node.nodeValue = node.nodeValue.replace(shortWordPattern, "$1$2\u00a0");
});
