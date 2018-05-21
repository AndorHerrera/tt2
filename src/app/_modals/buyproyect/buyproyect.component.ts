import { Component, OnInit } from '@angular/core';
import { Proyect } from '../../_models/proyect.model';
import { User } from '../../_models/user.model';
import { Router } from '@angular/router';
import { BuysService } from '../../buys/buys.service';
import { Buy } from '../../_models/buy.model';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-buyproyect',
  templateUrl: './buyproyect.component.html',
  styleUrls: ['./buyproyect.component.scss']
})
export class BuyproyectComponent implements OnInit {

  proy: Proyect;
  user: User;
  mBuy: Buy = new Buy;
  isBought;

  constructor(private router: Router,
    private buysService: BuysService,
    private userService: UserService) { }

  ngOnInit() {
    this.checkIfBought();
  }

  checkIfBought() {
    //this.buysService.getBuysBySub()
    //console.log(this.proy.idUser);
  }

  buy() {
    //this.buysService.addBuys.
    this.mBuy.proyect = this.proy;
    this.mBuy.user = this.user;
    //console.log(this.mBuy);
    this.buysService.addBuys(this.mBuy).subscribe(response => {
      console.log(response);
      if(response.id!=null) {
        this.buyFromUser();
      }
    });
    //this.router.navigate(['/buys']);
  }

  buyFromUser() {
    this.userService.payProyect(this.user,this.proy.price).subscribe( response => {
      console.log(response);
      if(response.id!=null) {
        this.router.navigate(['/buys']);
      }
    });
  }

  enough() {
    return this.proy.price < this.user.sp;
  }

  verProyecto() {
    this.router.navigate(['/marketdetail',this.proy.id]);
  }

}
