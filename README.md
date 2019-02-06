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

<br/>
<a href="https://drive.google.com/file/d/1iSceqCpg2haD6mx42Uo8BYuL0psCE1UJ/view">Click to see a video of the CLI bamazon customer experience</a>
<a href="https://drive.google.com/file/d/1iSceqCpg2haD6mx42Uo8BYuL0psCE1UJ/view">
<img src="https://raw.githubusercontent.com/bnkfick/bamazon/master/bamazonCustomer.png" alt="bamazon customer"</a>
<br/>


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



<a href="https://drive.google.com/file/d/1jecS6xu2zlP7bnM2wnupIP1Ghf7cSHqB/view">Click to see the bamazon manager app at work</a>
<img src="https://raw.githubusercontent.com/bnkfick/bamazon/master/bamazonManager.png" alt="bamazon manager"</a>
<br/>


##### bamazonSupervisor.js
* List a set of menu options:
    1. View Inventory
        * list every available item: the item IDs, names, prices, and quantities
    2. View Product Sales by Department
        * list all departments, their sales and total profits
    3. Add New Department
        * allow the supervisor to add a new department and overhead costs

<a href="https://drive.google.com/file/d/1pesM1MQJLe4n8e20QEV48GiPPZvcH2gI/view">Click to see the bamazon supervisor app at work</a>
<img src="https://raw.githubusercontent.com/bnkfick/bamazon/master/bamazonSupervisor.png" alt="bamazon supervisor"</a>
<br/>


#### Dependencies
 * mysql
 * npm inquirer
 * cli-table