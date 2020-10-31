/* tslint:disable */
/* eslint-disable */
/**
* @returns {number}
*/
export function get_context(): number;
/**
* @param {number} context_ptr
* @param {number} element_ptr
* @param {Element} container
* @returns {number}
*/
export function render(context_ptr: number, element_ptr: number, container: Element): number;
/**
* @param {number} context_ptr
* @param {boolean} did_timeout
* @returns {number}
*/
export function work_loop(context_ptr: number, did_timeout: boolean): number;
/**
* @param {number} context_ptr
* @param {any} initial_value
* @returns {any[]}
*/
export function use_state(context_ptr: number, initial_value: any): any[];
/**
* @param {string} element_type
* @param {number} props_ptr
* @param {Uint32Array} children_ptr
* @returns {number}
*/
export function create_element(element_type: string, props_ptr: number, children_ptr: Uint32Array): number;
/**
* @param {string} value
* @returns {number}
*/
export function create_text_element(value: string): number;
/**
* @param {Function} func
* @param {any} props
* @returns {number}
*/
export function create_functional_component(func: Function, props: any): number;
/**
* @param {string | undefined} class_name
* @param {string | undefined} node_value
* @param {Function | undefined} on_click
* @param {Function | undefined} on_change
* @param {Function | undefined} on_blur
* @param {Function | undefined} on_keydown
* @param {string | undefined} input_type
* @param {string | undefined} input_value
* @param {boolean | undefined} input_checked
* @param {string | undefined} input_placeholder
* @returns {number}
*/
export function create_props(class_name?: string, node_value?: string, on_click?: Function, on_change?: Function, on_blur?: Function, on_keydown?: Function, input_type?: string, input_value?: string, input_checked?: boolean, input_placeholder?: string): number;
/**
*/
export class Context {
  free(): void;
}
