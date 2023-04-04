# 🛒 sql-shopify
Database with information about Shopify app store apps and reviews.

Exercise goal is to create a valid database structure and store data about the apps.

You will learn:

 - database structure design;
 - integrity constraints;
 - executing queries;

## Source Data [@_data](./_data)

Before the exercise go through the data in `.csv` files, they can be opened with *Excel* / *LibreOffice* / etc.

`apps_categories.csv` contains information about the app id and category id .

`apps.csv` contains information about app url, title, tagline, developer, developer_link, icon, rating, reviews_count, description, description_raw, pricing_hint.

`categories.csv` contains information about all categories.

`key_benefits.csv` contains information about app id, title and description.

`pricing_plans.csv` contains information about app id, pricing title and price.

`reviews.csv` contains information about app id, review author, body, rating, helpful count,when was it posted, developer reply,when developer replied.

### Parsing

Parsing is already done and you don't need to do anything, take a look [./src/data](./src/data) & [./test/data](./test/data)

## Running Tests

Tests are in [./test](./test) directory, work on them in ascending order.

Each test is creating a new database file from the previous test file and storing it in the [./_db](./_db) directory. Which means that you may want to move some steps backwards also, even if all the tests were green.

To run test execute `npm run test-xx` where `xx` is test prefix, for example `npm run test-00`. Take a look if the database file was created.

### 00: Connectivity Check

If test is green you are ready to go!

### 01: Create Tables

To store all the information from the source files we will need tables.

Make all the tests green by writing correct statements for database creation.

Table can be created by using a simple [SQL Statement](https://www.w3schools.com/sql/sql_create_table.asp).

There are multiple things to keep in mind:

1. Each of the column must have a proper datatype, see [SQLite Datatypes](https://www.sqlite.org/datatype3.html).
1. Each table must have a [primary key](https://www.w3schools.com/sql/sql_primarykey.asp).
1. Think about which of the columns cannot be `null` in any circumstances, add [NOT NULL Constraints](https://www.w3schools.com/sql/sql_notnull.asp).
1. Are there any columns or combination of columns which must be unique? Try adding [unique index](https://www.w3schools.com/sql/sql_ref_create_unique_index.asp).

When test is green, open database file in DBVis to see a database structure.

### 02: Insert Flat Data

Now our tables are ready, but there is no data.

Write proper `insert` statements to fill the data. All of the inserts are in batches ([there is a limit](https://stackoverflow.com/questions/15858466/limit-on-multiple-rows-insert)), you need to [insert multiple values at once](https://stackoverflow.com/questions/452859/inserting-multiple-rows-in-a-single-sql-query).

When you have this test green, open database file in SQLite Browser and try to execute few queries to see that everything works fine.

### 03: Simple Queries

Simple queries.

If you are stuck check out examples [@sqlzoo.net](https://sqlzoo.net) and [@w3schools.com](https://www.w3schools.com/sql/default.asp).

### 04: Queries Across Tables

More complex queries, mainly `joins` between tables.

If you are stuck check out examples [@sqlzoo.net](https://sqlzoo.net) and [@w3schools.com](https://www.w3schools.com/sql/default.asp).

### 05: Integrity

Can information about an app live without the app?

### 06:Update statements

Queries where mainly `update` and `set` is needed.
