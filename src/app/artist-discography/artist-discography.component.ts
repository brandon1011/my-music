import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

    albums: any;
    artist: any;
    routeSub: any;
    artistSub: any;
    albumsSub: any;

  constructor(private route: ActivatedRoute, private mService: MusicDataService) { }

  ngOnInit(): void {
      this.routeSub = this.route.params.subscribe(params => {
        this.artistSub = this.mService.getArtistById(params.id).subscribe(artistData => {
            this.artist = artistData;
        });
        this.albumsSub = this.mService.getAlbumsByArtistId(params.id).subscribe(albumData => {
            let names = albumData.items.map(a => a.name);
            this.albums = albumData.items.filter(({name}, index) => !names.includes(name, index + 1));
        });
      });
  }

  ngOnDestroy(): void{
      this.routeSub.unsubscribe();
      this.artistSub.unsubscribe();
      this.albumsSub.unsubscribe();
  }

}
