import { Cookies } from 'react-cookie';
import jwtDecode from 'jwt-decode';

const isUserAuthenticated = () =>{
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    const decoded = jwtDecode(user);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        console.warn('access token expired');
        return false;
    } else {
        return true;
    }
}

const setSession = (user) => {
    let cookies = new Cookies();
    if (user) cookies.set('user', JSON.stringify(user), { path: '/' , sameSite: 'Lax'});
    else cookies.remove('user', { path: '/' });
}

const getLoggedInUser = () => {
    const cookies = new Cookies();
    const user = cookies.get('user');
    return user ? user : null;
};

const getUserData = () => {
    const user = getLoggedInUser();
    if (!user) {
        return false;
    }
    return jwtDecode(user);
};

export { isUserAuthenticated, setSession, getLoggedInUser, getUserData };