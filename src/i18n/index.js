import enLang from "./entries/en-US";
import viLang from "./entries/vi-VI";

const AppLocale = {
  EN: enLang,
  VI: viLang,
};

if (!Intl.PluralRules) {
  require("@formatjs/intl-pluralrules/polyfill");
  require("@formatjs/intl-pluralrules/locale-data/en");
  require("@formatjs/intl-pluralrules/locale-data/vi");
}

if (!Intl.RelativeTimeFormat) {
  require("@formatjs/intl-relativetimeformat/polyfill");
  require("@formatjs/intl-relativetimeformat/locale-data/en");
  require("@formatjs/intl-relativetimeformat/locale-data/vi");
}

export default AppLocale;
