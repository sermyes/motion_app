import { BaseComponent, Component } from './../component.js';

export interface Composable {
  addChild(item: Component): void;
}

export interface Draggable {
  draggable(): void;
}

type DraggableState = 'on' | 'off';
type DragListener = (state: DragState, item: ItemContainer) => void;
type DragState = 'start' | 'end' | 'enter' | 'leave';
type CloseListener = () => void;

interface ItemContainer extends Component, Composable, Draggable {
  setOnListener(listener: CloseListener): void;
  setOnDragListener(listener: DragListener): void;
  getBoundingRect(): DOMRect;
  muteChildren(state: 'mute' | 'unmute'): void;
  onDropped(): void;
}

type ItemContainerConstructor = {
  new (): ItemContainer;
};

export class PageItemComponent
  extends BaseComponent<HTMLElement>
  implements ItemContainer, Draggable
{
  private onCloseListener?: CloseListener;
  private onDragListener?: DragListener;

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

  draggable() {
    const pageItem = this.element! as HTMLUListElement;
    pageItem.draggable = true;

    this.element.addEventListener('dragstart', () => {
      this.onDragStart();
    });

    this.element.addEventListener('dragend', () => {
      this.onDragEnd();
    });

    this.element.addEventListener('dragenter', () => {
      this.onDragEnter();
    });

    this.element.addEventListener('dragleave', () => {
      this.onDragLeave();
    });
  }

  onDragStart() {
    this.onDrag('start');
    this.element.classList.add('lifted');
  }

  onDragEnd() {
    this.onDrag('end');
    this.element.classList.remove('lifted');
  }

  onDragEnter() {
    this.onDrag('enter');
    this.element.classList.add('target');
  }

  onDragLeave() {
    this.onDrag('leave');
    this.element.classList.remove('target');
  }

  onDropped() {
    this.element.classList.remove('target');
  }

  setOnDragListener(listener: DragListener) {
    this.onDragListener = listener;
  }

  onDrag(state: DragState) {
    this.onDragListener && this.onDragListener(state, this);
  }

  getBoundingRect(): DOMRect {
    return this.element.getBoundingClientRect();
  }

  muteChildren(state: 'mute' | 'unmute') {
    if (state === 'mute') {
      this.element.classList.add('mute-children');
    } else {
      this.element.classList.remove('mute-children');
    }
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable, Draggable
{
  private draggableFlag: DraggableState = 'off';
  private dragTarget?: ItemContainer;
  private dropTarget?: ItemContainer;
  private children = new Set<ItemContainer>();

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
      this.children.delete(pageItem);
    });

    if (this.draggableFlag === 'on') {
      pageItem.draggable();
      this.children.add(pageItem);
      pageItem.setOnDragListener((state: DragState, target: ItemContainer) => {
        switch (state) {
          case 'start':
            this.dragTarget = target;
            this.muteItems('mute');
            break;
          case 'end':
            this.dragTarget = undefined;
            this.muteItems('unmute');
            break;
          case 'enter':
            this.dropTarget = target;
            break;
          case 'leave':
            this.dropTarget = undefined;
            break;
          default:
            throw new Error('undefined state');
        }
      });
    }
  }

  private muteItems(state: 'mute' | 'unmute') {
    this.children.forEach((item: ItemContainer) => {
      item.muteChildren(state);
    });
  }

  draggable() {
    this.draggableFlag = 'on';

    this.element.addEventListener('dragover', (e) => {
      this.onDragOver(e);
    });

    this.element.addEventListener('drop', (e) => {
      this.onDragDrop(e);
    });
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  onDragDrop(e: DragEvent) {
    e.preventDefault();
    console.log(this.dragTarget, this.dropTarget);
    if (!this.dropTarget) {
      return;
    }

    if (this.dragTarget && this.dragTarget !== this.dropTarget) {
      const start = this.dragTarget.getBoundingRect();
      const endY = e.clientY;
      this.dragTarget.removeFrom(this.element);

      this.dropTarget.attatch(
        this.dragTarget,
        start.y > endY ? 'beforebegin' : 'afterend'
      );
    }
    this.dropTarget.onDropped();
  }
}
