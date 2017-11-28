##Technical Requirements
R1: The website has three HTML pages
R2: Header contains navigation links, logo, and website name and will appear on all three pages
R3: Footer contains copyright and will appear on all three pages
R4: about.html page contains information about each team member and photo
R5: newbusiness.html page has at minimum name, location, image url, and hours input fields
R6: newbusiness.html has a form submit button to create the business object
R7: Users will be able to sign in via username field, password field, and sign in button on main.html page
R8: Add New button will be present on main.html only if user is logged in
R9: All business will be displayed in a scrollable list on main.html page
R10: Businesses in the displayed list are filterable based on happy hour time

#Software Details

Two Object Constructors:
User{
Properties - login
           -be able to create a new business
}

Business{
Properties
- name:
- location:
-priceMax:
-priceMin:
-happyHourStart:
-happyHourEnd:
-rating:
-menu:
-image:
-foodType:
businessArray:
}

Business Methods:
1-checkPrice(maxPrice)
2-calculateDistance()
3-happyHourAt()

Object Literal:
happyHour {
  var business = []
  var users = []

  function filterBy(key, value) {
    value --> price, distance
  }

  function displayBusiness()
  function filterOnSubmit()

  function filterOnSubmit()
  function createOnSubmit()

  function cacheData()
  function restoreData()

  function createBusiness()

}

