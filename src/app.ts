import { TextInput } from './component/dialog/input/text-input.js';
import { Dialog, DialogInputData } from './component/dialog/dialog.js';
import { Component } from './component/component.js';
import { VideoComponent } from './component/page/item/video.js';
import { TodoComponent } from './component/page/item/todo.js';
import { MemoComponent } from './component/page/item/memo.js';
import { ImageComponent } from './component/page/item/image.js';
import {
  Composable,
  Draggable,
  PageComponent,
  PageItemComponent
} from './component/page/page.js';
import { MediaInput } from './component/dialog/input/media-input.js';

type themeColor = 'dark' | 'light';

class App {
  private page: Component & Composable & Draggable;
  private theme: themeColor;

  constructor(private appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attatchTo(this.appRoot);
    this.page.draggable();

    this.theme = 'dark';
    this.bindElementToDialog();
    this.changeTheme();
  }

  private bindElementToDialog() {
    const dialogBtn = document.querySelector(
      '.create-button'
    )! as HTMLButtonElement;
    dialogBtn.addEventListener('click', () => {
      const select = document.querySelector(
        '.select-panel'
      )! as HTMLSelectElement;
      const input = this.makeDialogInput(select.value);

      const themeColor = this.theme !== 'dark' ? '#fff' : undefined;
      const dialog = new Dialog(themeColor);
      dialog.addChild(input);
      dialog.attatchTo(this.dialogRoot);

      dialog.setOnAddListener(() => {
        const pageItem = this.makePageComponent(input);
        this.page.addChild(pageItem);
        dialog.removeFrom(this.dialogRoot);
      });

      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }

  private makeDialogInput(value: string): DialogInputData {
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

  private makePageComponent(input: DialogInputData): Component {
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

  private changeTheme() {
    const changeBtn = document.querySelector(
      '.themeButton'
    )! as HTMLButtonElement;

    changeBtn.onclick = () => {
      const body = document.querySelector('body')! as HTMLElement;
      const select = document.querySelector('.select')! as HTMLElement;
      const selectPanel = document.querySelector(
        '.select-panel'
      )! as HTMLElement;
      const doc = document.querySelector('.document')! as HTMLElement;

      if (this.theme === 'dark') {
        this.theme = 'light';
        body.classList.add('light');
        select.classList.add('light');
        selectPanel.classList.add('light');
        doc.classList.add('light');
      } else {
        this.theme = 'dark';
        body.classList.remove('light');
        select.classList.remove('light');
        selectPanel.classList.remove('light');
        doc.classList.remove('light');
      }
    };
  }
}

new App(document.querySelector('.document')! as HTMLElement, document.body);
