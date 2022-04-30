package com.a1tSign.shikiadapter.service.admin;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;

import java.util.List;

public interface AdminService {

    List<ModeratorTo> findAllModerators();

    ModeratorTo addModerator(ModeratorTo moderator);

    ModeratorTo deleteModerator(String username);

    ModeratorTo updateModerator(String username, ModeratorTo moderatorTo);
}
