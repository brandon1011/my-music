import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

    favourites: Array<any>;
    favSub: any;
    remSub: any;

  constructor(private mService: MusicDataService) { }

  ngOnInit(): void {
    this.favSub = this.mService.getFavourites().subscribe(favData => {
        this.favourites = favData.tracks;
    });
  }

  removeFromFavourites(id): void{
    this.remSub = this.mService.removeFromFavourites(id).subscribe(favData => {
        this.favourites = favData.tracks;
    });
  }

  ngOnDestroy(): void{
      this.favSub.unsubscribe();
      if (this.remSub)
        this.remSub.unsubscribe();
  }

}
