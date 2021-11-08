import { BaseComponent } from './../../component';
export class Input extends BaseComponent {
    constructor() {
        super(`
			<div class="form__container">
				<div class="form__title">
					<label for="title">Title</label>
					<input type="text" id="title" />
				</div>
				<div class="form__contents">
				</div>
			</div>
		`);
    }
    addChild(item) {
        const contents = this.element.querySelector('.form__contents');
        item.attatchTo(contents);
    }
}
