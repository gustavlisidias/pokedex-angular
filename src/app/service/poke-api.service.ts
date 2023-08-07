import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Observable
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class PokemonApiService {
  public baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  public nameUrl: string = 'https://pokeapi.co/api/v2/pokemon-species/';
  public limit: number = 50; // numero max de objetos por pagina
  public maxLimit: number = 50 // numero maximo de objetos disponiveis (inicia com 50 e é atualizado na consulta inicial);

  constructor(private http: HttpClient) { }

  public getAllPokemons(offset: number): Observable<any> {
    // https://pokeapi.co/api/v2/pokemon/?offset=0&limit=50
    const url = `${this.baseUrl}?offset=${offset}&limit=${this.limit}`;

    return this.http.get<any>(url).pipe(
      switchMap(res => {
        this.maxLimit = res.count;
        const requests = res.results.map((pokemon: any) => {
          return this.getPokemonDetails(pokemon.url).pipe(
            map(details => ({ ...pokemon, details }))
          );
        });
        return forkJoin(requests);
      })
    );

  }

  public getPokemonName(name: string): Observable<any> {
    // https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281
    const url = `${this.baseUrl}?offset=0&limit=${this.maxLimit}`;

    return this.http.get<any>(url).pipe(
      switchMap(res => {
        this.maxLimit = res.count;
        const requests = res.results.filter(
          (pokemon: any) => pokemon.name.toLowerCase().includes(name.toLowerCase())).map(
            (pokemon: any) => {
              return this.getPokemonDetails(pokemon.url).pipe(
                map(details => ({ ...pokemon, details }))
              );
            });
        return forkJoin(requests);
      })
    );

  }

  public getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}