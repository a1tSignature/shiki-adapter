package com.a1tSign.shikiadapter.controller;

import com.a1tSign.shikiadapter.contracts.api.KodikApi;
import com.a1tSign.shikiadapter.contracts.api.ShikimoriV1Api;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.dto.to.VideoLinkTo;
import com.a1tSign.shikiadapter.contracts.exception.ShikiAdapterException;
import com.a1tSign.shikiadapter.service.shikimori.v1.ShikimoriV1ApiService;
import com.a1tSign.shikiadapter.service.shikimori.v1.ShikimoriV1ApiServiceImpl;
import com.a1tSign.shikiadapter.service.title.TitleService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v0/title")
@RequiredArgsConstructor
public class TitleController {

    private final TitleService titleService;
    private final ShikimoriV1Api shikimoriV1Api;

    @PostMapping("")
    @ApiResponse (responseCode = "404", description = "Title not found",
            content = @Content)
    public ResponseEntity<Map<String, List<VideoLinkTo>>> findTitleByShikimoriId(@RequestBody TitleTo titleTo) {
        //TODO: If title was not found in database need to query it from web
        var title = titleService.findByShikimoriId(titleTo);

        if (title == null) {
            throw new ShikiAdapterException("Title was not found", "TITLE_WAS_NOT_FOUND");
        }

        return new ResponseEntity<>(title, HttpStatus.OK);
    }

    @PostMapping("/update-title")
    public ResponseEntity<TitleTo> updateTitle(@RequestBody TitleTo titleTo) {
        return new ResponseEntity<>(titleService.updateTitle(titleTo), HttpStatus.OK);
    }


}
