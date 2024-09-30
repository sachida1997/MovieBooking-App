import { TestBed, inject } from '@angular/core/testing';

import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService]
    });
    service = TestBed.inject(LoginService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve the current user',
    inject([LoginService, HttpTestingController], (service: LoginService, httpMock: HttpTestingController) => {
      // Define the expected response from the API
      const expectedUser = { username: 'user', password: 'user123' };

      // Call the method under test
      service.getCurrentUser().subscribe(user => {
        expect(user).toEqual(expectedUser);
      });

      // Define the request match
      const req = httpMock.expectOne('http://localhost:8084/auth/v1.0/current-user');
      expect(req.request.method).toBe('GET');

      // Provide the mocked response
      req.flush(expectedUser);
    })
  );

  it('should generate a token',
    inject([LoginService, HttpTestingController], (service: LoginService, httpMock: HttpTestingController) => {
      // Define the login data
      const loginData = { username: 'user', password: 'user123' };
      
      // Call the method under test
      service.generateToken(loginData).subscribe(response => {
        expect(response).toBeDefined();
        // expect(response.token).toBeDefined();
      });

      // Define the request match
      const req = httpMock.expectOne('http://localhost:8084/auth/v1.0/login');
      expect(req.request.method).toBe('POST');

      // Provide the mocked response
      const expectedToken = { token: 'sample-token' };
      req.flush(expectedToken);
    })
  );

});
