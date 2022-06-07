package com.a1tSign.shikiadapter.service.admin;

import com.a1tSign.shikiadapter.contracts.dto.to.ModeratorTo;
import com.a1tSign.shikiadapter.contracts.dto.to.TokenRequest;
import com.a1tSign.shikiadapter.contracts.exception.ShikiAdapterException;
import com.a1tSign.shikiadapter.repository.AdministrationRepository;
import com.a1tSign.shikiadapter.util.Mapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

    private final AdministrationRepository administrationRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public List<ModeratorTo> findAllModerators() {
        return administrationRepository.findAllModerators().stream()
                .map(Mapper::fromAdministrationEntity)
                .collect(Collectors.toList());
    }


    @Override
    public TokenRequest addModerator(TokenRequest moderator) {
        var entity = Mapper.toAdministrationEntity(moderator,
                passwordEncoder.encode(moderator.getPassword()));
        administrationRepository.save(entity);

        return moderator;
    }

    @Override
    @Transactional
    public Boolean deleteModerator(String username) {
        administrationRepository.deleteByUsername(username);
        return true;
    }

    @Override
    public Boolean updateModerator(String username, TokenRequest moderatorTo) {
        var entity = administrationRepository.findByUsername(username);
        entity.setUsername(moderatorTo.getUsername());
        entity.setPassword(passwordEncoder.encode(moderatorTo.getPassword()));
        administrationRepository.save(entity);

        return true;
    }

    @Override
    public ModeratorTo findModeratorByRequest(TokenRequest tokenRequest) {
        var moderator = administrationRepository.findByUsername(tokenRequest.getUsername());

        if (moderator == null || !passwordEncoder.matches(tokenRequest.getPassword(), moderator.getPassword())) {
            throw new ShikiAdapterException("There is no moderator with username: " + tokenRequest.getUsername(), "MODERATOR_WAS_NOT_FOUND");
        }
        return Mapper.fromAdministrationEntity(moderator);
    }
}
