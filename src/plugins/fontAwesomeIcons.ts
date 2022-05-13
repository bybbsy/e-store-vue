import Vue from "vue";
import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faPencil, faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';


Vue.component('font-awesome-icon', FontAwesomeIcon);

library.add(faBars, faPencil, faArrowCircleLeft, faArrowCircleRight);
