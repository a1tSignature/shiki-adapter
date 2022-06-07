package com.a1tSign.shikiadapter.controller;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TokenRequest;
import com.a1tSign.shikiadapter.service.admin.AdminService;
import com.a1tSign.shikiadapter.service.security.Roles;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/v0/admin")
@RequiredArgsConstructor
public class AdministrationController {
    private final AdminService adminService;

    @RolesAllowed ({Roles.ADMIN})
    @GetMapping("/all-moderators")
    public ResponseEntity<List<ModeratorTo>> getAllModerators() {
        return new ResponseEntity<>(adminService.findAllModerators(), HttpStatus.OK);
    }

    @RolesAllowed ({Roles.ADMIN})
    @PostMapping("/create")
    public ResponseEntity<TokenRequest> addModerator(@RequestBody TokenRequest moderator) {
        return new ResponseEntity<>(adminService.addModerator(moderator), HttpStatus.OK);
    }

    @RolesAllowed ({Roles.ADMIN})
    @DeleteMapping("/{username}/delete")
    public ResponseEntity<Boolean> deleteModerator(@PathVariable String username) {
        return new ResponseEntity<>(adminService.deleteModerator(username), HttpStatus.OK);
    }

    @RolesAllowed ({Roles.ADMIN})
    @PutMapping("/{username}/update")
    public ResponseEntity<Boolean> updateModerator(@PathVariable String username,
                                                       @RequestBody TokenRequest moderator) {
        return new ResponseEntity<>(adminService.updateModerator(username, moderator), HttpStatus.OK);
    }
}
