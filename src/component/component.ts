export interface Component {
  attatchTo(parent: HTMLElement, position?: InsertPosition): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlStr: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlStr;
    this.element = template.content.firstElementChild! as T;
  }

  attatchTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}
