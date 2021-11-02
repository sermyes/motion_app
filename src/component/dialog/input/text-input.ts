import { DialogInputData } from '../dialog.js';
import { BaseComponent } from './../../component.js';

export class TextInput
  extends BaseComponent<HTMLElement>
  implements DialogInputData
{
  constructor(private textType: string) {
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
  }

  get title(): string {
    const title = this.element.querySelector('#title')! as HTMLInputElement;
    return title.value;
  }

  get value(): string {
    const body = this.element.querySelector('#body')! as HTMLInputElement;
    return body.value;
  }

  get type(): string {
    return this.textType;
  }
}
