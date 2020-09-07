use wasm_bindgen::prelude::*;
use wasm_bindgen::convert::FromWasmAbi;
use web_sys::{Element as HTMLElement, Text as HTMLText};
use js_sys::Reflect;
use super::{TEXT_ELEMENT, console_log, log};

pub enum Node {
    Text(HTMLText),
    Element(HTMLElement),
}

#[wasm_bindgen]
pub struct Element {
    element_type: String,
    props: Option<ElementProps>,
    children: Option<Vec<Element>>,
}

impl Element {
    pub fn new(
        element_type: String,
        props: ElementProps,
        children: Vec<Element>,
    ) -> Element {
        Element { element_type, props: Some(props), children: Some(children) }
    }

    pub fn from_js_value(js_value: &JsValue) -> Result<Element, JsValue> {
        let ptr = unsafe { Reflect::get(&js_value, &JsValue::from_str("ptr"))? };
        let ptr_u32: u32 = ptr.as_f64().ok_or(JsValue::NULL)? as u32;
        let foo = unsafe { Element::from_abi(ptr_u32) };

        Ok(foo)
    }

    pub fn is_text_element(&self) -> bool {
        self.element_type == "_T"
    }

    pub fn element_type(&self) -> &String {
        &self.element_type
    }

    pub fn props(&self) -> &Option<ElementProps> {
        &self.props
    }

    pub fn props_mut(&mut self) -> &mut Option<ElementProps> {
        &mut self.props
    }

    pub fn children(&self) -> &Option<Vec<Element>> {
        &self.children
    }

    pub fn children_mut(&mut self) -> &mut Option<Vec<Element>> {
        &mut self.children
    }
}

#[wasm_bindgen]
#[derive(Eq)]
pub struct ElementProps {
    class_name: Option<String>,
    node_value: Option<String>,
}

impl ElementProps {
    pub fn new(class_name: Option<String>, node_value: Option<String>) -> Self {
        ElementProps { class_name, node_value }
    }

    pub fn class_name(&self) -> Option<&String> {
        self.class_name.as_ref()
    }

    pub fn node_value(&self) -> Option<&String> {
        self.node_value.as_ref()
    }
}

impl PartialEq for ElementProps {
    fn eq(&self, other: &Self) -> bool {
        self.class_name == other.class_name &&
        self.node_value == other.node_value
    }
}

#[wasm_bindgen]
pub fn create_element(
    element_type: String,
    props: ElementProps,
    raw_children: Box<[JsValue]>
) -> Element {
    let children: Vec<Element> = raw_children.iter()
        .map(|js_child| {
            Element::from_js_value(js_child).unwrap()
        }).collect();

    Element::new(element_type, props, children)
}

#[wasm_bindgen]
pub fn create_text_element(value: String) -> Element {
    // TODO: turn class_name and node_value into Options
    Element::new(
        String::from(TEXT_ELEMENT), 
        ElementProps::new(None, Some(value)),
        vec![],
    )
}


#[wasm_bindgen]
pub fn create_props(class_name: Option<String>, node_value: Option<String>) -> ElementProps {
    ElementProps::new(class_name, node_value)
}
