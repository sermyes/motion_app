import { Composable } from './../page/page.js';
import { BaseComponent, Component } from './../component.js';

type CloseListener = () => void;
type AddListener = () => void;

export class Dialog extends BaseComponent<HTMLElement> implements Composable {
  private onCloseListener?: CloseListener;
  private onAddListener?: AddListener;

  constructor() {
    super(`
			<section class="dialog">
				<div class="dialog__container">
					<button class="dialog__close">
						<i class="fas fa-times"></i>
					</button>
					<div class="dialog__contents"></div>
					<button class="dialog__add">Add</button>
				</div>
			</section>
		`);

    const closeBtn = this.element.querySelector(
      '.dialog__close'
    )! as HTMLButtonElement;
    const addBtn = this.element.querySelector(
      '.dialog__add'
    )! as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
      this.onCloseListener && this.onCloseListener();
    });

    addBtn.addEventListener('click', () => {
      this.onAddListener && this.onAddListener();
    });
  }

  setOnCloseListener(listener: CloseListener) {
    this.onCloseListener = listener;
  }

  setOnAddListener(listener: AddListener) {
    this.onAddListener = listener;
  }

  addChild(item: Component) {
    const contentsContainer = this.element.querySelector(
      '.dialog__contents'
    )! as HTMLElement;
    item.attatchTo(contentsContainer);
  }
}
