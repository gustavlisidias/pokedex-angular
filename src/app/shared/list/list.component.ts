import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  public allPokemons: any[] = [];
  public currentPage: number = 1;
  public totalPages: number = 0;
  public currentPokemons: any[] = [];
  public apiError: boolean = false;

  constructor(private pokemonApiService: PokemonApiService) { }

  ngOnInit(): void {
    this.listarPokemons(0);
  }

  public listarPokemons(offset: number): void {
    this.pokemonApiService.getAllPokemons(offset).subscribe({
      next: (res: any) => {
        this.allPokemons = res;
        this.totalPages = Math.ceil(res.count / this.pokemonApiService.limit);
        this.currentPokemons = this.allPokemons;
      },
      error: (err: any) => {
        this.apiError = true;
      }
    });
  }

  public searchPokemons(name: string) {
    if (!name) {
      this.listarPokemons(0);
      return
    }

    this.pokemonApiService.getPokemonName(name).subscribe({
      next: (res: any) => {
        this.allPokemons = res;
        this.totalPages = Math.ceil(res.count / this.pokemonApiService.limit);
        this.currentPokemons = this.allPokemons;
      },
      error: (err: any) => {
        this.apiError = true;
      }
    })
  }

  public goToPage(pageNumber: number): void {
    const offset = (pageNumber - 1) * this.pokemonApiService.limit;
    this.currentPage = pageNumber;
    this.listarPokemons(offset);
  }
}