package com.a1tSign.shikiadapter.controller;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.contracts.dto.to.VideoLinkTo;
import com.a1tSign.shikiadapter.contracts.enums.Role;
import com.a1tSign.shikiadapter.contracts.exception.ShikiAdapterException;
import com.a1tSign.shikiadapter.service.security.Roles;
import com.a1tSign.shikiadapter.service.title.TitleService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v0/title")
@RequiredArgsConstructor
public class TitleController {

    private final TitleService titleService;

    @PostMapping("")
    @ApiResponse (responseCode = "404", description = "Title not found",
            content = @Content)
    public ResponseEntity<Map<String, List<VideoLinkTo>>> findTitleByShikimoriId(@RequestBody TitleTo titleTo) {
        var title = titleService.findByShikimoriId(titleTo);

        if (title == null) {
            throw new ShikiAdapterException("Title was not found", "TITLE_WAS_NOT_FOUND");
        }

        return new ResponseEntity<>(title, HttpStatus.OK);
    }

    @RolesAllowed ({Roles.MODERATOR})
    @PostMapping("/update-title")
    public ResponseEntity<TitleTo> updateTitle(@RequestBody TitleTo titleTo) {
        return new ResponseEntity<>(titleService.updateTitle(titleTo), HttpStatus.OK);
    }


}
