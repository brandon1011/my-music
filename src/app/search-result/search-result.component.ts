import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

    results: any;
    searchQuery: any;
    querySub: any;
    searchSub: any;

  constructor(private route: ActivatedRoute, private mService: MusicDataService) { }

  ngOnInit(): void {
      this.querySub = this.route.queryParams.subscribe(queryParams => {
        this.searchSub = this.mService.searchArtists(queryParams.q).subscribe(searchData => {
            this.results = searchData.artists.items.filter(({images}) => images.length > 0);
            this.searchQuery = queryParams.q;
        });
      });
  }

  ngOnDestroy(): void{
      this.querySub.unsubscribe();
      this.searchSub.unsubscribe();
  }

}
