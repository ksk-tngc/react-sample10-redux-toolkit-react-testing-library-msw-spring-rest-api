package com.example.task_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

// Swagger UI に表示する情報
@OpenAPIDefinition(info = @Info(title = "タスクアプリAPI", version = "v1", description = "タスクアプリケーションに関するAPIです。"))
@SpringBootApplication
public class TaskApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskApiApplication.class, args);
    }

}
