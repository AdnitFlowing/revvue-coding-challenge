import "@testing-library/jest-dom";

// Mock IntersectionObserver for testing
global.IntersectionObserver = class IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = "0px";
  thresholds: ReadonlyArray<number> = [0];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.options = options;
    this.root = (options?.root as Element) ?? null;
    this.rootMargin = options?.rootMargin ?? "0px";
    this.thresholds = options?.threshold ? [options.threshold].flat() : [0];
  }

  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;

  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
};

// Mock ResizeObserver for testing
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

// Mock scrollIntoView
Object.defineProperty(Element.prototype, "scrollIntoView", {
  value: () => {},
  writable: true,
});
