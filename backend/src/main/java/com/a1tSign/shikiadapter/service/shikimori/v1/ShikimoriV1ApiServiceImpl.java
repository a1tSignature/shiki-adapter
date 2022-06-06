package com.a1tSign.shikiadapter.service.shikimori.v1;

import com.a1tSign.shikiadapter.contracts.api.ShikimoriV1Api;
import com.a1tSign.shikiadapter.contracts.dto.from.ShikimoriTokenDataFrom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShikimoriV1ApiServiceImpl implements ShikimoriV1ApiService{

    private final ShikimoriV1Api shikimoriV1Api;

    @Value("${api.shikimori-v1.client-id}")
    private String clientId;
    @Value ("${api.shikimori-v1.client-secret}")
    private String clientSecret;

    /**
     * Populate all titles in database.
     */
    public void populateAllTitles() {
        var a = shikimoriV1Api.getShikimoriTitles(1);

        System.err.println(a);
    }

    public ShikimoriTokenDataFrom getToken() {
        var a =  shikimoriV1Api.getToken("authorization_code", "BVHnZI_noTQ-9qDSYkW5CEI5Vum4rGcv5pjn5NYy86M",
                "HVHbiwjEB7Fij7MFn2FYa_efSEr3iwBS4ps4XPyFZhk", "i0GOOP-iJJpoKg6eztOTmFZqtnnf0zKwMgV6Gz-WaH0", "https://shikimori.one/");

        return a;
    }
}
