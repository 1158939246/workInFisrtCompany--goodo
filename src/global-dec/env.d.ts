/*
 * @Author: migao@wangguoyan 
 * @Date: 2021-10-19 15:14:05 
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-11-02 14:37:47
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  import { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component

  global {
    /**
     * @description 拓展的全局对象
     */
    interface Window{
      $message: MessageApiInjection
    }
  }
}

