package com.a1tSign.shikiadapter.controller;

import com.a1tSign.shikiadapter.contracts.dto.to.TokenRequest;
import com.a1tSign.shikiadapter.contracts.dto.to.TokenTo;
import com.a1tSign.shikiadapter.service.admin.AdminService;
import com.a1tSign.shikiadapter.service.security.SecurityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping ("api/v0/auth")
@Tag (name = "Авторизация")
public class AuthenticationController {

    private final SecurityService securityService;
    private final AdminService adminService;

    @PostMapping ("/login")
    @Operation (summary = "Авторизация и получение токена по имени и паролю пользователя")
    public ResponseEntity<TokenTo> getToken(@RequestBody TokenRequest requestDto) {
        return ResponseEntity.ok(securityService.getToken(requestDto));
    }

    @PostMapping("/register")
    @Operation(summary = "Регистрация пользователя")
    public ResponseEntity<TokenRequest> registration(@Valid @RequestBody TokenRequest registerRequestDto) {
        return new ResponseEntity<>(adminService.addModerator(registerRequestDto), HttpStatus.CREATED);
    }
}
