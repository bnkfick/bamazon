# bamazon

#### This is a node js CLI Amazon-like storefront with the MySQL. 
* main execution of program is within 
    * bamazonCustomer.js 
    * bamazonManager.js

##### bamazonCustomer.js
* This app taked in orders from customers and depleted stock from the store's inventory. 
* Data is stored in a MySQL Database called bamazon 
* with a products table.
* Running this application will 
    1. display all of the items available for sale. 
    2. User is prompted 
    * for ID of the product they would like to buy.
    * for how many units of the product they would like to buy.
    3. Once the customer has placed the order, the app checks if there is enough of the product to meet the customer's request.
    * If not, warn the user, prevent the order from going through, restart the prompt
    * If enough, fulfill the customer's order.
            * Update DB with new quantity 
            * show the customer the total cost of their purchase.

![bamazonCustomer](customer.webm)

##### bamazonManager.js
* List a set of menu options:
    1. View Products for Sale
        * list every available item: the item IDs, names, prices, and quantities
    2. View Low Inventory
        * list all items with an inventory count lower than five
    3. Update Inventory
        * display a prompt that will let the manager "update the quantity" of any item currently in the store
    4. Add New Product
        * allow the manager to add a completely new product to the store


![bamazondManager](bamazonManager.png)

#### Dependencies
 * mysql
 * npm inquirer
 * cli-table