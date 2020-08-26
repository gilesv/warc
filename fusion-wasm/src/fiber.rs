use std::cell::RefCell;
use std::rc::Rc;
use super::{Element, ElementProps, Node, TEXT_ELEMENT};

static ROOT_FIBER: &str = "_R_";
static FUNCTIONAL: &str = "_F_";

pub type FiberCell = Rc<RefCell<Box<Fiber>>>;

pub struct Fiber {
    _type: String,
    props: Option<Rc<RefCell<ElementProps>>>,
    element_children: Option<Vec<Rc<RefCell<Element>>>>,
    dom_node: Option<Rc<RefCell<Node>>>,
    alternate: Option<FiberCell>,
    parent: Option<FiberCell>,
    sibling: Option<FiberCell>,
    child: Option<FiberCell>,
    effect: Option<FiberEffect>,
}

impl Fiber {
    pub fn new(_type: &str) -> Self {
        Fiber {
            _type: String::from(_type),
            props: None,
            element_children: None,
            dom_node: None,
            alternate: None,
            parent: None,
            sibling: None,
            child: None,
            effect: None
        }
    }

    pub fn new_root() -> Self {
        Self::new(ROOT_FIBER)
    }

    pub fn element_type(&self) -> &String {
        &self._type
    }

    pub fn is_functional_tree(&self) -> bool {
        &self._type == FUNCTIONAL
    }

    pub fn is_text_fiber(&self) -> bool {
        &self._type == TEXT_ELEMENT
    }

    pub fn is_root_fiber(&self) -> bool {
        &self._type == ROOT_FIBER
    }

    pub fn dom_node(&self) -> &Option<Rc<RefCell<Node>>> {
        &self.dom_node
    }

    pub fn set_dom_node(&mut self, dom_node: Rc<RefCell<Node>>) {
        self.dom_node.replace(dom_node);
    }

    pub fn child(&self) -> &Option<FiberCell> {
        &self.child
    }

    pub fn child_mut(&mut self) -> &mut Option<FiberCell> {
        &mut self.child
    }

    pub fn set_child(&mut self, child: FiberCell) {
        self.child.replace(child);
    }

    pub fn props(&self) -> &Option<Rc<RefCell<ElementProps>>> {
        &self.props
    }

    pub fn set_props(&mut self, props: Rc<RefCell<ElementProps>>) {
        self.props.replace(props);
    }

    pub fn parent(&self) -> &Option<FiberCell> {
        &self.parent
    }

    pub fn set_parent(&mut self, parent: FiberCell) {
        self.parent.replace(parent);
    }

    pub fn sibling(&self) -> &Option<FiberCell> {
        &self.sibling
    }

    pub fn set_sibling(&mut self, sibling: FiberCell) {
        self.sibling.replace(sibling);
    }

    pub fn alternate(&self) -> &Option<FiberCell> {
        &self.alternate
    }

    pub fn set_alternate(&mut self, alternate: FiberCell) {
        self.alternate.replace(alternate);
    }

    pub fn element_children(&self) -> &Option<Vec<Rc<RefCell<Element>>>> {
        &self.element_children
    }

    pub fn set_element_children(&mut self, children: Vec<Rc<RefCell<Element>>>) {
        self.element_children.replace(children);
    }

    pub fn effect(&self) -> &Option<FiberEffect> {
        &self.effect
    }

    pub fn set_effect(&mut self, effect: FiberEffect) {
        self.effect.replace(effect);
    }

    pub fn parents(&self) -> FiberParentsIter {
        FiberParentsIter {
            next: self.parent.as_ref().map(|parent| { parent })
        }
    }
}

pub struct FiberParentsIter<'fiber> {
    next: Option<&'fiber FiberCell>,
}

impl<'fiber> Iterator for FiberParentsIter<'fiber> {
    type Item = &'fiber FiberCell;

    fn next(&mut self) -> Option<Self::Item> {
        self.next.map_or(None, |parent| { Some(parent) })
    }
}

pub enum FiberEffect {
    Placement,
    Update,
    Deletion,
}