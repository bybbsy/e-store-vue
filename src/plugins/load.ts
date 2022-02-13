import _Vue from 'vue';
import { Action, ErrorHandler } from '@/types/plugins/index';

declare module 'vue/types/vue' {
  interface Vue {
    $load: (action: Action, errorHandler?: ErrorHandler) => void
  }
}

export async function errorHandlerPlugin(Vue: typeof _Vue) {
  Vue.prototype.$load = async (action: Action, errorHandler?: ErrorHandler) => {
    try {
      await action();
    } catch (e) {
      if(errorHandler) {
        errorHandler()
      } else {
        throw e;
      }
    }
  }
}
