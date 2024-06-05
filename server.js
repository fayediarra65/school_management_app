const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');

const {sequelize} = require('./backend/config/db.config')


const session = require('./backend/config/session.config');

const utilisateurRouter = require('./backend/routes/utilisateur.route');

const profRouter = require('./backend/routes/prof.route');


const  app = express();
const PORT = process.env.SERVER_PORT || 3000;

app.use(session);

//configurer les pages ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './frontend/views'));

app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(expressLayouts);
app.set("layout", "./main");

const publicPath = path.join(__dirname, "./frontend/public");

app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', utilisateurRouter);
app.use('/', profRouter);

app.get('/accueil', (req, res) => {
	res.render('./pages/accueil.ejs')
})
app.get('/logout', (req, res) => {
	// Détruire la session
	req.session.destroy();
	res.redirect('/inscription');
});

sequelize
	.sync({update: true})
	.then(()=> {
		//console.log("Mise à jour réussie");
		app.listen(PORT, ()=> {
			console.log("Le serveur a démarré sur le port " + PORT);
		})
	})
	.catch((error)=> {
		console.log('Mise à jour impossible', error);
	})