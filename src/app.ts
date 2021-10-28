import { VideoComponent } from './component/page/item/video.js';
import { TodoComponent } from './component/page/item/todo.js';
import { MemoComponent } from './component/page/item/memo.js';
import { ImageComponent } from './component/page/item/image.js';
import { PageComponent } from './component/page/page.js';
class App {
  private page: PageComponent;

  constructor(private appRoot: HTMLElement) {
    this.page = new PageComponent();
    this.page.attatchTo(this.appRoot);

    const image = new ImageComponent(
      'Image Title',
      'https://picsum.photos/300'
    );
    image.attatchTo(this.appRoot, 'beforeend');

    const memo = new MemoComponent('Memo', 'memo');
    memo.attatchTo(this.appRoot, 'beforeend');

    const todo = new TodoComponent('Todo', 'todo');
    todo.attatchTo(this.appRoot, 'beforeend');

    const video = new VideoComponent(
      'Video',
      'https://www.youtube.com/embed/1OdkTgq-f5c'
    );
    video.attatchTo(this.appRoot, 'beforeend');
  }
}

new App(document.querySelector('.document')! as HTMLElement);
