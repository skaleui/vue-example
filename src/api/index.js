import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const ShoppingListResource = Vue.resource('http://localhost:3000/' + 'shoppinglists{/id}')

export default {
  fetchShoppingLists: () => {
    return ShoppingListResource.get()
  },
  addNewShoppingList: (data) => {
    return ShoppingListResource.save(data)
  },
  updateShoppingList: (data) => {
    return ShoppingListResource.update({id: data.id}, data)
  },
  deleteShoppingList: (id) => {
    return ShoppingListResource.remove({id: id})
  }

}
