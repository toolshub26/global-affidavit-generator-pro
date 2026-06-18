// =====================================
// AGI ULTRA PRO
// RENDER ENGINE
// =====================================

import { ENGLISH_TEMPLATES } from "../templates/english.js";
import { ARABIC_TEMPLATES } from "../templates/arabic.js";
import { URDU_TEMPLATES } from "../templates/urdu.js";
import { HINDI_TEMPLATES } from "../templates/hindi.js";

const LANGUAGE_PACKS = {
  English: ENGLISH_TEMPLATES,
  Arabic: ARABIC_TEMPLATES,
  Urdu: URDU_TEMPLATES,
  Hindi: HINDI_TEMPLATES
};

export function renderAffidavit(
  purpose,
  language,
  data
) {

  const pack = LANGUAGE_PACKS[language];

  if (!pack) {
    return "<h3>Language not supported</h3>";
  }

  const template = pack[purpose];

  if (!template) {
    return "<h3>Template not found</h3>";
  }

  let paragraphsHTML = "";

  template.paragraphs.forEach((text, index) => {

    let p = text;

    Object.keys(data).forEach(key => {
      p = p.replaceAll(`{${key}}`, data[key]);
    });

    paragraphsHTML += `<p><b>${index + 1}.</b> ${p}</p>`;

  });

  let intro = template.intro;

  Object.keys(data).forEach(key => {
    intro = intro.replaceAll(`{${key}}`, data[key]);
  });

  let verification = template.verification;

  Object.keys(data).forEach(key => {
    verification = verification.replaceAll(`{${key}}`, data[key]);
  });

  return `
<h2 style="text-align:center">
${template.title}
</h2>

<p>${intro}</p>

${paragraphsHTML}

<h3>${template.verificationTitle}</h3>

<p>${verification}</p>
`;
}
