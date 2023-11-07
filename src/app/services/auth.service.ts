import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/User.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginRequest } from '../models/LoginRequest.model';
import { JwtResponse } from '../models/JwtResponse.model';
import { SignupRequest } from '../models/SignupRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject<boolean>(false);
  authStateChanged = this.authState.asObservable();
  apiServer = environment.apiUrl;
  constructor(private http: HttpClient) { 
    this.initializeAuthState();
  }

  signIn(user: LoginRequest): Observable<JwtResponse> {
    this.authState.next(true);
    // Esegui la richiesta HTTP per effettuare il login
  return this.http.post<JwtResponse>(`${this.apiServer}/api/auth/signin`, user).pipe(
    map((response: JwtResponse) => {
      // Se il login ha successo, dovresti ricevere un oggetto con il token JWT e altre informazioni
      const token = response.accessToken; // Assumi che il campo si chiami 'jwt' nella risposta
      console.log(token)
      if (token) {
        localStorage.setItem('token', token); // Salva il token JWT in localStorage
      }

      return response; // Puoi restituire la risposta originale o modificarla se necessario
    })
  );
  }

  signUp(user: SignupRequest): Observable<any> {
    return this.http.post<any>(`${this.apiServer}/api/auth/signup`, user);
  }

  logout() {
    // Effettua il logout e setta il valore di authState a false
    // Emetti un evento di cambio stato di autenticazione
    localStorage.removeItem('token');
    this.authState.next(false);
  }

  initializeAuthState(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authState.next(true);
    }
  }
}
