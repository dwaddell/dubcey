// ACW 9/3/13 #1 The beginning, this file will start it all
$(document).ready( function ()
{
	Parse.$ = jQuery; // ACW 11/7/13 I am not sure if this is needed, better safe than sorry for now

	// ACW 9/3/13 Moved the initialize code to the .ready function
	Parse.initialize("8SyaVoZSUSwjTpFrq8i4o8otPRbWMLXZ7PtEAgMR", "S7SGiM2ApbQpRkVZn7ixXoMjLkoM9y6SPGo8pdvl");

  var WelcomeView = Parse.View.extend({
    events		  : {
                    'click button#logoutButton' : 'logout'
                  },
  
    el			    : $('.content'),
  
    initialize	: function ()
                  {
                    this.render();
                  },
  
    logout      : function () 
                  {
                    Parse.User.logOut(); // Logout the user
                   // window.hash = '';
                    //window.reload();
                    //oRouter.navigate('', true); // Navigate back to the home page
                  },
  
    render  		: function ()
                  {
                    var sTemplate;
            
                    sTemplate = '<div>Welcome Page</div>'
                                 + '<div><button id="logoutButton">Logout</button></div>';
                      
                    this.$el.html(_.template(sTemplate));
                    this.$el.find('button').button();
                    this.delegateEvents();
                  }	
  });

  var SignUpView = Parse.View.extend({
  events        : {
 		                "submit form.signup-form": "signUp"
 		              },
 		
 	el            : $(".content"),
 		
 	initialize    : function() 
 	                {
                    _.bindAll(this, "signUp");
                    this.render();
                  },
 		
 	signUp        : function(e) 
 	                {
                    var self = this;
                    var username = this.$("#signup-username").val();
                    var password = this.$("#signup-password").val();

                    Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
                      success: function(user) {
                          new WelcomeView();
                          self.undelegateEvents();
                          delete self;
                        },

                      error: function(user, error) {
                          self.$(".signup-form .error").html(error.message).show();
                          this.$(".signup-form button").removeAttr("disabled");
                        }
                    });

                    this.$(".signup-form button").attr("disabled", "disabled");
                  },
 			
  render        : function() 
                  {
                    var sTemplate;
      
                    sTemplate='<header id="header"></header>'+
                      '<div class="signup">'+	
                      '<form class="signup-form">'+
                        '<h2>Sign Up</h2>'+
                        '<div class="error" style="display:none"></div>'+
                        '<input type="text" id="signup-username" placeholder="Username" />'+
                          '<input type="password" id="signup-password" placeholder="Create a Password" />'+
                          '<button>Sign Up</button>'+
                      '</form>'+
                      '</div>';

                    this.$el.html(_.template(sTemplate));
                    this.$el.find('button').button();
                    this.delegateEvents();
    	            }
 });
 				
  var LogInView = Parse.View.extend({
    events      : {
                    "submit form.login-form": "logIn",
                    "click button.signup-button": "signUp"
                  },

    el          : $(".content"),
    
    initialize  : function() 
                  {
                    _.bindAll(this, "logIn", "signUp");
                    this.render();
                  },

    logIn       : function(e) 
                  {
                    var self = this;
                    var username = this.$("#login-username").val();
                    var password = this.$("#login-password").val();
      
                    Parse.User.logIn(username, password, {
                      success: function(user) {
                        // new WelcomeView();
                        self.undelegateEvents();
                        delete self;
                        //oRouter.navigate('welcome', true);
                        oRouter.navigate('dashBoard', true);// Changed to dashboard
                      },

                      error: function(user, error) {
                        self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
                        this.$(".login-form button").removeAttr("disabled");
                      }
                    });

                    this.$(".login-form button").attr("disabled", "disabled");

                    return false;
                  },

    signUp      : function(e) 
                  {
                    this.undelegateEvents();
                    delete this;
    
                    oRouter.navigate('signUp', true); //new SignUpView();
  
                    return false;
                  },

    render      : function() 
                  {
                    var sTemplate;
    
                    sTemplate='<header id="header"></header>'+
                    '<div class="login">'+
                    '<form class="login-form">'+
                        '<h2>Log In</h2>'+
                        '<div class="error" style="display:none"></div>'+
                        '<input type="text" id="login-username" placeholder="Username" />'+
                      '<input type="password" id="login-password" placeholder="Password" />'+
                        '<button>Log In</button>'+
                    '</form>'+
                    '<div class="signup">'+
                        '<button class="signup-button">Sign Up</button>'+
                      '</div>'+
                    '</div>';

                  this.$el.html(_.template(sTemplate));
                  this.$el.find('button').button();
                  this.delegateEvents();
                }
  });

  var DashBoardView = Parse.View.extend({
  	events		  : {
                    'click button#logoutButton' : 'logout'
                  },
  
    el			    : $('.content'),
  
    initialize	: function ()
                  {
                    this.render();
                  },
  
    logout      : function () 
                  {
                    console.log("LOGOUT CLICKED");
                    Parse.User.logOut(); // Logout the user
                   // window.hash = '';
                    //window.reload();
                    oRouter.navigate('', true); // Navigate back to the home page
                  },
  
    render  		: function ()
                  {
                    var sTemplate;
            
                    sTemplate = '<div>Dashboard Page</div>'
                                 + '<div><button id="logoutButton">Logout</button></div>';
                      
                    this.$el.html(_.template(sTemplate));
                    this.$el.find('button').button();
                    this.delegateEvents();
                  }	
  });
  var AppRouter = Parse.Router.extend({
    routes      : {
                    "": "index",
                    "welcome" : "index",
                    "signUp": "signUp",
                    "dashBoard": "dashBoard"
                  },  

    initialize  : function(options) 
                  {
                  },

    index       : function() 
                  {
                    if (Parse.User.current()) 
                    {
                      alert("we have a user!"); //  new ManageTodosView();
                      new WelcomeView();
                    } 
                    else 
                    {
                      console.log(arguments);
                      new LogInView();
                      console.log("we are on the index page");
                    }
                  },

    signUp      : function() 
                  {
                    new SignUpView();
                    console.log("did we make it to sign up?");
                  },
    dashBoard	: function()
    			  {
    			    if (Parse.User.current()) 
                    {
                      alert("Welcome to the dubcey dash!"); //  new ManageTodosView();
                      new DashBoardView();
    			      console.log("DASHBOARD VIEW");
                    } 
                    else 
                    {
                      console.log(arguments);
                      new LogInView();
                      console.log("we are on the index page");
                    }
    			    
    			  }              
  });
  var oRouter = new AppRouter();

  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el          : $("#dubcey"),

    initialize  : function() 
                  {
                    this.render();
                  },

    render      : function() 
                  {
                   oRouter.navigate('', true);
                 }
  });

  new AppView;
  Parse.history.start();
});