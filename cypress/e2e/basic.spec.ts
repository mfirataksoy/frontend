describe('Login Button', () => {
  it('navigates to the login page', () => {
    cy.visit('http://localhost:3333');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });
});

describe('Sign Up Button', () => {
  it('navigates to the sign up page', () => {
    cy.visit('http://localhost:3333');
    cy.contains('Sign Up').click();
    cy.url().should('include', '/signup');
  });
});

describe('Home Button', () => {
  it('navigates to the home page', () => {
    cy.visit('http://localhost:3333');
    cy.contains('Home').click();
    cy.url().should('eq', 'http://localhost:3333/');
  });
});


describe('Get Started Button', () => {
  it('navigates to the sign up page', () => {
    cy.visit('http://localhost:3333');
    cy.contains('Get started').click();
    cy.url().should('include', '/signup');
  });
});

describe('Keepsake Button', () => {
  it('navigates back to home', () => {
    cy.visit('http://localhost:3333');
    cy.contains('Keepsake').click();
    cy.url().should('eq', 'http://localhost:3333/');
  });
});

describe('Create New Account Button ', () => {
  it('navigates back to sign up', () => {
    cy.visit('http://localhost:3333/auth/login');
    cy.contains('Create').click();
    cy.url().should('include', '/signup');
  });
});

describe('Already a Member Button ', () => {
  it('navigates back to log in', () => {
    cy.visit('http://localhost:3333/auth/signup');
    cy.contains('Already').click();
    cy.url().should('include', '/login');
  });
});



describe('Login fields filled', () => {
  it('displays error message when the email field is not entered', () => {
    cy.visit('http://localhost:3333/auth/login');
    cy.get('input[name="email"]').clear();
    cy.get('input[name="password"]').type('password');
    cy.contains('Log In').click();
    cy.contains('Please');
  });
});

describe('Login fields filled', () => {
  it('displays error message when the password is not entered', () => {
    cy.visit('http://localhost:3333/auth/login');
    cy.get('input[name="email"]').type('email');
    cy.get('input[name="password"]').clear();
    cy.contains('Log In').click();
    cy.contains('Please');
  });
});

describe('Login with valid credentials', () => {
  it('logs in a user with valid credentials', () => {
    cy.visit('http://localhost:3333/auth/login');
    cy.get('input[name="email"]').type('lraynor950033@gmail.com');
    cy.get('input[name="password"]').type('Beanbean9500');
    cy.contains('Log In').click();
    cy.url().should('include', '/feed');
  });
});

describe('Login with invalid credentials', () => {
  it('does not log in a user with invalid credentials and shows error', () => {
    cy.visit('http://localhost:3333/auth/login');
    cy.get('input[name="email"]').type('johndoe@example.com');
    cy.get('input[name="password"]').type('password');
    cy.contains('Log In').click();
    cy.contains('Wrong');
  });
});


