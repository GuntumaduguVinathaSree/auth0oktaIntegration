import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
// import { OktaAuthConfigService,OktaAuthStateService } from '@okta/okta-angular';
// import { OktaAuthService } from '@okta/okta-angular';
import { OktaAuthStateService,OKTA_AUTH } from '@okta/okta-angular';
import { AuthState,OktaAuth } from '@okta/okta-auth-js';
import {  Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  isAuthenticated: boolean;
  public isAuthenticated$!: Observable<boolean>;
  constructor(
    public auth: AuthService,
    // private oktaAuthService : OktaAuthService,
    @Inject(DOCUMENT) private doc: Document,
    private _oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private _oktaAuth: OktaAuth
  ) {
    // this.oktaAuthService.$authenticationState.subscribe(
    //   (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    // );
  }

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
  // login(): void {
  //   this.oktaAuthService.signInWithRedirect();
  // }

  // logoutOkta(): void {
  //   this.oktaAuthService.signOut();
  // }
  public async signIn() : Promise<void> {
    await this._oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this._oktaAuth.signOut();
  }
}