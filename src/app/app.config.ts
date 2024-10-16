import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-dd412","appId":"1:66496653220:web:536773a8acd4d22a704331","storageBucket":"simple-crm-dd412.appspot.com","apiKey":"AIzaSyA6TvcqCxhSs3UAKcGqrV9u_ypARksg75k","authDomain":"simple-crm-dd412.firebaseapp.com","messagingSenderId":"66496653220"})), provideFirestore(() => getFirestore())]
};
