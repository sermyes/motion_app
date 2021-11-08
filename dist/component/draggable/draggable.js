export class Draggable {
    constructor(listContainer) {
        const container = document.querySelector(`.${listContainer}`);
        const children = document.querySelectorAll(`.${listContainer} > *`);
        console.log(container);
        console.log(children);
        children.forEach((item) => {
            console.log(item);
            item.setAttribute('color', 'red');
        });
    }
    static create(listContainer) {
        new Draggable(listContainer);
    }
}
