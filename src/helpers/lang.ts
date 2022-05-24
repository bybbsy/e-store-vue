import Vue from "vue";
import { I18nOptions } from "vue-i18n";

function setLanguage(options: I18nOptions, lang: string) {
  localStorage.setItem('lang', lang);
  options.locale = lang;
}

export {
  setLanguage
}
