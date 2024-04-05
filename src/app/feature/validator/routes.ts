import { Routes } from "@angular/router";
import { CubeSelectorComponent } from "./cube-selector/cube-selector.component";
import { ValidatorComponent } from "./validator/validator.component";


export const routes: Routes = [
    {
        path: '',
        component: CubeSelectorComponent
    },
    {
        path: ':endpoint/:cubeIri',
        component: ValidatorComponent
    }
];
