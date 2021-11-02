import { BaseComponent } from './../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`
			<section class="video">
				<div class="video__container">
				<iframe src="" frameborder="0" class="video__player"></iframe>
				</div>
				<h3 class="video__title"></h3>
			</section>
		`);

    const iframe = this.element.querySelector(
      '.video__player'
    )! as HTMLIFrameElement;
    iframe.src = this.convertYoutubeUrl(url);

    const titleElement = this.element.querySelector(
      '.video__title'
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  private convertYoutubeUrl(url: string): string {
    const regex =
      /(?:https?\:\/\/)?(?:(?:(?:www\.)?(?:youtube.com\/(?:(?:watch\?v\=)|(?:embed\/)))([a-zA-Z0-9-_]+)|(?:youtu\.be\/)([a-zA-Z0-9-_]+)))/;
    const match = url.match(regex);

    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  }
}
