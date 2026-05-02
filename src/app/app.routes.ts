import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Chat } from './components/chat/chat';

export const routes: Routes = [
    { path: '', component: Home },
    {path:'chat', component: Chat}
];
