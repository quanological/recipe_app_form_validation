import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @ViewChild('f') shoppingEditForm: NgForm;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    // console.log(this.shoppingEditForm);
  }

  onAddItem(form: NgForm) {

    const value = form.value;
    // get ingredient name
    const ingName = value.name;
    // get ingredient amount
    const ingAmount = value.amount;
    // add it into a new ingredient
    const newIngredient = new Ingredient(ingName, ingAmount);

    this.slService.addIngredient(newIngredient);
    console.log(newIngredient.name + ' was added');
  }
}
