
// Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyD1zYDy2n-vXQc6NzG9X6GqFRweNAgV0ow",
    authDomain: "cs411-2b882.firebaseapp.com",
    databaseURL: "https://cs411-2b882.firebaseio.com",
    projectId: "cs411-2b882",
    storageBucket: "cs411-2b882.appspot.com",
    messagingSenderId: "1086732750861"
  };

  var yummlyConfig = {
  	appID: "d8eec1aa",
  	apiKey: "b5bcbc16fbcb22b0098a8c5bf28d3b38"
  }



  var googleConfig = {
  	"web":{
		"client_id":"1086732750861-oqops55mn1sbtintk127igov3ootqe2i.apps.googleusercontent.com",
		"project_id":"cs411-2b882",
		"auth_uri":"https://accounts.google.com/o/oauth2/auth",
		"token_uri":"https://accounts.google.com/o/oauth2/token",
		"auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
		"client_secret":"9LiotcEKQd9o1mvo55kUZUj6",
		"javascript_origins":["http://localhost:3000/"]
		}
	}


  module.exports = {
  	firebaseConfig : firebaseConfig,
  	googleConfig : googleConfig,
  	yummlyConfig : yummlyConfig
  }