import { createElement } from "./element.util.js";
import { createDomNode, updateDomNode } from "./dom.util.js";
;
let Fusion = (function () {
    // Work
    let _wipRoot = null;
    let _currentRoot = null;
    let _nextUnitOfWork = null;
    let _wipFunctionalFiber = null;
    let _hookIndex = 0;
    let _deletions = [];
    // Hooks
    function useState(initialValue) {
        let fiber = _wipFunctionalFiber;
        let fiberHookIndex = _hookIndex;
        // Get the state from previous hook or take initVal
        let oldFiberHooks = fiber.alternate?.hooks || [];
        if (!fiber.hooks) {
            fiber.hooks = [];
        }
        let currentState = oldFiberHooks
            ? oldFiberHooks[_hookIndex]?.state || initialValue
            : initialValue;
        fiber.hooks[_hookIndex] = {
            type: "STATE",
            state: currentState,
        };
        let setState = (newState) => {
            fiber.hooks[fiberHookIndex].state = newState;
            // Why the root?
            _wipRoot = {
                type: "FIBER_ROOT",
                domNode: _currentRoot?.domNode || null,
                props: _currentRoot?.props || { children: [] },
                alternate: _currentRoot,
                parent: null,
                child: null,
                sibling: null,
                effect: null,
                hooks: [],
            };
            _nextUnitOfWork = _wipRoot;
            _deletions = [];
        };
        let state = fiber.hooks[_hookIndex].state;
        _hookIndex++;
        return [state, setState];
    }
    function useEffect(callback, deps = []) {
        let fiber = _wipFunctionalFiber;
        let oldFiberHooks = fiber.alternate?.hooks || [];
        if (!fiber.hooks) {
            fiber.hooks = [];
        }
        let hasDeps = deps.length > 0;
        let oldDeps = oldFiberHooks
            ? oldFiberHooks[_hookIndex]?.deps : [];
        fiber.hooks[_hookIndex] = {
            type: "EFFECT",
            deps,
        };
        let anyDepHasChanged = oldDeps
            ? deps.some((dep, i) => !Object.is(dep, oldDeps[i]))
            : false;
        if (!hasDeps || anyDepHasChanged) {
            callback();
        }
        fiber.hooks[_hookIndex].deps = deps;
        _hookIndex++;
    }
    function render(element, container) {
        // set the fiber to work on
        _wipRoot = {
            type: "FIBER_ROOT",
            domNode: container,
            props: {
                children: [element]
            },
            alternate: _currentRoot,
            parent: null,
            child: null,
            sibling: null,
            effect: null,
            hooks: [],
        };
        _deletions = [];
        _nextUnitOfWork = _wipRoot;
        window.requestIdleCallback(workLoop);
    }
    // Work
    function workLoop(deadline) {
        let hasNextUnitOfWork = !!_nextUnitOfWork;
        while (!deadline.didTimeout && hasNextUnitOfWork) {
            _nextUnitOfWork = performUnitOfWork(_nextUnitOfWork);
            hasNextUnitOfWork = !!_nextUnitOfWork;
        }
        if (!hasNextUnitOfWork && _wipRoot) {
            commitRoot();
        }
        window.requestIdleCallback(workLoop);
    }
    function performUnitOfWork(fiber) {
        let isFunctionComponent = fiber.type instanceof Function;
        if (isFunctionComponent) {
            updateFunctionalTree(fiber);
        }
        else {
            updateRegularTree(fiber);
        }
        // TODO: find next unitOfWOrk
        if (fiber.child) {
            return fiber.child;
        }
        let nextFiber = fiber;
        while (nextFiber) {
            if (nextFiber.sibling) {
                return nextFiber.sibling;
            }
            nextFiber = nextFiber.parent;
        }
        return null;
    }
    function updateFunctionalTree(fiber) {
        // Reset hooks
        _hookIndex = 0;
        _wipFunctionalFiber = fiber;
        _wipFunctionalFiber.hooks = [];
        let Component = fiber.type;
        let children = [Component(fiber.props)].flat();
        reconcileChildren(fiber, children);
    }
    function updateRegularTree(fiber) {
        if (!fiber.domNode) {
            fiber.domNode = createDomNode(fiber);
        }
        reconcileChildren(fiber, fiber.props.children);
    }
    function reconcileChildren(currentFiber, children) {
        let i = 0;
        let previousSibling = null;
        let oldChildFiber = currentFiber.alternate?.child;
        // parent: A                              <~ Element
        // children: [ a, b, c ]                  <~ Elements
        //
        // currentFiber(A)                        <~ Fiber (_wipFiber)
        //    |
        // child(a) -- sibling(b) -- sibling(c)   <~ Fibers
        //  [i]          [i+1]         [i+2]
        while (i < children.length || oldChildFiber) {
            let newChildElement = children[i];
            let newChildFiber = null;
            let hasSameType = oldChildFiber?.type === newChildElement?.type;
            if (hasSameType) {
                // Update fiber
                newChildFiber = {
                    type: oldChildFiber?.type,
                    props: newChildElement.props,
                    domNode: oldChildFiber?.domNode || null,
                    parent: currentFiber,
                    alternate: oldChildFiber,
                    effect: "UPDATE",
                    child: null,
                    sibling: null,
                    hooks: [],
                };
            }
            if (newChildElement && !hasSameType) {
                // Add new fiber
                newChildFiber = {
                    type: newChildElement.type,
                    props: newChildElement.props,
                    domNode: null,
                    parent: currentFiber,
                    alternate: null,
                    effect: "PLACEMENT",
                    child: null,
                    sibling: null,
                    hooks: [],
                };
            }
            if (oldChildFiber && !hasSameType) {
                // Delete olderFiber node
                oldChildFiber.effect = "DELETION";
                _deletions.push(oldChildFiber);
            }
            if (oldChildFiber) {
                oldChildFiber = oldChildFiber.sibling;
            }
            // Set it as a child or sibling of existing fiber
            if (i === 0) {
                currentFiber.child = newChildFiber;
            }
            else {
                previousSibling.sibling = newChildFiber;
            }
            previousSibling = newChildFiber;
            i++;
        }
    }
    // Commit
    function commitWork(fiber) {
        if (!fiber) {
            return;
        }
        let findParentDomNode = (fiber) => {
            let domParentFiber = fiber.parent;
            while (!domParentFiber?.domNode) {
                domParentFiber = domParentFiber.parent;
            }
            return domParentFiber.domNode;
        };
        let parentDom = findParentDomNode(fiber);
        switch (fiber.effect) {
            case "PLACEMENT":
                if (fiber.domNode !== null) {
                    // parentDom.appendChild(fiber.domNode as Node);
                    commitNodeAppend(fiber, parentDom);
                }
                break;
            case "UPDATE":
                if (fiber.domNode !== null) {
                    updateDomNode(fiber.domNode, fiber.alternate?.props, fiber.props);
                }
                break;
            case "DELETION":
                commitNodeDeletion(fiber, parentDom);
                return;
        }
        commitWork(fiber.child);
        commitWork(fiber.sibling);
    }
    function commitNodeAppend(fiber, parentDomNode) {
        parentDomNode.appendChild(fiber.domNode);
    }
    function commitNodeDeletion(fiber, parentDomNode) {
        if (fiber.domNode) {
            parentDomNode.removeChild(fiber.domNode);
        }
        else if (fiber.child) {
            commitNodeDeletion(fiber.child, parentDomNode);
        }
    }
    function commitRoot() {
        _deletions.forEach(commitWork);
        commitWork(_wipRoot.child);
        _currentRoot = _wipRoot;
        _wipRoot = null;
    }
    return {
        useState,
        useEffect,
        render,
        createElement,
    };
})();
export default Fusion;
