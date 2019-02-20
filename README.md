# Node.js & MySQL

### Challenge #1: Customer View (Minimum Requirement)

### Overview

In this assignment, I created an Amazon-like storefront CLI (command-line interface or command language interpreter) app called `bamazon` that accepts orders from customers and depletes stock from the storefront's inventory.

### Steps of creation:

1. I created a MySQL Database called `bamazon`.

2. I created a Table inside of that database called `products`.

3. The products table each has the following five columns:

   * item_id (unique id for each product)

   * product_name (name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in store)

4. I populated this database with 10 different products. (I inserted "mock" data rows into this database and table.)

5. I created a Node application called `bamazonCustomer.js`. Running this application first prompts the user: `Would you like to [SHOP] for an item or [EXIT]?`

   * If the user selects [SHOP], it displays all of the items available for sale with their item_ids, product names, department names, prices, and stock quantities.
   * If the user selects [EXIT], it exits the program.

6. The app then prompts the user with two messages:

   * The first message asks the user, `What is the item's product ID that you want to buy?`
   * The second message asks the user, `How many do you want to buy?`

7. Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

   * If it does, the app logs the phrase `Your order was placed successfully`, and then prompts the user to shop or exit.

   * If not, the app logs, `We're sorry. Insufficient product quantity. Please select another item`, and then prevents the order from processing.

8. However, if the storefront has enough of the product, it processes the customer's order.
   * The SQL database updates to reflect the remaining quantity.
   * Once the update processes, the customer is shown the total cost of their purchase.





### Functionality

1. LIRI can search Spotify for songs, Bands in Town for concerts, and OMDB for movies. The liri.js accepts the following four commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Does

1. `node liri.js concert-this <artist/band name>`

   * Using this command, LIRI searches the Bands in Town Artist Events API for an artist/band and displays the following event information in the terminal/bash window:

     * Venue name

     * Venue location

     * Event date (in the format "MM/DD/YYYY")

    `Example: node liri.js concert-this ZZ Top`

    `Output:`  

![Example: ZZ Top](screenshots/concert_this_zz_top.png)

2. `node liri.js spotify-this-song '<song name>'`

   * Using this command, LIRI searches the Spotify API and displays the following song information in the terminal/bash window:

     * Artist/band

     * Song name

     * Song preview URL from Spotify

     * Album

   `Example: node liri.js spotify-this-song Surrender`

      `Output:`

![Example: Surrender](screenshots/spotify_this_song_surrender.png)

   * If the user does not input a song, by default the program displays data for the song "The Sign" by Ace of Base.

      `Output:`

![default](screenshots/spotify_this_song_default.png)

3. `node liri.js movie-this '<movie name>'`

   * Using this command, LIRI searches the OMDB API and displays the following movie information in the terminal/bash window:

     
      * Movie title
      * Release year
      * IMDB movie rating
      * Rotten Tomatoes movie rating
      * Country of origin
      * Language
      * Plot
      * Actors
  
    `Example: node liri.js movie-this Aquaman`

    `Output:`  

![Example: Aquaman](screenshots/movie_this_aquaman.png)

   * If the user does not input a movie, by default the program displays data for the movie Mr. Nobody.

      `Example: node liri.js movie-this`

      `Output:`

![default](screenshots/movie_this_default.png)

4. `node liri.js do-what-it-says`

   * Using this command and the `fs` Node package, LIRI reads the text in random.txt and runs the specified command and text:

     * It runs `spotify-this-song` for the specified song in random.txt.

      `Example: node liri.js do-what-it-says`

      `spotify-this-song, I Want It That Way`

      `Output:`

![Example: I Want It That Way](screenshots/do_what_it_says_spotify_this_song.png)


   * It runs `concert-this` for the specified artist/band in random.txt.

      `Example: node liri.js do-what-it-says`

      `concert-this, Metallica`

      `Output:`

![Example: Metallica](screenshots/do_what_it_says_concert_this.png)

   * It runs `movie-this` for the specified movie in random.txt.

      `Example: node liri.js do-what-it-says`

      `movie-this, Star Wars`

      `Output:`

![Example: Star Wars](screenshots/do_what_it_says_movie_this.png)




### Challenge #2: Manager View (Next Level)

* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

- - -

* If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.

- - -

### Challenge #3: Supervisor View (Final Level)

1. Create a new MySQL table called `departments`. Your table should include the following columns:

   * department_id

   * department_name

   * over_head_costs (A dummy number you set for each department)

2. Modify the products table so that there's a product_sales column, and modify your `bamazonCustomer.js` app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

   * Make sure your app still updates the inventory listed in the `products` column.

3. Create another Node app called `bamazonSupervisor.js`. Running this application will list a set of menu options:

   * View Product Sales by Department
   
   * Create New Department

4. When a supervisor selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

5. The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `total_profit` to the `departments` table.

   * Hint: You may need to look into aliases in MySQL.

   * Hint: You may need to look into GROUP BYs.

   * Hint: You may need to look into JOINS.

   * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

### Reminder: Submission on BCS

* Please submit the link to the Github Repository!

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.

- - -

### Create a README.md

Add a `README.md` to your repository describing the project. Here are some resources for creating your `README.md`. Here are some resources to help you along the way:

* [About READMEs](https://help.github.com/articles/about-readmes/)

* [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

- - -

### Add To Your Portfolio

After completing the homework please add the piece to your portfolio. Make sure to add a link to your updated portfolio in the comments section of your homework so the TAs can easily ensure you completed this step when they are grading the assignment. To receive an 'A' on any assignment, you must link to it from your portfolio.

- - -

### One More Thing

If you have any questions about this project or the material we have covered, please post them in the community channels in slack so that your fellow developers can help you! If you're still having trouble, you can come to office hours for assistance from your instructor and TAs.

**Good Luck!**
