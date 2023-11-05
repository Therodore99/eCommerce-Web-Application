# eCommerce-Web-Application

This is an eCommerce three-tier web application.  The next section gives a short introduction to the functions of the website. The websites include：

1. Main Page: The main page should display key items about the web application that are always shown in the top bar
   a search bar to find phone (based on the title) with a search button.
   a checkout button.
   a sign-in button/two buttons instead if logged-in (profile and signout buttons)
   a drop-down selection to filter based on the brand .
   a range slider to filter the items based on maximum price.

2. Sign-in and/or Sign-up Page:  The user will be redirected to this page if the user tries to add an item to the cart without logging in first or if the user clicks the “sign in” button on the top bar in the Main Page. This page provides two options: Sign-up and Login.

3. Checkout Page: This page will be shown when the user clicks the checkout button on the top bar of the Main Page. This page will show these details:

   A back button to go back to the previous shown page.
   All of added items in the cart with these information
   The title of the phone listing.
   The price of each item.
   The quantity selected.
   A button and textbox to modify the quantity of the item (selecting 0 will remove the item.
   A button to remove an item.
   A text that shows the total price of selected items.
   A button to confirm the transaction.

4. User Page
   This page will be shown when the user has logged in and click the “profile” button in the top bar of the Main Page. This page has four tabs/modes:

   Edit profile: the page shows editable textboxes for first name, last name, email that are pre-filled with the current value. The page includes a button “Update profile” to update the data in the database. When the button is clicked, the user needs to fill in the correct password first.
   Change password: the page shows two textboxes where the first asking the current password and the second asking the new password. The page also includes a button to confirm this process. The web application will send an email to notify the user that the password has been changed.
   Manage listings: the page has a button to add a new listing that requires all details (e.g. title, price, etc.). This page also shows the list of phone listings created/associated to this user. The user should be able to enable/disable each listing and remove the listing item.
   View comments: the page shows a list of comments for each phone listing that is owned by the user. The user can only read the comments, but there is no delete button provided. All hidden comments will also be shown in this page with button(s) to hide/show the comments.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

The web development project use **HTML, CSS, JavaScript,  Axios, React, Node.js, MongoDB**. So it's better to know these techniques before you download the code.

### Installing

Before you can run the program, you must download and install some software to ensure that the development environment runs stably.

1. [Node.js Install Instruction](https://nodejs.org/en/download/package-manager#windows-1)
2. [MongoDB Install Instruction](https://www.mongodb.com/docs/manual/installation/)

## Deployment

In this section we will teach you how to deploy a website on your own machine

First, access to "server" and "client",  Separately, run the following code with CMD for installing modules:

```
npm install
```

Second,run the following code with CMD separately:

```
npm start
```

Open [http://localhost:3000](http://localhost:3000)(Maybe you have different one. In fact, the machine will jump to your browser itself ) to view it in your browser.

## Built With

* [Node.js](https://nodejs.org/en) - The web back-end framework used
* [MongoDB](https://www.mongodb.com/cloud/atlas/lp/try4?utm_source=google&utm_campaign=search_gs_pl_evergreen_atlas_core_prosp-brand_gic-null_apac-au_ps-all_desktop_eng_lead&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624341&adgroup=115749705743&cq_cmp=12212624341&gad=1&gclid=Cj0KCQjw0tKiBhC6ARIsAAOXutmdtOA4xTtFsCdLi4PJKRwLeDY9TnlXL7CPjxwPn5OtjGyeDvhEe0IaAp2REALw_wcB) - The web back-end storage used
* [JavaScript](https://www.javascript.com/): Used to implement both front and back end of the application


