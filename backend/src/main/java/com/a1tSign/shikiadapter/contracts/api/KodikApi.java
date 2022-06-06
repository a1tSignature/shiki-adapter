package com.a1tSign.shikiadapter.contracts.api;

import com.a1tSign.shikiadapter.contracts.dto.from.kodik.KodikResponseDto;
import feign.Headers;
import feign.Param;
import feign.RequestLine;

import java.util.List;

/**
 * Rest-api for kodik.
 */
@Headers ({
        "Accept: application/json",
        "Content-Type: application/json"
})
public interface KodikApi {

    /**
     * Querying anime by shikimori id.
     *
     * @param token kodik token.
     * @param id shikimori_id of title.
     * @param isCamrip is camrips included.
     * @param translationType prioritized type of translation {@link com.a1tSign.shikiadapter.contracts.enums.kodik.TranslationType}
     * @return dto of the response of the api.
     */
    @RequestLine("POST /search?token={token}&shikimori_id={id}&camrip={isCamrip}" +
            "&prioritize_translation_type={translationType}&not_blocked_in={blocked}&with_episodes=true&limit=5")
    KodikResponseDto getAnimesByShikimoriId(@Param String token, @Param Integer id, @Param String translationType,
                                            @Param Boolean isCamrip, @Param String blocked);

    /**
     * Querying anime by russian title name.
     *
     * @param token kodik token.
     * @param name russian name of title.
     * @param isCamrip is camrips included.
     * @param translationType prioritized type of translation {@link com.a1tSign.shikiadapter.contracts.enums.kodik.TranslationType}
     * @return dto of the response of the api.
     */
    @RequestLine("POST /search?token={token}&title={name}&camrip={isCamrip}" +
            "&prioritize_translation_type={translationType}")
    KodikResponseDto getAnimesByTitleName(@Param String token, @Param String name, @Param String translationType,
                               @Param Boolean isCamrip);

    /**
     * Querying anime by original title name.
     *
     * @param token kodik token.
     * @param name original name of title.
     * @param isCamrip is camrips included.
     * @param translationType prioritized type of translation {@link com.a1tSign.shikiadapter.contracts.enums.kodik.TranslationType}
     * @return dto of the response of the api.
     */
    @RequestLine("POST /search?token={token}&title_orig={name}&camrip={isCamrip}" +
            "&prioritize_translation_type={translationType}")
    KodikResponseDto getAnimesByTitleOriginalName(@Param String token, @Param String name, @Param String translationType,
                                          @Param Boolean isCamrip);
}
