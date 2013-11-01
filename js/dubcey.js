// ACW 9/3/13 #1 The beginning, this file will start it all
$(document).ready( function ()
{
	//Parse.$ = jQuery;

	// ACW 9/3/13 Moved the initialize code to the .ready function
	Parse.initialize("8SyaVoZSUSwjTpFrq8i4o8otPRbWMLXZ7PtEAgMR", "S7SGiM2ApbQpRkVZn7ixXoMjLkoM9y6SPGo8pdvl");

 var SignUpView = Parse.View.extend({
 	events:{
 		"submit form.signup-form": "signUp"
 		},
 		
 		el: $(".content"),
 		
 		initialize: function() {
      	  _.bindAll(this, "signUp");
          this.render();
    	},
 		
 		signUp: function(e) {
 		console.log("We want to sign up!");	
 			/*      var self = this;
      var username = this.$("#signup-username").val();
      var password = this.$("#signup-password").val();
      
      Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
        success: function(user) {
          new ManageTodosView();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".signup-form .error").html(error.message).show();
          this.$(".signup-form button").removeAttr("disabled");
        }
      });

      this.$(".signup-form button").attr("disabled", "disabled");
*/
 			},
 			
 	  render: function() {
      this.$el.html(_.template($("#signup-template").html()));
      this.$el.find('button').button();
      this.delegateEvents();
    }
 			});
 				
 var LogInView = Parse.View.extend({
    events: {
      "submit form.login-form": "logIn",
      "click button.signup-button": "signUp"
    },

    el: $(".content"),
    
    initialize: function() {
      _.bindAll(this, "logIn", "signUp");
      this.render();
    },

    logIn: function(e) {
      var self = this;
      var username = this.$("#login-username").val();
      var password = this.$("#login-password").val();
      
      Parse.User.logIn(username, password, {
        success: function(user) {
          new ManageTodosView();
          self.undelegateEvents();
          delete self;
        },

        error: function(user, error) {
          self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
          this.$(".login-form button").removeAttr("disabled");
        }
      });

      this.$(".login-form button").attr("disabled", "disabled");

      return false;
    },

    signUp: function(e) {
  		new SignUpView();
  		this.undelegateEvents();
        delete this;
          
      return false;
    },

    render: function() {
      this.$el.html(_.template($("#login-template").html()));
      this.$el.find('button').button();
      this.delegateEvents();
    }
  });


  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#dubcey"),

    initialize: function() {
      this.render();
    },

    render: function() {
      if (Parse.User.current()) {
      	alert("we have a user!"); //  new ManageTodosView();
      	Parse.User.logOut();
      } else {
        new LogInView();
      }
    }
  });
  
   new AppView;
//   Parse.history.start();
});