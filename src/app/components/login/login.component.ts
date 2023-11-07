import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/models/LoginRequest.model';
import { SignupRequest } from 'src/app/models/SignupRequest.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  email: string = '';
  password: string = '';
  userLogin: LoginRequest = new LoginRequest;;
  userRegister: SignupRequest = new SignupRequest;
  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const loginRequest = {
      username: this.email,
      password: this.password,
    };
    this.userLogin.username = this.email;
    this.userLogin.password = this.password;

    this.authService.signIn(this.userLogin).subscribe(
      (data: any) => {
        // Login riuscito, puoi gestire la risposta qui
        // Di solito, memorizzeresti il token JWT e le informazioni dell'utente nell'app
        // Esegui le azioni necessarie dopo il login, come il reindirizzamento a una pagina protetta
        console.log('Login riuscito:', data);

        // Esempio di reindirizzamento dopo il login (è necessario importare Router da @angular/router)
        this.router.navigate(['/']);
      },
      (error: any) => {
        // Gestisci gli errori qui, ad esempio, mostra un messaggio di errore all'utente
        console.error('Errore durante il login:', error);
      }
    );
  }

  register() {
    const registerRequest = {
      email: this.email,
      username: this.email.substring(0,this.email.indexOf('@')),
      password: this.password,
    };
    this.userRegister.email = this.email;
    this.userRegister.username = this.email.substring(0,this.email.indexOf('@'));
    this.userRegister.password = this.password;

    this.authService.signUp(this.userRegister).subscribe(
      (data: any) => {
        // Login riuscito, puoi gestire la risposta qui
        // Di solito, memorizzeresti il token JWT e le informazioni dell'utente nell'app
        // Esegui le azioni necessarie dopo il login, come il reindirizzamento a una pagina protetta
        console.log('Registrazione riuscito:', data);

        // Esempio di reindirizzamento dopo il login (è necessario importare Router da @angular/router)
        this.router.navigate(['/']);
      },
      (error: any) => {
        // Gestisci gli errori qui, ad esempio, mostra un messaggio di errore all'utente
        console.error('Errore durante la registrazione:', error);
      }
    );
  }
}
