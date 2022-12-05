const text = {};

export const initText = () => {};

export default function getText(lang, id) {
  return text[lang][id];
}
