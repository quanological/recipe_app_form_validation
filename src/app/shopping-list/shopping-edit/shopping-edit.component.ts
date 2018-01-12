import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, OnDestroy
} from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  // @ViewChild('f') shoppingEditForm: NgForm;
subscription: Subscription;
editMode = false;
editedItemIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    // console.log(this.shoppingEditForm);

    // Listen for the startedEditing in slService

    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        // store the index of the element that is being edited
        this.editedItemIndex = index;
        // edit mode has been entered if a number is being received here
        this.editMode = true;
      }

    );

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

