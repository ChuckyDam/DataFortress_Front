import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { RegistrationComponent } from './pages/auth/components/registration/registration.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { DefaultRoomComponent } from './pages/rooms/components/default-room/default-room.component';
import { RoomComponent } from './pages/rooms/components/room/room.component';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                component: AuthComponent,
                children: [
                    {
                        path: '',
                        component: LoginComponent
                    },
                    {
                        path: 'login',
                        component: LoginComponent
                    },
                    {
                        path: 'register',
                        component: RegistrationComponent
                    }
                ]
            },
            {
                path: 'rooms',
                component: RoomsComponent,
                children: [
                    {
                        path: '',
                        component: DefaultRoomComponent
                    },
                    {
                        path: ':id',
                        component: RoomComponent
                    }
                ]
            },
        ]
    }
];
