import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fin',
  templateUrl: './fin.component.html',
  styleUrls: ['./fin.component.scss']
})
export class FinComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(function () {
      location.href ="https://tt2escom.auth0.com/login?state=KxLAtJKBGcDdlYZTHEvlPZugd4l38gs1&client=pbcTS24xlle40k6nmz48FBreN8nsZ46v&protocol=oauth2&response_type=token%20id_token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fproyects&scope=openid%20profile&audience=https%3A%2F%2Ftt2escom.auth0.com%2Fuserinfo&nonce=zDfMtAiHU~y6IhXfxwbUw~VYnmtuvjM0&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS40LjEifQ%3D%3D";     
    }, 1200);
  }

}
