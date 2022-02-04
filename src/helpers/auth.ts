function userIsAuthorized(): (string | boolean) {
    return localStorage.getItem('username') ?? false;
}

export  { userIsAuthorized } 