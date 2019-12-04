import {Component, ViewChild, ElementRef} from '@angular/core';
import * as WebTorrent from 'webtorrent';

// declare const WebTorrent: WebTorrent;

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-torrents',
  templateUrl: './torrents.component.html',
  styleUrls: ['./torrents.component.scss']
})
export class TorrentsComponent {

  @ViewChild('video', {static: false}) video: ElementRef;

  constructor() {
  }

  downloadTorrent(): void {
    const x = prompt("Paste the magnet URL");
    const client = new WebTorrent();


    client.add(x, (torrent:any) => {

      torrent.on("download", (bytes: number) => {
        console.log(bytes);
      });

      const file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp4')
      })

      file.appendTo(this.video.nativeElement)
    })
  }

}
