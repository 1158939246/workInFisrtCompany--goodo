/*
 * @Author: migao@wangguoyan 
 * @Date: 2021-11-02 11:15:10 
 * @Last Modified by: migao@wangguoyan
 * @Last Modified time: 2021-11-02 11:30:23
 */

/**
 * @description 元数据约束空间
 */
declare namespace ResMeta {

    /**
     * @description 基础结构
     */
    export interface Construct<T> {
        data: T;
        message: string;
        status: number;
    }
}