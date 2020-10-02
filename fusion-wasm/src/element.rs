use std::rc::Rc;
use wasm_bindgen::prelude::*;
use web_sys::{Element as HTMLElement, Text as HTMLText};
use super::{TEXT_ELEMENT, FIBER_FUNCTIONAL};

pub enum Node {
    Text(HTMLText),
    Element(HTMLElement),
}

pub struct Element {
    element_type: String,
    component_function: Option<Rc<js_sys::Function>>,
    component_function_props: Option<Rc<JsValue>>,
    props: Option<Box<ElementProps>>,
    children: Option<Vec<Box<Element>>>,
}

impl Element {
    pub fn new(
        element_type: String,
        component_function: Option<Rc<js_sys::Function>>,
        component_function_props: Option<Rc<JsValue>>,
        props: Option<Box<ElementProps>>,
        children: Option<Vec<Box<Element>>>,
    ) -> Element {
        Element {
            element_type,
            component_function,
            component_function_props,
            props,
            children,
        }
    }

    pub fn is_text_element(&self) -> bool {
        self.element_type == "_T"
    }

    pub fn element_type(&self) -> &String {
        &self.element_type
    }

    pub fn props(&self) -> &Option<Box<ElementProps>> {
        &self.props
    }

    pub fn props_mut(&mut self) -> &mut Option<Box<ElementProps>> {
        &mut self.props
    }

    pub fn children(&self) -> &Option<Vec<Box<Element>>> {
        &self.children
    }

    pub fn children_mut(&mut self) -> &mut Option<Vec<Box<Element>>> {
        &mut self.children
    }

    pub fn component_function(&self) -> Option<&Rc<js_sys::Function>> {
        self.component_function.as_ref()
    }

    pub fn component_function_props(&self) -> Option<&Rc<JsValue>> {
        self.component_function_props.as_ref()
    }

    pub fn from_ptr(ptr: *mut Element) -> Box<Element> {
        unsafe { Box::from_raw(ptr) }
    }
}

#[derive(Eq)]
pub struct ElementProps {
    class_name: Option<String>,
    node_value: Option<String>,
    on_click: Option<js_sys::Function>,
}

impl ElementProps {
    pub fn new(
        class_name: Option<String>,
        node_value: Option<String>,
        on_click: Option<js_sys::Function>,
    ) -> Self {
        ElementProps { class_name, node_value, on_click }
    }

    pub fn class_name(&self) -> Option<&String> {
        self.class_name.as_ref()
    }

    pub fn node_value(&self) -> Option<&String> {
        self.node_value.as_ref()
    }

    pub fn on_click(&self) -> Option<&js_sys::Function> {
        self.on_click.as_ref()
    }

    pub fn from_ptr(ptr: *mut ElementProps) -> Box<ElementProps> {
        unsafe { Box::from_raw(ptr) }
    }
}

impl PartialEq for ElementProps {
    fn eq(&self, other: &Self) -> bool {
        self.class_name == other.class_name &&
        self.node_value == other.node_value &&
        self.on_click == other.on_click
    }
}

#[wasm_bindgen]
pub fn create_element(
    element_type: String,
    props_ptr: *mut ElementProps,
    children_ptr: &[u32]
) -> *mut Element {
    let props = ElementProps::from_ptr(props_ptr);

    let children = children_ptr.iter()
        .map(|ptr| Element::from_ptr(ptr.clone() as *mut Element))
        .collect::<Vec<Box<Element>>>();

    let element = Element::new(
        element_type,
        None,
        None,
        Some(props),
        Some(children)
    );

    Box::into_raw(Box::new(element))
}

#[wasm_bindgen]
pub fn create_text_element(value: String) -> *mut Element {
    let props = ElementProps::new(None, Some(value), None);

    let element = Element::new(
        String::from(TEXT_ELEMENT), 
        None,
        None,
        Some(Box::new(props)),
        None
    );

    Box::into_raw(Box::new(element))
}

#[wasm_bindgen]
pub fn create_functional_component(func: js_sys::Function, props: JsValue) -> *mut Element {
    let element = Element::new(
        String::from(FIBER_FUNCTIONAL),
        Some(Rc::new(func)),
        Some(Rc::new(props)),
        None,
        None
    );

    Box::into_raw(Box::new(element))
}

#[wasm_bindgen]
pub fn create_props(
    class_name: Option<String>,
    node_value: Option<String>,
    on_click: Option<js_sys::Function>
) -> *mut ElementProps {
    let props = ElementProps::new(class_name, node_value, on_click);
    Box::into_raw(Box::new(props))
}
