import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Module Routing
import { PagesRoutingModule } from './pages-routing.module';

//Module
import { SharedModule } from '../shared/shared.module';

//Pages
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    HomeComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }