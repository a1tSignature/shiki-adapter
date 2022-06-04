package com.a1tSign.shikiadapter.controller;

import com.a1tSign.shikiadapter.contracts.api.KodikApi;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.exception.ShikiAdapterException;
import com.a1tSign.shikiadapter.service.title.TitleService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v0/title")
@RequiredArgsConstructor
public class TitleController {

    private final TitleService titleService;
    private final KodikApi kodikApi;

    @GetMapping("")
    @ApiResponse (responseCode = "404", description = "Title not found",
            content = @Content)
    public ResponseEntity<TitleTo> findTitleByName(@RequestParam String name) {
        //TODO: If title was not found in database need to query it from web
        var title = titleService.findByName(name);

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
