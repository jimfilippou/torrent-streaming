import { Component, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
	selector: 'app-torrents',
	templateUrl: './torrents.component.html',
	styleUrls: ['./torrents.component.scss']
})
export class TorrentsComponent {

	@ViewChild('t', { static: false })
	private _video: ElementRef;

	private url = "http://localhost:3000";
	public loading = false;

	constructor(
		private _http: HttpClient, private _elementRef: ElementRef,
		private _toastr: ToastrService
	) { }

	askMagnet(): void {
		const magnet = prompt("Paste magnet to download");
		this.loading = true;
		this._http.post(`${this.url}/torrent/download`, { magnet })
			.subscribe((response: Response) => {
				this.loading = false;
				let el = this._elementRef.nativeElement.querySelector('#v');
				const videoSRC = `${this.url}/video/stream/${response.id}`;
				el.insertAdjacentHTML('beforeend', `<video autoplay controls src="${videoSRC}"></video>`);
			});
		return;
	}

	copyMessage() {
		const selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent';
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
		this._toastr.success("A dummy magnet link was copied to your clipboard", "Copied!");
	}

}


interface Response {
	id: string;
	name: string;
	size: number;
	path: string;
	mp4_file: string;
}