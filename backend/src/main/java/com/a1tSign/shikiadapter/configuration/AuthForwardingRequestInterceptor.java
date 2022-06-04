package com.a1tSign.shikiadapter.configuration;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Collection;
import java.util.Optional;

/**
 * Предварительный обработчик запросов, обеспечивающий передачу заголовка {@code Authentication}.
 * <p>
 * В первую очередь обработчик проверяет существует ли сформированный
 * заголовок {@code Authentication}, т.к. есть возможность передачи
 * заголовка как параметра метода feign-клиента.
 * </p><p>
 * Если заголовок не передавался в качестве параметра производится попытка
 * достать заголовок, переданный клиентом из {@link RequestContextHolder}.
 * </p>
 */
public class AuthForwardingRequestInterceptor implements RequestInterceptor {

    @Override
    public void apply(RequestTemplate template) {
        Collection<String> authHeaders = template.headers().get(HttpHeaders.AUTHORIZATION);
        if (authHeaders != null && !authHeaders.isEmpty()) {
            return;
        }

        String auth = Optional.ofNullable(RequestContextHolder.getRequestAttributes())
                .map(ServletRequestAttributes.class::cast)
                .map(ServletRequestAttributes::getRequest)
                .map(req -> req.getHeader(HttpHeaders.AUTHORIZATION))
                .orElse(null);

        if (auth != null) {
            template.header(HttpHeaders.AUTHORIZATION, auth);
        } else {
            throw new IllegalStateException("cannot determine authorization header");
        }
    }
}