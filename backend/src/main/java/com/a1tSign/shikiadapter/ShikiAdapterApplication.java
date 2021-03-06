package com.a1tSign.shikiadapter;

import feign.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ShikiAdapterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShikiAdapterApplication.class, args);
	}
}
