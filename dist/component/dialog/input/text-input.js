import { BaseComponent } from './../../component.js';
export class TextInput extends BaseComponent {
    constructor(textType) {
        super(`
			<div class="form__container">
				<div class="form__title">
					<label for="title">Title</label>
					<input type="text" id="title" />
				</div>
				<div class="form__contents">
					<label for="body">Body</label>
					<textarea id="body"></textarea>
				</div>
			</div>
		`);
        this.textType = textType;
    }
    get title() {
        const title = this.element.querySelector('#title');
        return title.value;
    }
    get value() {
        const body = this.element.querySelector('#body');
        return body.value;
    }
    get type() {
        return this.textType;
    }
}
