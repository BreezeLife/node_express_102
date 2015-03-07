/**
 * Created by Breeze on 3/6/15.
 */

// Userlist data array for filling in info box
var userListData = [];

// DOM Readying ======
// DOM ready detect, it will fire off our table filling method when the page is ready for scripts to run
$(document).ready(function(){

    //Populate the user table on initial page load: call the table-filling method
    populateTable();

    // Username link clink
    // * if you click <td a.linkshowuser>, trigger to call the showUserInfo function()
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    $('#btnAddUser').on('click', addUser);

});

// Functions ==================================

// Fill table with data: define the table-filling method
function populateTable(){

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON, iterate over the return JSON to create a big content string
     $.getJSON('/users/userlist', function( data ){

        // Stick our user data array into a userlist variable in the global obj
        // * in this way, we can access user data without repeatedly whaling on the database each time we click a name in our table
        // * it's not a performance friendly approach if thousands of users to parse
        // * you should implement paging and only load the data you really needed at any given time
        userListData = data;

        // For each item in our JSON, add a table row and cell to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this._id + '">delete</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table, #userList defined in index.jade
        $('#userList table tbody').html(tableContent);

    });

};

// Show User Info
function showUserInfo(event){

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    // * using .map to apply a function to each object in our userListData array
    // * function(arrayItem) only return the usernames' map, like ['Bob', 'Sue']
    var arrayPosition = userListData.map(function(arraryItem){
        return arraryItem.username;
    }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    // Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);

};

// Add New User Info
function addUser(event){

    // Prevent Link from Firing
    event.preventDefault();

    // Super basic validation

};