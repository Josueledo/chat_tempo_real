import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Chat } from './components/chat/chat';

const routes: Routes = [
  { path: 'chat', component: Chat },
  { path: '', redirectTo: '/chat', pathMatch: 'full' },
  { path: '**', redirectTo: '/chat' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
