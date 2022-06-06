package com.a1tSign.shikiadapter.service.admin;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TokenRequest;

import java.util.List;

public interface AdminService {

    List<ModeratorTo> findAllModerators();

    TokenRequest addModerator(TokenRequest moderator);

    Boolean deleteModerator(String username);

    Boolean updateModerator(String username, TokenRequest moderatorTo);

    ModeratorTo findModeratorByUsername(String username);
}
