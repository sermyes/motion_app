import { BaseComponent } from './../component.js';
export class PageItemComponent extends BaseComponent {
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
        const closeButton = this.element.querySelector('.close');
        closeButton.addEventListener('click', () => {
            this.onCloseListener && this.onCloseListener();
        });
    }
    addChild(item) {
        const contents = this.element.querySelector('.page-item__contents');
        item.attatchTo(contents);
    }
    setOnListener(listener) {
        this.onCloseListener = listener;
    }
    draggable() {
        const pageItem = this.element;
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
    setOnDragListener(listener) {
        this.onDragListener = listener;
    }
    onDrag(state) {
        this.onDragListener && this.onDragListener(state, this);
    }
    getBoundingRect() {
        return this.element.getBoundingClientRect();
    }
    muteChildren(state) {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        }
        else {
            this.element.classList.remove('mute-children');
        }
    }
}
export class PageComponent extends BaseComponent {
    constructor(pageItemConstructor) {
        super(`
			<ul class="page">
			</ul>
		`);
        this.pageItemConstructor = pageItemConstructor;
        this.draggableFlag = 'off';
        this.children = new Set();
    }
    addChild(item) {
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
            pageItem.setOnDragListener((state, target) => {
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
    muteItems(state) {
        this.children.forEach((item) => {
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
    onDragOver(e) {
        e.preventDefault();
    }
    onDragDrop(e) {
        e.preventDefault();
        console.log(this.dragTarget, this.dropTarget);
        if (!this.dropTarget) {
            return;
        }
        if (this.dragTarget && this.dragTarget !== this.dropTarget) {
            const start = this.dragTarget.getBoundingRect();
            const endY = e.clientY;
            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attatch(this.dragTarget, start.y > endY ? 'beforebegin' : 'afterend');
        }
        this.dropTarget.onDropped();
    }
}
