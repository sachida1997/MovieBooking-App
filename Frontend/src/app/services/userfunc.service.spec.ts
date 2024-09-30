import { TestBed, inject } from '@angular/core/testing';

import { IBookTicketBody, IMovieResponse, IPayLoad, UserfuncService } from './userfunc.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

fdescribe('UserfuncService', () => {
  let service: UserfuncService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserfuncService]
    });
    service = TestBed.inject(UserfuncService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve movie data',
    inject([UserfuncService, HttpTestingController], (service: UserfuncService, httpMock: HttpTestingController) => {
      // Define the mock response data
      const mockMovieResponse: IMovieResponse = {
        headers: {},
        body: {
          'Status Code': 0,
          'Custom Message': '',
          PayLoad: []
        },
        statusCode: '',
        statusCodeValue: 0
      };

      // Call the method under test
      service.getMovie().subscribe(response => {
        expect(response).toEqual(mockMovieResponse);
      });

      // Define the request match
      const req = httpMock.expectOne('http://localhost:8082/api/v1.0/movie/all');
      expect(req.request.method).toBe('GET');

      // Provide the mocked response
      req.flush(mockMovieResponse);
    })
  );

  it('should retrieve a movie by ID',
    inject([UserfuncService, HttpTestingController], (service: UserfuncService, httpMock: HttpTestingController) => {
      // Define the movie ID
      const movieId = 1;

      // Call the method under test
      service.getMovieById(movieId).subscribe(response => {
        expect(response).toBeDefined();
      });

      // Define the request match
      const req = httpMock.expectOne(`http://localhost:8082/api/v1.0/movie/get/${movieId}`);
      expect(req.request.method).toBe('GET');

      // Provide the mocked response
      const expectedResponse: IPayLoad = {
        movieId: 1,
        movieName: 'Fast X',
        ticketsAvailable: 200,
        ticketsBooked: 0,
        ticket: []
      };
      req.flush(expectedResponse);
    })
  );

  it('should book tickets',
    inject([UserfuncService, HttpTestingController], (service: UserfuncService, httpMock: HttpTestingController) => {
      // Define the book ticket body
      const bookTicketBody: IBookTicketBody = {
        movieIdFk: 1,
        noOfTicket: 5
      };

      // Call the method under test
      service.bookTickets(bookTicketBody).subscribe(response => {
        expect(response).toBeDefined();
      });

      // Define the request match
      const req = httpMock.expectOne('http://localhost:8082/api/v1.0/ticket/bookTicket');
      expect(req.request.method).toBe('POST');

      // Provide the mocked response
      const expectedResponse = {
        // Define the structure of our response object
        movieIdFk:1,
        noOfTicket:5
      };
      req.flush(expectedResponse);
    })
  );

});
