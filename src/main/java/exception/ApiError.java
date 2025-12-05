package com.example.gerencferramentas.exception;

import java.time.LocalDateTime;

public class ApiError {
    private String message;
    private Integer status;
    private LocalDateTime timestamp;

    public ApiError(String message, Integer status) {
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }

    public String getMessage() { return message; }
    public Integer getStatus() { return status; }
    public LocalDateTime getTimestamp() { return timestamp; }
}
