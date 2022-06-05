package com.a1tSign.shikiadapter.configuration;

import com.a1tSign.shikiadapter.contracts.api.KodikApi;
import com.a1tSign.shikiadapter.contracts.api.ShikimoriV1Api;
import com.a1tSign.shikiadapter.contracts.tools.ShikiAdapterFeignErrorDecoder;
import com.fasterxml.jackson.databind.ObjectMapper;
import feign.Feign;
import feign.Logger;
import feign.Request;
import feign.Retryer;
import feign.codec.Encoder;
import feign.form.spring.SpringFormEncoder;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.okhttp.OkHttpClient;
import feign.slf4j.Slf4jLogger;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.cloud.openfeign.support.SpringEncoder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * Feign Clients configuration for querying video files.
 *
 * @author VBoychenko
 */
@Configuration
@RequiredArgsConstructor
public class FeignClientsConfiguration {

    private final ObjectMapper objectMapper;
    private final ShikiAdapterFeignErrorDecoder errorDecoder;
    private final ObjectFactory<HttpMessageConverters> messageConverters;

    /**
     * Бин для FormEncoder.
     *
     * @return Encoder
     */
    @Bean
    public Encoder feignFormEncoder() {
        return new SpringFormEncoder(new SpringEncoder(messageConverters));
    }

    /**
     * The Feign client bean for the kodik-api.
     * <p/>
     * To activate, you need to add parameters to the application.yml of the service,
     * where the client is planned to be used:
     * <pre>{@code
     * api:
     *   kodik-api:
     *     url: http://kodik-api:8101
     *     enable-feign-client: true
     * }</pre>
     *
     * @param baseUrl base url-addres of api.
     * @return configured feign-client.
     */
    @Bean
    @ConditionalOnProperty (
            value = "api.kodik-api.enable-feign-client",
            havingValue = "true"
    )
    public KodikApi kodikApi(
            @Value ("${api.kodik-api.url}") String baseUrl
    ) {
        return Feign.builder()
                .client(new OkHttpClient())
                .requestInterceptor(new AuthForwardingRequestInterceptor())
                .encoder(new JacksonEncoder(objectMapper))
                .decoder(new JacksonDecoder(objectMapper))
                .errorDecoder(errorDecoder)
                .logger(new Slf4jLogger(KodikApi.class))
                .logLevel(Logger.Level.NONE)
                .retryer(new Retryer.Default(0,0,0))
                .options(new Request.Options(
                        10, TimeUnit.MINUTES,
                        10, TimeUnit.MINUTES,
                        true))
                .target(KodikApi.class, baseUrl);
    }

    /**
     * The Feign client bean for the kodik-api.
     * <p/>
     * To activate, you need to add parameters to the application.yml of the service,
     * where the client is planned to be used:
     * <pre>{@code
     * api:
     *   kodik-api:
     *     url: http://kodik-api:8101
     *     enable-feign-client: true
     * }</pre>
     *
     * @param baseUrl base url-addres of api.
     * @return configured feign-client.
     */
    @Bean
    @ConditionalOnProperty (
            value = "api.shikimori-v1.enable-feign-client",
            havingValue = "true"
    )
    public ShikimoriV1Api shikimoriV1Api(
            @Value ("${api.shikimori-v1.url}") String baseUrl
    ) {
        return Feign.builder()
                .client(new OkHttpClient())
                .requestInterceptor(new AuthForwardingRequestInterceptor())
                .encoder(new JacksonEncoder(objectMapper))
                .decoder(new JacksonDecoder(objectMapper))
                .errorDecoder(errorDecoder)
                .logger(new Slf4jLogger(ShikimoriV1Api.class))
                .logLevel(Logger.Level.NONE)
                .retryer(new Retryer.Default(0,0,0))
                .options(new Request.Options(
                        10, TimeUnit.MINUTES,
                        10, TimeUnit.MINUTES,
                        true))
                .target(ShikimoriV1Api.class, baseUrl);
    }
}
