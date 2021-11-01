import { TextInput } from './component/dialog/input/text-input.js';
import { Dialog } from './component/dialog/dialog.js';
import { Component } from './component/component.js';
import { VideoComponent } from './component/page/item/video.js';
import { TodoComponent } from './component/page/item/todo.js';
import { MemoComponent } from './component/page/item/memo.js';
import { ImageComponent } from './component/page/item/image.js';
import {
  Composable,
  PageComponent,
  PageItemComponent
} from './component/page/page.js';
import {
  DialogInput,
  MediaInput
} from './component/dialog/input/media-input.js';

class App {
  private page: Component & Composable;

  constructor(private appRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attatchTo(this.appRoot);

    const dialogBtn = document.querySelector(
      '.create-button'
    )! as HTMLButtonElement;
    dialogBtn.addEventListener('click', () => {
      const select = document.querySelector(
        '.select-panel'
      )! as HTMLSelectElement;
      const input = this.makeDialogInput(select.value);

      const dialog = new Dialog();
      dialog.addChild(input);
      dialog.attatchTo(document.body);

      dialog.setOnAddListener(() => {
        const pageItem = this.makePageComponent(input);
        this.page.addChild(pageItem);
        dialog.removeFrom(document.body);
        // https://www.youtube.com/embed/1OdkTgq-f5c
        // https://picsum.photos/300
      });

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(document.body);
      });
    });
  }

  private makeDialogInput(value: string): DialogInput {
    switch (value) {
      case 'image':
        return new MediaInput('image');
      case 'video':
        return new MediaInput('video');
      case 'memo':
        return new TextInput('memo');
      case 'todo':
        return new TextInput('todo');
      default:
        throw new Error('undefined select value.');
    }
  }

  private makePageComponent(input: DialogInput): Component {
    switch (input.type) {
      case 'image':
        return new ImageComponent(input.title, input.value);
      case 'video':
        return new VideoComponent(input.title, input.value);
      case 'memo':
        return new MemoComponent(input.title, input.value);
      case 'todo':
        return new TodoComponent(input.title, input.value);
      default:
        throw new Error('undefined content type.');
    }
  }
}

new App(document.querySelector('.document')! as HTMLElement);
