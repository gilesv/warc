use wasm_bindgen::prelude::*;
use wasm_bindgen::convert::FromWasmAbi;
use web_sys::{Element as HTMLElement, Text as HTMLText, Window, Document};
use js_sys::Reflect;
use std::cell::RefCell;
use std::rc::Rc;

mod fiber;
use fiber::{Fiber, FiberCell, FiberEffect};

static TEXT_ELEMENT: &str = "__TEXT";

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace=console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub struct Element {
    element_type: String,
    props: Rc<RefCell<ElementProps>>,
    children: Vec<Rc<RefCell<Element>>>,
}

#[wasm_bindgen]
impl Element {
    #[wasm_bindgen(constructor)]
    pub fn new(
        element_type: String,
        props: ElementProps,
        raw_children: Box<[JsValue]>
    ) -> Element {
        let children= raw_children.iter()
            .map(|js_child| {
                Rc::new(
                    RefCell::new(
                        Element::from_js_value(js_child).unwrap()
                    )
                )
            }).collect();
        
        let props = Rc::new(RefCell::new(props));

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
        self.props.borrow().clone()
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

enum Node {
    Text(HTMLText),
    Element(HTMLElement),
}

#[wasm_bindgen(inspectable)]
pub struct Context {
    wip_root: Option<FiberCell>,
    current_root: Option<Fiber>,
    next_unit_of_work: Option<FiberCell>,
    wip_functional_fiber: Option<Fiber>,
    hook_index: usize,
    window: Window,
    document: Document
}

#[wasm_bindgen]
impl Context {
    pub fn new() -> Self {
        let window: Window = web_sys::window().unwrap();
        let document: Document = window.document().unwrap();

        Context {
            wip_root: None,
            current_root: None,
            next_unit_of_work: None,
            wip_functional_fiber: None,
            hook_index: 0,
            window,
            document
        }
    }

    fn from_js_value(js_value: &JsValue) -> Result<Context, JsValue> {
        let ptr = unsafe { Reflect::get(&js_value, &JsValue::from_str("ptr"))? };
        let ptr_u32: u32 = ptr.as_f64().ok_or(JsValue::NULL)? as u32;
        let foo = unsafe { Context::from_abi(ptr_u32) };

        Ok(foo)
    }

    fn work_loop(&mut self, did_timeout: bool) {
        unsafe { log(&format!("workloop called with {}", did_timeout)); }

        loop {
            let next_unit_of_work = &self.next_unit_of_work;
            let no_next_unit_of_work = next_unit_of_work.is_none();

            if did_timeout || no_next_unit_of_work {
                break;
            }

            self.next_unit_of_work = self.perform_unit_of_work();
        }
    }

    fn perform_unit_of_work(&mut self) -> Option<FiberCell> {
        let wip_unit = self.next_unit_of_work.as_ref().unwrap();
        let mut fiber = wip_unit.borrow_mut();

        if fiber.is_functional_tree() {
            todo!();
        } else {
            // updateRegularTree
            if fiber.dom_node().is_none() {
                let dom_node = self.create_dom_node(&fiber);
                fiber.set_dom_node(Rc::new(RefCell::new(dom_node)));
            }

            self.reconcile_children(wip_unit, &mut fiber);
        }

        // If fiber has a child, make it the next unit of work
        if let Some(fiber_child) = &fiber.child() {
            return Some(Rc::clone(fiber_child));

        // ...or if it has a sibling, make it the next unit of work
        } else if let Some(fiber_sibling) = &fiber.sibling() {
            return Some(Rc::clone(fiber_sibling));

        // Otherwise look for the closest parent's sibling
        } else {
            for parent in fiber.parents() {
                if let Some(parent_sibling) = &parent.borrow().sibling() {
                    return Some(Rc::clone(parent_sibling));
                }
            }
        }

        return None;
    }

    fn create_dom_node(&self, fiber: &Fiber) -> Node {
        let props = fiber.props().as_ref().unwrap().borrow();

        if fiber.is_text_fiber() {
            let node: HTMLText = self.document.create_text_node(&props.node_value);

            Node::Text(node)
        } else {
            let node = self.document.create_element(fiber.element_type()).unwrap();
            self.update_dom_node(&node, &props);

            Node::Element(node)
        }
    }

    fn update_dom_node(&self, dom_node: &HTMLElement, props: &ElementProps) {
        dom_node.set_class_name(&props.class_name);
    }

    fn reconcile_children(&self, wip_unit: &FiberCell, fiber: &mut Fiber) {
        let children = fiber.element_children().as_ref();
        let children_len = children.map_or(0, |children| { children.len() });

        let mut i = 0;
        let mut previous_sibling: Option<FiberCell> = None;
        let mut first_child_fiber: Option<FiberCell> = None;

        let mut old_child_fiber = if fiber.alternate().is_some() {
            let alternate = fiber.alternate().as_ref().unwrap().borrow();

            if let Some(child) = &alternate.child() {
                Some(Rc::clone(child))
            } else {
                None
            }
        } else {
            None
        };

        while i < children_len || old_child_fiber.is_some() {
            let child_element = &children.unwrap()[i].borrow();

            let has_same_type = if let Some(old_child_cell) = &old_child_fiber {
                let old_child = old_child_cell.borrow();
                let old_child_type = old_child.element_type();
                let new_child_type = &child_element.element_type;

                *old_child_type == *new_child_type

            } else {
                false
            };

            // Generate a new Fiber for the updated node
            let child_fiber = if has_same_type {
                let mut child_fiber = Fiber::new(&old_child_fiber.as_ref().unwrap().borrow().element_type());
                // TODO: move the props to the fiber since keeping child_element wont be necessary (Option::take)
                child_fiber.set_props(Rc::clone(&child_element.props));

                if let Some(old_child) = &old_child_fiber {
                    // relate to alternate
                    child_fiber.set_alternate(Rc::clone(&old_child));

                    // set existing dom node
                    if let Some(old_child_node) = old_child.borrow().dom_node() {
                        child_fiber.set_dom_node(Rc::clone(old_child_node));
                    }
                }

                // relate to parent (current fiber)
                child_fiber.set_parent(Rc::clone(wip_unit));

                // effect
                child_fiber.set_effect(FiberEffect::Update);

                child_fiber
            } else {
                let mut child_fiber = Fiber::new(&child_element.element_type);
                child_fiber.set_props(Rc::clone(&child_element.props));

                // relate to parent (current fiber)
                child_fiber.set_parent(Rc::clone(wip_unit));

                // effect
                child_fiber.set_effect(FiberEffect::Placement);

                child_fiber
            };

            if old_child_fiber.is_some() && !has_same_type {
                old_child_fiber.as_ref().unwrap().borrow_mut().set_effect(FiberEffect::Deletion);
                // TODO: PUSH OLD CHILD FIBER TO DELETION ARRAY
            }

            if old_child_fiber.is_some() {
                let old_child_sibling = {
                    let old_child = old_child_fiber.as_ref().unwrap().borrow();
                    let sibling = old_child.sibling().as_ref().unwrap();
                    Rc::clone(sibling)
                };

                old_child_fiber = Some(old_child_sibling);
            }

            let child_fiber = Rc::new(RefCell::new(Box::new(child_fiber)));

            if i == 0 {
                first_child_fiber = Some(Rc::clone(&child_fiber));
            } else {
                if let Some(previous_sibling) = previous_sibling {
                    previous_sibling.borrow_mut().set_sibling(Rc::clone(&child_fiber));
                }
            }
            
            previous_sibling = Some(Rc::clone(&child_fiber));
            i += 1;

        }

        if let Some(child) = first_child_fiber {
            fiber.set_child(child);
        }
    }
}

#[wasm_bindgen]
pub fn get_context() -> Context {
    Context::new()
}

#[wasm_bindgen]
pub fn render(js_context: JsValue, js_element: JsValue, container: HTMLElement) -> Context {
    let element = Element::from_js_value(&js_element).unwrap();
    let mut context = Context::from_js_value(&js_context).unwrap();

    // Create the Root fiber
    let mut root = Fiber::new_root();
    
    // The root element will be the Root fiber's only child
    root.set_element_children(vec![Rc::new(RefCell::new(element))]);

    // Store the container HTML element
    root.set_dom_node(Rc::new(RefCell::new(Node::Element(container))));

    // Make it the Work in Progress Root and the Next Unit of Work
    let root = Rc::new(RefCell::new(Box::new(root)));
    context.wip_root = Some(Rc::clone(&root));
    context.next_unit_of_work = Some(Rc::clone(&root));

    context
}


#[wasm_bindgen]
pub fn work_loop(context_js: JsValue, did_timeout: bool) -> Context {
    console_error_panic_hook::set_once();
    let mut context = Context::from_js_value(&context_js).unwrap();

    context.work_loop(did_timeout);

    context
}
