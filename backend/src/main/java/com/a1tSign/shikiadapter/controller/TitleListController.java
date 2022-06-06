package com.a1tSign.shikiadapter.controller;

import com.a1tSign.shikiadapter.contracts.api.ShikimoriV1Api;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleListTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.service.titlelist.TitleListService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v0/title-list")
@RequiredArgsConstructor
public class TitleListController {
    private final TitleListService titleListService;
    private final ShikimoriV1Api shikimoriV1Api;

    @PostMapping("/{list}")
    @ApiResponse (responseCode = "404", description = "Title not found",
            content = @Content)
    public ResponseEntity<TitleListTo> findParticularList(@PathVariable String list, @RequestParam String token,
                                                          @RequestBody TitleTo title) {
        var username = shikimoriV1Api.getCurrentUser(token).getId();
        return new ResponseEntity<>(titleListService.findParticularTitleListOfUser(username, list),
                HttpStatus.OK);
    }

    @GetMapping("/fetch/all-lists")
    public ResponseEntity<List<TitleListTo>> findAllListsByUser(@RequestParam String token) {
        var username = shikimoriV1Api.getCurrentUser(token).getId();
        return new ResponseEntity<>(titleListService.findAllByUsername(username), HttpStatus.OK);
    }

    @PostMapping("/{list}/add")
    public ResponseEntity<Boolean> addTitleInList(@PathVariable String list, @RequestParam String token,
                                                  @RequestBody TitleTo titleTo) {
        var username = shikimoriV1Api.getCurrentUser(token).getId();
        return new ResponseEntity<>(titleListService.addTitle(titleTo, username, list), HttpStatus.OK);
    }

    @PostMapping("/{list}/remove")
    public ResponseEntity<Boolean> removeTiteFromList(@PathVariable String list, @RequestParam String token,
                                                      @RequestBody TitleTo titleTo) {
        var username = shikimoriV1Api.getCurrentUser(token).getId();
        return new ResponseEntity<>(titleListService.removeTitleFromList(titleTo, list, username), HttpStatus.OK);
    }

}
