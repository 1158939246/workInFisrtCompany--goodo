/*
 * @Author: migao@wangguoyan 
 * @Date: 2021-11-02 11:24:55 
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-11-02 13:16:25
 */

declare namespace LoginMeta {

    /**
     * @description 返回元数据结构
     */
    interface Response {
        authorityType: string;
        email: string;
        is: string;
        isLocked: boolean;
        locked: false;
        passWord: string;
        token: string;
        userName: string;
        userNo: string;
    }
}