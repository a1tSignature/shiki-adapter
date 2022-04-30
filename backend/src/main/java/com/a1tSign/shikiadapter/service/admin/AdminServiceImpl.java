package com.a1tSign.shikiadapter.service.admin;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;
import com.a1tSign.shikiadapter.repository.AdministrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdministrationRepository administrationRepository;

    @Override
    public List<ModeratorTo> findAllModerators() {
        return null;
    }

    @Override
    public ModeratorTo addModerator(ModeratorTo moderator) {
        return null;
    }

    @Override
    public ModeratorTo deleteModerator(String username) {
        return null;
    }

    @Override
    public ModeratorTo updateModerator(String username, ModeratorTo moderatorTo) {
        return null;
    }
}
