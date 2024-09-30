import { TestBed, inject } from '@angular/core/testing';

import { AdminService, IPayLoad } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a movie',
    inject([AdminService, HttpTestingController], (service: AdminService, httpMock: HttpTestingController) => {
      // Define the movie object to add
      const movie = {
        // Define the structure and data of the movie object
        movieId:1,
        movieName:'Fast X',
        theatreName:'SRS',
        ticketsAvailable:200
      };

      // Call the method under test
      service.addMovie(movie).subscribe(response => {
        expect(response).toBeDefined();
        // Assert other properties of the response as needed
      });

      // Define the request match
      const req = httpMock.expectOne('http://localhost:8082/api/v1.0/movie/addMovie');
      expect(req.request.method).toBe('POST');

      // Provide the mocked response
      const expectedResponse = {
        // Define the structure and data of the response object
        status: 200,
        message: 'Movie added successfully'
      };
      req.flush(expectedResponse);
    })
  );

  it('should update a movie',
    inject([AdminService, HttpTestingController], (service: AdminService, httpMock: HttpTestingController) => {
      // Define the movie object to update
      const movie = {
        // Define the structure and data of the movie object
        movieName: 'Fast X',
        theatreName: 'PVR',
        ticketsAvailable: 250
      };

      // Call the method under test
      service.updateMovie(movie).subscribe(response => {
        expect(response).toBeDefined();
        // Assert other properties of the response as needed
      });

      // Define the request match
      const req = httpMock.expectOne('http://localhost:8082/api/v1.0/movie/updateMovie');
      expect(req.request.method).toBe('PUT');

      // Provide the mocked response
      const expectedResponse = 'Success';
      req.flush(expectedResponse, { status: 200, statusText: 'OK' });
    })
  );

  it('should delete a movie',
    inject([AdminService, HttpTestingController], (service: AdminService, httpMock: HttpTestingController) => {
      const movieId = 1; // Specify the movie ID to delete

      // Call the method under test
      service.deleteMovie(movieId).subscribe(response => {
        expect(response).toBeDefined();
        // Assert other properties of the response as needed
      });

      // Define the request match
      const req = httpMock.expectOne(`http://localhost:8082/api/v1.0/movie/delete/${movieId}`);
      expect(req.request.method).toBe('DELETE');

      // Provide the mocked response
      const expectedResponse = {
        // Define the structure and data of the response object
        status: 200,
        message: 'Movie deleted successfully'
      };
      req.flush(expectedResponse);
    })
  );

  it('should get a movie by ID',
    inject([AdminService, HttpTestingController], (service: AdminService, httpMock: HttpTestingController) => {
      const movieId = 1; // Specify the movie ID to fetch

      // Call the method under test
      service.getMovieById(movieId).subscribe(response => {
        expect(response).toBeDefined();
        // Assert other properties of the response as needed
      });

      // Define the request match
      const req = httpMock.expectOne(`http://localhost:8082/api/v1.0/movie/get/${movieId}`);
      expect(req.request.method).toBe('GET');

      // Provide the mocked response
      const expectedResponse: IPayLoad = {
        movieId: 1,
        movieName: 'Fast X',
        ticketsAvailable: 250,
        ticketsBooked: 0,
        ticket: []
      };
      req.flush(expectedResponse);
    })
  );

});
