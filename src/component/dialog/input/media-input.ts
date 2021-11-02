import { DialogInputData } from '../dialog.js';
import { BaseComponent } from './../../component.js';

export class MediaInput
  extends BaseComponent<HTMLElement>
  implements DialogInputData
{
  constructor(private mediaType: string) {
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
  }

  get title(): string {
    const title = this.element.querySelector('#title')! as HTMLInputElement;
    return title.value;
  }

  get value(): string {
    const url = this.element.querySelector('#url')! as HTMLInputElement;
    return url.value;
  }

  get type(): string {
    return this.mediaType;
  }
}
