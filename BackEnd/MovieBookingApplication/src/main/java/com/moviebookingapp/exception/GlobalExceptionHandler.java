package com.moviebookingapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends Exception {

    @ExceptionHandler(MoviesNotFound.class)
    public ResponseEntity<String> incaseOfMoviesNotFound(Exception e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(SeatAlreadyBooked.class)
    public ResponseEntity<String> incaseOfSeatsAlreadyBooked(Exception e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }
}


//incaseOfMoviesNotFound : this method handles the MoviesNotFound exception . when this exception occurs it retrieve the 
// error msgs from the exception and creates a new ResponseEntity object with the error msgs and the http status of not_found