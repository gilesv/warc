use std::cell::RefCell;
use std::rc::Rc;
use super::{Element, ElementProps, Node, TEXT_ELEMENT, FIBER_ROOT, FIBER_FUNCTIONAL};

pub type FiberCell = Rc<RefCell<Box<Fiber>>>;

pub struct Fiber {
    _type: String,
    props: Option<ElementProps>,
    element_children: Option<Rc<RefCell<Vec<Element>>>>,
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
        Self::new(FIBER_ROOT)
    }

    pub fn element_type(&self) -> &String {
        &self._type
    }

    pub fn is_functional_tree(&self) -> bool {
        &self._type == FIBER_FUNCTIONAL
    }

    pub fn is_text_fiber(&self) -> bool {
        &self._type == TEXT_ELEMENT
    }

    pub fn is_root_fiber(&self) -> bool {
        &self._type == FIBER_ROOT
    }

    pub fn dom_node(&self) -> Option<&Rc<RefCell<Node>>> {
        self.dom_node.as_ref()
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

    pub fn props(&self) -> Option<&ElementProps> {
        self.props.as_ref()
    }

    pub fn set_props(&mut self, props: Option<ElementProps>) {
        self.props = props;
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

    pub fn alternate(&self) -> Option<&FiberCell> {
        self.alternate.as_ref()
    }

    pub fn set_alternate(&mut self, alternate: FiberCell) {
        self.alternate.replace(alternate);
    }

    pub fn element_children(&self) -> &Option<Rc<RefCell<Vec<Element>>>> {
        &self.element_children
    }

    pub fn set_element_children(&mut self, children: Option<Rc<RefCell<Vec<Element>>>>) {
        self.element_children = children;
    }

    pub fn effect(&self) -> &Option<FiberEffect> {
        &self.effect
    }

    pub fn set_effect(&mut self, effect: FiberEffect) {
        self.effect.replace(effect);
    }
}

pub trait FiberParentIterator {
    fn parents(&self) -> FiberParentsIter;
}

impl FiberParentIterator for FiberCell {
    fn parents(&self) -> FiberParentsIter {
        FiberParentsIter {
            next: Some(Rc::clone(self)),
        }
    }
}

pub struct FiberParentsIter {
    next: Option<FiberCell>,
}

impl Iterator for FiberParentsIter {
    type Item = FiberCell;

    fn next(&mut self) -> Option<Self::Item> {
        let mut next = None;
        let result = if let Some(fiber) = self.next.as_ref() {
            if let Some(parent) = fiber.borrow().parent().as_ref() {
                next = Some(Rc::clone(parent));
                Some(Rc::clone(parent))
            } else { None }
        } else { None };

        self.next = next;
        return result;
    }
}

#[derive(Debug)]
pub enum FiberEffect {
    Placement,
    Update,
    Deletion,
}