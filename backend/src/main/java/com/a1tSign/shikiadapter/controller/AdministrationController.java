package com.a1tSign.shikiadapter.controller;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;
import com.a1tSign.shikiadapter.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v0/admin")
@RequiredArgsConstructor
public class AdministrationController {
    //TODO: Mocked. Need to create

    private final AdminService adminService;

    @GetMapping("/all-moderators")
    public ResponseEntity<List<ModeratorTo>> getAllModerators() {
        return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<ModeratorTo> addModerator(@RequestBody ModeratorTo moderator) {
        return new ResponseEntity<>(moderator, HttpStatus.OK);
    }

    @DeleteMapping("/{username}/delete")
    public ResponseEntity<ModeratorTo> deleteModerator(@PathVariable String username) {
        return new ResponseEntity<>(new ModeratorTo(), HttpStatus.OK);
    }

    @PutMapping("/{username}/update")
    public ResponseEntity<ModeratorTo> updateModerator(@PathVariable String username,
                                                       @RequestBody ModeratorTo moderator) {
        return new ResponseEntity<>(new ModeratorTo(), HttpStatus.OK);
    }
}
