package com.allstate.compozed.exception;

import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * Created by localadmin on 3/15/17.
 */
public class AppQuotaException extends Exception{
    private static final long serialVersionUID = 1L;
    private String errorMessage;

    public String getErrorMessage() {
        return errorMessage;
    }
    public AppQuotaException(String errorMessage) {
        super(errorMessage);
        this.errorMessage = errorMessage;

    }

    public AppQuotaException() {
        super();
    }

}
