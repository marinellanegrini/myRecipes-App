export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

export const LINGUA = 'lingua';

export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:80/myRecipes/api';

export const URL = {
    LOGIN: URL_BASE + '/Utente/login',
    LOGOUT: URL_BASE + '/logout',
    UPDATE_PROFILO: URL_BASE + '/utente/updateprofilo',
    RICETTE: URL_BASE + '/Ricette/Ricetta',
    CIBI: URL_BASE + '/Ricette/RicercaPerIngredienti',
    PREFERITI: URL_BASE + '/Ricette/Preferiti',
    CATEGORIE: URL_BASE + '/Ricette/Categorie',
    RICAVANZATA: URL_BASE + '/Ricette/Avanzata',
    INSEGNAMENTI: URL_BASE + '/insegnamenti',
    APPELLI: URL_BASE + '/appelli'
};

export const X_AUTH = 'X-Auth';
