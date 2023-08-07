import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  public pokemonId: number | undefined;
  public pokemonName: any | undefined;
  public pokemonDetails: any | undefined;
  public apiError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private pokemonApiService: PokemonApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonId = params['id'];
      this.getPokemonDetails();
    });
  }

  public getPokemonDetails(): void {
    const urlDetails = `${this.pokemonApiService.baseUrl}${this.pokemonId}`;
    this.pokemonApiService.getPokemonDetails(urlDetails).subscribe({
      next: (res: any) => {
        this.pokemonDetails = res;
      },
      error: (err: any) => {
        this.apiError = true;
      }
    });

    const urlNames = `${this.pokemonApiService.nameUrl}${this.pokemonId}`;
    this.pokemonApiService.getPokemonDetails(urlNames).subscribe({
      next: (res: any) => {
        this.pokemonName = res;
      },
      error: (err: any) => {
        this.apiError = true;
      }
    });
  }
}