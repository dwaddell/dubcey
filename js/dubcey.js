// ACW 9/3/13 #1 The beginning, this file will start it all
$(document).ready( function ()
{
	// ACW 9/3/13 Moved the initialize code to the .ready function
	Parse.initialize("8SyaVoZSUSwjTpFrq8i4o8otPRbWMLXZ7PtEAgMR", "S7SGiM2ApbQpRkVZn7ixXoMjLkoM9y6SPGo8pdvl");
	
	var oCurrentUser = Parse.User.current();
	if (oCurrentUser) 
	{
    	// We have a user
    	alert("user is logged in");
	} 
	else 
	{
	    // Show Login page
		alert("show login");
	}
	
	// var TestObject = Parse.Object.extend("TestObject");
//     var testObject = new TestObject();
//       testObject.save({foo: "bar"}, {
//       success: function(object) {
//         $(".success").show();
//       },
//       error: function(model, error) {
//         $(".error").show();
//       }
//     });	
});