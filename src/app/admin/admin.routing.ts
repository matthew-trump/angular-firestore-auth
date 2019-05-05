import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';

import { AdminGuard } from './admin.guard';

const routes: Routes = [
    { path: '', component: AdminComponent, canActivate: [AdminGuard] }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);