import { BaseComponent, Component } from './../component.js';

export interface Composable {
  addChild(item: Component): void;
}

type CloseListener = () => void;

interface ItemContainer extends Component, Composable {
  setOnListener(listener: CloseListener): void;
}

type ItemContainerConstructor = {
  new (): ItemContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements ItemContainer
{
  private onCloseListener?: CloseListener;
  constructor() {
    super(`
			<li class="page-item">
				<div class="page-item__contents"></div>
				<div class="page-item__controls">
					<button class="close">
						<i class="fas fa-times"></i>
					</button>
				</div>
			</li>
		`);

    const closeButton = this.element.querySelector(
      '.close'
    )! as HTMLButtonElement;

    closeButton.addEventListener('click', () => {
      this.onCloseListener && this.onCloseListener();
    });
  }

  addChild(item: Component) {
    const contents = this.element.querySelector(
      '.page-item__contents'
    )! as HTMLElement;
    item.attatchTo(contents);
  }

  setOnListener(listener: CloseListener) {
    this.onCloseListener = listener;
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor(private pageItemConstructor: ItemContainerConstructor) {
    super(`
			<ul class="page">
			</ul>
		`);
  }

  addChild(item: Component) {
    const pageItem = new this.pageItemConstructor();
    pageItem.addChild(item);
    pageItem.attatchTo(this.element, 'beforeend');
    pageItem.setOnListener(() => {
      pageItem.removeFrom(this.element);
    });
  }
}
