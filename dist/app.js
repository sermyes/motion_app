import { TextInput } from './component/dialog/input/text-input.js';
import { Dialog } from './component/dialog/dialog.js';
import { VideoComponent } from './component/page/item/video.js';
import { TodoComponent } from './component/page/item/todo.js';
import { MemoComponent } from './component/page/item/memo.js';
import { ImageComponent } from './component/page/item/image.js';
import { PageComponent, PageItemComponent } from './component/page/page.js';
import { MediaInput } from './component/dialog/input/media-input.js';
class App {
    constructor(appRoot, dialogRoot) {
        this.appRoot = appRoot;
        this.dialogRoot = dialogRoot;
        this.page = new PageComponent(PageItemComponent);
        this.page.attatchTo(this.appRoot);
        this.page.draggable();
        this.theme = 'dark';
        this.bindElementToDialog();
        this.changeTheme();
    }
    bindElementToDialog() {
        const dialogBtn = document.querySelector('.create-button');
        dialogBtn.addEventListener('click', () => {
            const select = document.querySelector('.select-panel');
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
    makeDialogInput(value) {
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
    makePageComponent(input) {
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
    changeTheme() {
        const changeBtn = document.querySelector('.themeButton');
        changeBtn.onclick = () => {
            const body = document.querySelector('body');
            const select = document.querySelector('.select');
            const selectPanel = document.querySelector('.select-panel');
            const doc = document.querySelector('.document');
            if (this.theme === 'dark') {
                this.theme = 'light';
                body.classList.add('light');
                select.classList.add('light');
                selectPanel.classList.add('light');
                doc.classList.add('light');
            }
            else {
                this.theme = 'dark';
                body.classList.remove('light');
                select.classList.remove('light');
                selectPanel.classList.remove('light');
                doc.classList.remove('light');
            }
        };
    }
}
new App(document.querySelector('.document'), document.body);
