import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObMasterLayoutModule, ObButtonModule, ObIconModule, multiTranslateLoader, ObExternalLinkModule, WINDOW } from '@oblique/oblique';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
import localeFRCH from '@angular/common/locales/fr-CH';
import localeITCH from '@angular/common/locales/it-CH';
import localeENGBB from '@angular/common/locales/en-GB';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

registerLocaleData(localeDECH);
registerLocaleData(localeFRCH);
registerLocaleData(localeITCH);
registerLocaleData(localeENGBB);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ObMasterLayoutModule,
        ObButtonModule,
        ObIconModule.forRoot(),
        TranslateModule.forRoot(multiTranslateLoader()),
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        ObExternalLinkModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de-CH' },
        { provide: WINDOW, useFactory: (doc: Document) => doc.defaultView || {}, deps: [DOCUMENT] },
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule { }
