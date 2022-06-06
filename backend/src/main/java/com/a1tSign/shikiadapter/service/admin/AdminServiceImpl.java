package com.a1tSign.shikiadapter.service.admin;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;
import com.a1tSign.shikiadapter.repository.AdministrationRepository;
import com.a1tSign.shikiadapter.util.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdministrationRepository administrationRepository;

    @Override
    public List<ModeratorTo> findAllModerators() {
        return administrationRepository.findAllModerators().stream()
                .map(Mapper::fromAdministrationEntity)
                .collect(Collectors.toList());
    }

    @Override
    public ModeratorTo addModerator(ModeratorTo moderator) {
        var entity = Mapper.toAdministrationEntity(moderator, "");
        administrationRepository.save(entity);

        return moderator;
    }

    @Override
    public ModeratorTo deleteModerator(String username) {
        return Mapper.fromAdministrationEntity(administrationRepository.deleteByName(username));
    }

    @Override
    public ModeratorTo updateModerator(String username, ModeratorTo moderatorTo) {

        return null;
    }
}
