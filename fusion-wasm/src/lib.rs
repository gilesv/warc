use wasm_bindgen::prelude::*;
use wasm_bindgen::convert::FromWasmAbi;
use web_sys::{Element as HTMLElement, Document};
use js_sys::Reflect;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace=console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub struct Element {
    element_type: String,
    props: ElementProps,
    children: Vec<Element>,
}

#[wasm_bindgen]
impl Element {
    #[wasm_bindgen(constructor)]
    pub fn new(
        element_type: String,
        props: ElementProps,
        raw_children: Box<[JsValue]>
    ) -> Element {
        let children =
            raw_children
                .iter()
                .map(|js_child| {
                    Element::from_js_value(js_child).unwrap()
                }).collect();
        
        Element { element_type, props, children }
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

    #[wasm_bindgen(getter)]
    pub fn element_type(&self) -> String {
        self.element_type.clone()
    }

    #[wasm_bindgen(getter)]
    pub fn props(&self) -> ElementProps {
        self.props.clone()
    }
}

#[wasm_bindgen]
#[derive(Clone)]
pub struct ElementProps {
    class_name: String,
    node_value: String,
}

#[wasm_bindgen]
impl ElementProps {
    #[wasm_bindgen(constructor)]
    pub fn new(class_name: String, node_value: String) -> ElementProps {
        ElementProps { class_name, node_value }
    }

    pub fn class_name(&self) -> String {
        self.class_name.clone()
    }

    pub fn node_value(&self) -> String {
        self.node_value.clone()
    }
}

// Called by our JS entry point to run the example
#[wasm_bindgen]
pub fn render(js_element: JsValue, container: web_sys::Element) -> Result<(), JsValue> {
    let element = Element::from_js_value(&js_element).unwrap();

    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    render_internal(element, &container, &document)?;

    Ok(())
}

fn render_internal(
    element: Element,
    container: &HTMLElement,
    document: &Document) -> Result<(), JsValue> {

    if element.is_text_element() {
        let node = document.create_text_node(&element.props().node_value());
        container.append_child(&node)?;
    } else {
        let node = document.create_element(&element.element_type())?;

        for child in element.children {
            render_internal(child, &node, document)?;
        }

        container.append_child(&node)?;
    }

    Ok(())
}

struct Fiber {
    
}

struct App {
    wip_root: Option<Fiber>,
    current_root: Option<Fiber>,
    next_unit_of_work: Option<Fiber>,
    wip_functional_fiber: Option<Fiber>,
    hook_index: usize,
}

impl App {
    fn new() -> Self {
        App {
            wip_root: None,
            current_root: None,
            next_unit_of_work: None,
            wip_functional_fiber: None,
            hook_index: 0
        }
    }

    fn render(&mut self, element: Element, container: HTMLElement) {
        todo!()
    }

    fn work_loop() {
        todo!()
    }

    fn perform_unit_of_work(fiber: &Fiber) {
        todo!()
    }
    
    fn update_functional_tree(fiber: &Fiber) {
        todo!()
    }

    fn update_regular_tree(fiber: &Fiber) {
        todo!()
    }

    fn reconcile_children(current_fiber: &Fiber, children: Vec<Element>) {
        todo!()
    }

    fn commit_work(fiber: &Fiber) {
        todo!()
    }

    fn commit_node_append(fiber: &Fiber, parent_dom_node: HTMLElement) {
        todo!()
    }

    fn commit_node_deletion(fiber: &Fiber, parent_dom_node: HTMLElement) {
        todo!()
    }

    fn commit_root() {
        todo!()
    }
}

