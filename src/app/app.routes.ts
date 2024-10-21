import { ContactUsComponent } from './contact-us/contact-us.component';
import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginComponent } from './login/login.component';
import { myguardGuard } from './myguard.guard';

export const routes: Routes = [
  {path:"",redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent,canActivate:[myguardGuard]},
  {path:'about',component:AboutComponent,canActivate:[myguardGuard]},
  {path:'categories',component:CategoriesComponent,canActivate:[myguardGuard]},
  {path:'details/:id',component:ProductDetailsComponent,canActivate:[myguardGuard]},
  {path:'favorite',component:FavoriteComponent,canActivate:[myguardGuard]},
  {path:'contact-us',component:ContactUsComponent},
  {path:"login",component:LoginComponent},
  {path:"**" ,component:HomeComponent}
];
