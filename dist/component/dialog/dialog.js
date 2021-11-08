import { BaseComponent } from './../component.js';
export class Dialog extends BaseComponent {
    constructor(color) {
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
        this.color = color;
        const dialogContainer = this.element.querySelector('.dialog__container');
        if (this.color) {
            dialogContainer.style.background = this.color;
        }
        const closeBtn = this.element.querySelector('.dialog__close');
        const addBtn = this.element.querySelector('.dialog__add');
        closeBtn.addEventListener('click', () => {
            this.onCloseListener && this.onCloseListener();
        });
        addBtn.addEventListener('click', () => {
            this.onAddListener && this.onAddListener();
        });
    }
    setOnCloseListener(listener) {
        this.onCloseListener = listener;
    }
    setOnAddListener(listener) {
        this.onAddListener = listener;
    }
    addChild(item) {
        const contentsContainer = this.element.querySelector('.dialog__contents');
        item.attatchTo(contentsContainer);
    }
}
