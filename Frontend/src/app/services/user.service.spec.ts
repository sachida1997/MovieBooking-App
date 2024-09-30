import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new user',
    inject([UserService, HttpTestingController], (service: UserService, httpMock: HttpTestingController) => {
      // Define the user data
      const user = { fullname: 'abc', username: 'user', password: 'user123', email: 'abc@example.com', phoneno: 9620164829 };

      // Call the method under test
      service.addUser(user).subscribe(response => {
        expect(response).toBeDefined();
        // expect(response.message).toEqual('User added successfully');
      });

      // Define the request match
      const req = httpMock.expectOne('http://localhost:8084/auth/v1.0/register');
      expect(req.request.method).toBe('POST');

      // Provide the mocked response
      const expectedResponse = { message: 'User added successfully' };
      req.flush(expectedResponse);
    })
  );

});
