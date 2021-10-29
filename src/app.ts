import { Component } from './component/component';
import { VideoComponent } from './component/page/item/video.js';
import { TodoComponent } from './component/page/item/todo.js';
import { MemoComponent } from './component/page/item/memo.js';
import { ImageComponent } from './component/page/item/image.js';
import { Composable, PageComponent } from './component/page/page.js';

class App {
  private page: Component & Composable;

  constructor(private appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attatchTo(this.appRoot);

    const image = new ImageComponent(
      'Image Title',
      'https://picsum.photos/300'
    );
    this.page.addChild(image);

    const memo = new MemoComponent('Memo', 'memo');
    this.page.addChild(memo);

    const todo = new TodoComponent('Todo', 'todo');
    this.page.addChild(todo);

    const video = new VideoComponent(
      'Video',
      'https://www.youtube.com/embed/1OdkTgq-f5c'
    );
    this.page.addChild(video);
  }
}

new App(document.querySelector('.document')! as HTMLElement);
