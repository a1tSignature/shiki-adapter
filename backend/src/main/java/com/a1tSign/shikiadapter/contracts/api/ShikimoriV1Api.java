package com.a1tSign.shikiadapter.contracts.api;

import com.a1tSign.shikiadapter.contracts.dto.from.ShikimoriTokenDataFrom;
import com.a1tSign.shikiadapter.contracts.dto.from.ShikimoriUserDataDto;
import com.a1tSign.shikiadapter.contracts.dto.from.TitleFrom;
import feign.Headers;
import feign.Param;
import feign.RequestLine;

import java.util.List;

/**
 * Shikimori-api-v1.
 */
//@Headers ({
//        "Accept: application/json",
//        "Content-Type: application/json"
//})
public interface ShikimoriV1Api {
    @Headers({"Authorization: Bearer {auth}",
            "User-Agent: shiki-adapter-back"})
    @RequestLine("GET /api/animes?page={page}&limit=50")
    List<TitleFrom> getShikimoriTitles(@Param  Integer page);

    @Headers({"User-Agent: shiki-adapter-back",
            "Content-Type: application/x-www-form-urlencoded"})
    @RequestLine("POST /oauth/token?grant_type={grant_type}&client_id={client_id}&client_secret={client_secret}" +
            "&code={code}&redirect_uri={redirect_uri}")
    ShikimoriTokenDataFrom getToken(@Param("grant_type") String grantType, @Param("client_id") String clientId,
                                    @Param("client_secret") String clientSecret, @Param("code") String code,
                                    @Param("redirect_uri") String redirectUri);

    @Headers({"User-Agent: shiki-adapter-back",
              "Authorization: Bearer {auth}"})
    @RequestLine("GET /api/users/whoami")
    ShikimoriUserDataDto getCurrentUser(@Param String auth);




}
