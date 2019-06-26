export const AUTH_TOKEN = 'auth-token';

export const UTENTE_STORAGE = 'utente';

export const LINGUA = 'lingua';

export const USE_PROXY = true;

export const URL_BASE = USE_PROXY ? 'api' : 'http://localhost:80/myRecipes/api';


export const URL = {
    LOGIN: URL_BASE + '/Utente/login',
    LOGOUT: URL_BASE + '/logout',
    UPDATE_PROFILO: URL_BASE + '/utente/updateprofilo',
    VERUSERNAME: URL_BASE + '/Utente/username',
    REGISTRAZIONE: URL_BASE + '/Utente/registrazione',
    RICETTE: URL_BASE + '/Ricette/Ricetta',
    CIBI: URL_BASE + '/Ricette/RicercaPerIngredienti',
    PREFERITI: URL_BASE + '/Ricette/Preferiti',
    AGGIUNGIPREFERITI: URL_BASE + '/Ricette/AggiungiaiPreferiti',
    RIMUOVIPREFERITI: URL_BASE + '/Ricette/RimuoviDaPreferiti',
    CATEGORIE: URL_BASE + '/Ricette/Categorie',
    RICAVANZATA: URL_BASE + '/Ricette/Avanzata',
    RICINGREDIENTI: URL_BASE + 'Ricette/PerIngredienti',
    INSEGNAMENTI: URL_BASE + '/insegnamenti',
    APPELLI: URL_BASE + '/appelli',
    HOMEPAGE: URL_BASE + '/Ricette/Homepage',
    COMMENTO: URL_BASE + '/Ricette/Commento',
};

export const X_AUTH = 'X-Auth';
