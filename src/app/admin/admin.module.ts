import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material'
import { MatIconModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';

import { AdminGuard } from './admin.guard';

import { AdminComponent } from './admin/admin.component';

import { routing } from './admin.routing';

@NgModule({
    declarations: [
        AdminComponent
    ],
    imports: [
        routing,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule
    ],
    providers: [AdminGuard],
})
export class AdminModule { }