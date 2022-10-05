import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Creecompte from'./components/Creecompte';
import Authentification from'./components/Authentication';
import Dashboard from './components/Dashboard';

import ProduitList from './components/Vente/produit/Produits'
import AddProduit from './components/Vente/produit/AjouterProduit'

import ComposantList from './components/Achat/composant/Composants';
import AddComposant from './components/Achat/composant/AjouterComposant';

import StockList from './components/Achat/stock/ListerStock'
import AjouterStock from'./components/Achat/stock/AjouterStock'

import CommandeList from './components/Vente/commande/ListerCommandes';
import AjouterCommande from './components/Vente/commande/AjouterCommande'; 

import FournisseurList  from './components/Achat/fournisseur/Fournisseurs';
import AjouterFournisseur from './components/Achat/fournisseur/AjouterFournisseur';

import LivreurList from './components/Vente/livreur/Livreurs';
import AjouterLivreur from './components/Vente/livreur/AjouterLivreur';

import Tresorerie from './components/tresorerie/Tresorerie';
import Profil from './components/Profil';

import PrivateRoute from "./components/private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
   // Set auth token header auth
   const token = localStorage.jwtToken;
   setAuthToken(token);
   // Decode token and get user info and exp
   const decoded = jwt_decode(token);
   // Set user and isAuthenticated
   store.dispatch(setCurrentUser(decoded));
   // Check for expired token
   const currentTime = Date.now() / 1000; // to get in milliseconds
   if (decoded.exp < currentTime) {
     // Logout user
     store.dispatch(logoutUser());
 
     // Redirect to login
     window.location.href = "./login";
   }
 }
 

const App = () =>{

return(
   <Provider store={store}>
   <Router>
      
      <Route path="/creecompte" component={Creecompte}/>
      <Route  path="/"  exact component={Authentification}/>
      



      <PrivateRoute path="/Dashboard" component={Dashboard} />
      <PrivateRoute path="/produit" component={ProduitList}/>
      <PrivateRoute path="/AjouterProduit" component={AddProduit}/>
      <PrivateRoute path="/composant" component={ComposantList}/>
      <PrivateRoute path="/AjouterComposant" component={AddComposant} />
      <PrivateRoute path="/stock" component={StockList}   />
      <PrivateRoute path="/commande" component={CommandeList} />
      <PrivateRoute path="/AjouterCommande"  component={AjouterCommande} />
      <PrivateRoute path="/AjouterStock" component={AjouterStock} />
      <PrivateRoute path="/fournisseur" component={FournisseurList}   />
      <PrivateRoute path="/AjouterFournisseur"  component={AjouterFournisseur}   />
      <PrivateRoute path="/livreur" component={LivreurList} />
      <PrivateRoute path="/AjouterLivreur" component={AjouterLivreur}  />
      <PrivateRoute path="/tresorerie" component={Tresorerie}/>
      <Route path="/profil" component={Profil}/> 
     

   </Router>
   </Provider>
  


);
}

export default App;