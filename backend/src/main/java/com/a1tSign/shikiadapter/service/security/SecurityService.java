package com.a1tSign.shikiadapter.service.security;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TokenRequest;
import com.a1tSign.shikiadapter.contracts.dto.to.TokenTo;
import com.a1tSign.shikiadapter.security.JwtService;
import com.a1tSign.shikiadapter.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


@Slf4j
@Service
@RequiredArgsConstructor
public class SecurityService {
    private final JwtService jwtService;
    private final AdminService adminService;

    public TokenTo getToken(TokenRequest tokenRequest) {
        var userFromTokenRequest = adminService.findModeratorByRequest(tokenRequest);

        var tokenResponseDto = new TokenTo();
        tokenResponseDto.setToken(jwtService.getToken(userFromTokenRequest));

        return tokenResponseDto;

    }
}
