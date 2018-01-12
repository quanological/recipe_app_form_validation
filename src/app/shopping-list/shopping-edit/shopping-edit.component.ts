import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, OnDestroy
} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingEditForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {

    // listen for the startedEditing in slService
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        // store the index of the element that is being edited
        this.editedItemIndex = index;
        // edit mode has been entered if a number is being received here
        this.editMode = true;
        // store the ingredient into local variable
        this.editedItem = this.slService.getIngredient(index);
        // Change the value in the shopping edit form
        this.shoppingEditForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
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

    if (this.editMode) {
      this.slService.updateItem(ingName, ingAmount);
    } else {
      this.slService.addIngredient(newIngredient);
      console.log(newIngredient.name + ' was added');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

