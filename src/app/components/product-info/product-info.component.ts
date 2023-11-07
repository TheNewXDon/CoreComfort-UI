import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartProduct } from 'src/app/models/CartProduct.model';
import { Product } from 'src/app/models/Product.model';
import { CartProductService } from 'src/app/services/cart-product.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent {

  product!: Product;
  cartProducts: CartProduct[] = [];

  ngOnInit(): void {
    this.getProdotto();
    this.getCartProducts();
  }

  constructor(private productS: ProductService, private cartProductS: CartProductService, private router: Router, private route: ActivatedRoute){

  }

  getProdotto() {
    /*this.productS.getProducts().subscribe(
      (data: Product[]) => {
      console.log("prodotti: ", data);
      this.prodotti = data;
    }, (error: HttpErrorResponse) => console.log("Errore nel caricamento prodotti")
    )
    */
   this.route.params.subscribe(params => {
    const id_prodotto = +params['idprodotto'];
    console.log("ID:"  + id_prodotto)
    this.productS.getProduct(id_prodotto).subscribe(
      (data: Product) => {
        this.product = data;
      }, (error: HttpErrorResponse) => console.log(error.message)
     )
   })
   
  }
  getCartProducts() {
    this.cartProductS.selectedCartProducts$.subscribe(
      (data: CartProduct[]) => {
        console.log(data);
        this.cartProducts = data;
      }, (error: HttpErrorResponse) => console.log(error.message)
    )
  }

  addToCart(product: CartProduct) {
    /*this.cartProducts.push(product);
    this.productS.setCartProducts(this.cartProducts);
    console.log(this.cartProducts, this.productS.selectedCartProducts$);
    */
   this.cartProductS.saveCartProduct(product).subscribe(
    (data: CartProduct) => {
      this.cartProducts.push(data);
      this.cartProductS.setCartProducts(this.cartProducts);
      console.log(this.cartProducts, this.cartProductS.selectedCartProducts$);
    }
    )
  }
}
