import _Vue from 'vue';
import { errorHandler } from '@/types/plugins';

export async function errorHandlerPlugin(Vue: typeof _Vue) {
  Vue.prototype.$load = async (action: any, errorHandler: errorHandler) => {
    try {
      await action();
    } catch (e) {
      if(errorHandler) {
        errorHandler(e);
      } else {
        console.error("Some error has occured", e);
      }
    }
  }
}
