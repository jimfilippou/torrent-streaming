import {Component, ViewChild, ElementRef} from '@angular/core';
import * as WebTorrent from 'webtorrent';

@Component({
	selector: 'app-torrents',
	templateUrl: './torrents.component.html',
	styleUrls: ['./torrents.component.scss']
})
export class TorrentsComponent {

	@ViewChild('video', {static: false})
	private _video: ElementRef;
	private _client: WebTorrent.Instance;
	public torrents: WebTorrent.Torrent[] = [];

	constructor() {
	}

	downloadTorrent(): void {
		const magnet = prompt('Paste the magnet URL');
		if (!magnet) return;

		this._client = new WebTorrent();

		this._client.add(magnet, (torrent: WebTorrent.Torrent) => {

			this.torrents.push(torrent);

			torrent.on('download', (bytes: number) => {
				console.log(bytes);
			});

			const file: WebTorrent.TorrentFile = torrent.files.find(function (file) {
				return file.name.endsWith('.mp4')
			});

			file.appendTo(this._video.nativeElement)
		})
	}

}
