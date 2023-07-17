import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageService:MessageService,
              private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {  
    return next.handle(request)
      .pipe(
        tap({
          error: (err) => {
            console.log(err)
            if (err instanceof HttpErrorResponse 
                && (err.status!=201) ) {
              switch (err.status) {
                case 401:
                  this.messageService.show(`Vous n'êtes pas authentifié(e)`);
                  this.router.navigate(['/login']);
                  break;
                case 403:
                  this.messageService.show(`Vous n'êtes pas autorisé(e)`)
                  break;
                case 404:
                  this.messageService.show(`La ressource n'est pas disponible`)
                  break;
                case 409:
                  //utilisateur existe déjà
                  this.messageService.show(err.message);
                  this.router.navigate(['/register'])
                  break;
                case 419:
                  this.messageService.show(`Limit rate API}`)
                  break;

                default:
                  this.messageService.show("Erreur serveur")
              }
            }
          },
        })
      )
    ;
  }
}
