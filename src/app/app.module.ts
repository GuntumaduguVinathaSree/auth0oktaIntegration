import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { OktaAuthModule } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';


const oktaAuth = new OktaAuth( {
  issuer: 'https://dev-49801168.okta.com/oauth2/default',
  clientId: '0oaecthg0rA0ylrvF5d7',
  redirectUri: window.location.origin + '/login/callback',
  // redirectUri: 'http://localhost:4200/', 
  pkce: true
});

// const oktaAuthConfig = {
//   issuer: oktaConfig.issuer,
//   clientId: oktaConfig.clientId,
//   redirectUri: oktaConfig.redirectUri,
//   pkce: oktaConfig.pkce
// };

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AuthModule.forRoot({...env.auth, httpInterceptor: {...env.httpInterceptor}}),
    OktaAuthModule.forRoot({oktaAuth})
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
   
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
