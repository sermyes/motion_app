import { BaseComponent } from './../../component.js';
export class MediaInput extends BaseComponent {
    constructor(mediaType) {
        super(`
			<div class="form__container">
				<div class="form__title">
					<label for="title">Title</label>
					<input type="text" id="title" />
				</div>
				<div class="form__contents">
					<label for="url">Url</label>
					<input type="url" id="url" />
				</div>
			</div>
		`);
        this.mediaType = mediaType;
    }
    get title() {
        const title = this.element.querySelector('#title');
        return title.value;
    }
    get value() {
        const url = this.element.querySelector('#url');
        return url.value;
    }
    get type() {
        return this.mediaType;
    }
}
