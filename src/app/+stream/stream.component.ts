import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as WebTorrent from 'webtorrent';
import * as ParseTorrent from 'parse-torrent';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
	selector: 'app-stream',
	templateUrl: './stream.component.html',
	styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

	@ViewChild('video', {static: false})

	private _video: ElementRef;
	private _client: WebTorrent.Instance;

	public files: WebTorrent.TorrentFile[];
	public selectedFile: string;

	public activeTorrent: WebTorrent.Torrent;

	public file: File;
	public magnet: string = '';

	constructor(private _snackBar: MatSnackBar) {
	}

	ngOnInit(): void {
		this._client = new WebTorrent();
	}

	previewTorrent(): void {
		if (!(this.file || this.magnet)) {
			this._snackBar.open('Please open a torrent file or paste a magnet link', 'OK', {
				duration: 4000,
			});
			return;
		}
		const identifier: File | string = this.file ? this.file : this.magnet;
		this._client.add(identifier as any, (torrent: WebTorrent.Torrent) => {
			this.files = torrent.files;
			torrent.destroy();
		});
	}

	handleFileInput(files: FileList) {
		this.file = files.item(0);
	}

	streamTorrent(): void {
		const identifier: File | string = this.file ? this.file : this.magnet;
		const {selectedFile} = this;
		this._client.add(identifier as any, (torrent: WebTorrent.Torrent) => {

			console.log(`Active torrent is set to ${torrent.name}`);
			this.activeTorrent = torrent;

			const file: WebTorrent.TorrentFile = torrent.files.find(function (file) {
				return file.name == selectedFile;
			});

			console.log(`Appending image file to native element...`);
			file.appendTo(this._video.nativeElement)

		})
	}

	destroyTorrent(): void {
		this.activeTorrent.destroy(err => {
			if (err) {
				console.error(err);
			}
			this.activeTorrent = null;
		});
		this.magnet = '';
		this.selectedFile = undefined;
		this.files = [];
		this._video.nativeElement.children[0].remove();
	}

}
