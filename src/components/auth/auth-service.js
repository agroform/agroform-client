import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  register = (username, email, password, userType) => {
    return this.service.post('/register', {username, email, password, userType})
    .then(response => response.data)
  }

  login = (email, password) => {
    return this.service.post('/login', {email, password})
    .then(response => response.data)
  }

  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }

  checkIfLoggedIn = () => {
    return this.service.get('/loggedin')
      .then(response => response.data)
  }
}

export const authService = new AuthService();

export default AuthService;