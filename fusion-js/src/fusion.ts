import { createElement } from "./element.util.js";
import { createDomNode, updateDomNode } from "./dom.util.js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [key: string]: any
    }
  }

  type RequestIdleCallbackHandle = any;
  type RequestIdleCallbackOptions = {
    timeout: number;
  };
  type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: (() => number);
  };

  interface Window {
    requestIdleCallback: ((
      callback: ((deadline: RequestIdleCallbackDeadline) => void),
      opts?: RequestIdleCallbackOptions,
    ) => RequestIdleCallbackHandle);
    cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
  }
}

type DomNode = HTMLElement | Text;

interface Element {
  type: string,
  props: {
    [key: string]: any,
    children: Element[]
  }
}

type EffectTag = "PLACEMENT" | "UPDATE" | "DELETION" | null;

export interface Fiber {
  type: string | Function,
  props: {
    [key: string]: any,
    children: Element[]
  }
  domNode: DomNode | null,
  alternate: Fiber | null,
  parent: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  effect: EffectTag,
  hooks: any[],
};

let Fusion = (function() {
  // Work
  let _wipRoot: Fiber|null = null;
  let _currentRoot: Fiber|null = null;
  let _nextUnitOfWork: Fiber|null = null;
  let _wipFunctionalFiber: Fiber|null = null;
  let _hookIndex: number = 0;
  let _deletions: any[] = [];

  // Hooks
  function useState(initialValue: any) {
    let fiber = _wipFunctionalFiber!;
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

    let setState = (newState: any) => {
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
      }

      _nextUnitOfWork = _wipRoot;
      _deletions = [];
    };

    let state = fiber.hooks[_hookIndex].state;
    _hookIndex++;

    return [state, setState];
  }

  function useEffect(callback: Function, deps: any[] = []) {
    let fiber = _wipFunctionalFiber!;
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

  function render(element: Element, container: HTMLElement) {
    // set the fiber to work on
    _wipRoot = {
      type: "FIBER_ROOT",
      domNode: container,
      props: {
        children: [ element ]
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
  function workLoop(deadline: RequestIdleCallbackDeadline) {
    let hasNextUnitOfWork = !!_nextUnitOfWork;

    while (!deadline.didTimeout && hasNextUnitOfWork) {
      _nextUnitOfWork = performUnitOfWork(_nextUnitOfWork!);
      hasNextUnitOfWork = !!_nextUnitOfWork;
    }

    if (!hasNextUnitOfWork && _wipRoot) {
      commitRoot();
    }

    window.requestIdleCallback(workLoop);
  }

  function performUnitOfWork(fiber: Fiber): Fiber | null {
    let isFunctionComponent = fiber.type instanceof Function;

    if (isFunctionComponent) {
      updateFunctionalTree(fiber);
    } else {
      updateRegularTree(fiber);
    }

    // TODO: find next unitOfWOrk
    if (fiber.child) {
      return fiber.child;
    }

    let nextFiber: Fiber | null | undefined = fiber;

    while (nextFiber) {
      if (nextFiber.sibling) {
        return nextFiber.sibling;
      }
      nextFiber = nextFiber.parent;
    }

    return null;
  }

  function updateFunctionalTree(fiber: Fiber) {
    // Reset hooks
    _hookIndex = 0;
    _wipFunctionalFiber = fiber;
    _wipFunctionalFiber.hooks = [];

    let Component = fiber.type as Function;
    let children = [Component(fiber.props)].flat();

    reconcileChildren(fiber, children);
  }

  function updateRegularTree(fiber: Fiber) {
    if (!fiber.domNode) {
      fiber.domNode = createDomNode(fiber);
    }

    reconcileChildren(fiber, fiber.props.children);
  }

  function reconcileChildren(currentFiber: Fiber, children: Element[]) {
    let i = 0;
    let previousSibling: Fiber | null = null;
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
      let newChildFiber: Fiber | null = null;

      let hasSameType = oldChildFiber?.type === newChildElement?.type;
      
      if (hasSameType) {
        // Update fiber
        newChildFiber = {
          type: oldChildFiber?.type as string,
          props: newChildElement.props,
          domNode: oldChildFiber?.domNode || null,
          parent: currentFiber,
          alternate: oldChildFiber!,
          effect: "UPDATE",
          child: null,
          sibling: null,
          hooks: [],
        }
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
        }
      }

      if (oldChildFiber && !hasSameType) {
        // Delete olderFiber node
        oldChildFiber.effect = "DELETION";
        _deletions.push(oldChildFiber);
      }

      if (oldChildFiber) {
        oldChildFiber = oldChildFiber.sibling
      }

      // Set it as a child or sibling of existing fiber
      if (i === 0) {
        currentFiber.child = newChildFiber;
      } else {
        previousSibling!.sibling = newChildFiber;
      }

      previousSibling = newChildFiber;
      i++;
    }
  }

  // Commit
  function commitWork(fiber: Fiber | null | undefined) {
    if (!fiber) {
      return;
    }

    let findParentDomNode = (fiber: Fiber) => {
      let domParentFiber = fiber.parent;

      while (!domParentFiber?.domNode) {
        domParentFiber = domParentFiber!.parent;
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
          updateDomNode(
            fiber.domNode as DomNode,
            fiber.alternate?.props,
            fiber.props
          );
        }
        break;

      case "DELETION":
        commitNodeDeletion(fiber, parentDom);
        return;
    }

    commitWork(fiber.child);
    commitWork(fiber.sibling);
  }

  function commitNodeAppend(fiber: Fiber, parentDomNode: DomNode) {
    parentDomNode.appendChild(fiber.domNode as Node);
  }

  function commitNodeDeletion(fiber: Fiber, parentDomNode: DomNode) {
    if (fiber.domNode) {
      parentDomNode.removeChild(fiber.domNode as Node);
    } else if (fiber.child) {
      commitNodeDeletion(fiber.child as Fiber, parentDomNode);
    }
  }

  function commitRoot() {
    _deletions.forEach(commitWork);

    commitWork(_wipRoot!.child);
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
