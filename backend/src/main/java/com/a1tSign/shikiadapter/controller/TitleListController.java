package com.a1tSign.shikiadapter.controller;

import com.a1tSign.shikiadapter.contracts.dto.to.TitleListTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TitleTo;
import com.a1tSign.shikiadapter.service.titlelist.TitleListService;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
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

    //TODO: Временная реализация с именем пользователя, при применении секьюрити заменить на нормальное

    @GetMapping("/{list}")
    public ResponseEntity<TitleListTo> findParticularList(@PathVariable String list, @RequestParam String username) {
        return new ResponseEntity<>(titleListService.findParticularTitleListOfUser(list, username),
                HttpStatus.OK);
    }

    @GetMapping("/all-lists")
    public ResponseEntity<List<TitleListTo>> findAllListsByUser(@RequestParam String username) {
        return new ResponseEntity<>(titleListService.findAllByUsername(username), HttpStatus.OK);
    }

    @PostMapping("/{list}/add")
    public ResponseEntity<Boolean> addTitleInList(@RequestBody TitleTo titleTo, @RequestParam String username,
                                                  @PathVariable String list) {
        return new ResponseEntity<>(titleListService.addTitle(titleTo, username, list), HttpStatus.OK);
    }



}
