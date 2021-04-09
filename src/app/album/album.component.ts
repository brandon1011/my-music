import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

    album: any;
    routeSub: any;
    albumSub: any;
    favSub: any;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private mService: MusicDataService) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
        this.albumSub = this.mService.getAlbumById(params.id).subscribe(albumData => {
            this.album = albumData;
        });
    });
  }

  ngOnDestroy(): void{
    this.routeSub.unsubscribe();
    this.albumSub.unsubscribe();
    if (this.favSub)
        this.favSub.unsubscribe();
  }

  addToFavourites(trackID): void{
    this.favSub = this.mService.addToFavourites(trackID).subscribe(success =>{
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
    }, err =>{
        this.snackBar.open("Unable to add song to favourites", "Done", { duration: 1500 });
    });
  }
}
