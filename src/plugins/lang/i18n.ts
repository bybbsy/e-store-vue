import en from '@/resources/lang/en.json';
import de from '@/resources/lang/de.json';
import es from '@/resources/lang/es.json';
import ru from '@/resources/lang/ru.json';

import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default new VueI18n({
  locale: localStorage.getItem('lang') ?? 'English',
  messages: {
    'English': en,
    'German': de,
    'Spanish': es,
    'Russian': ru
  }
})
