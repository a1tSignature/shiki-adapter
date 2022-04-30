package com.a1tSign.shikiadapter.contracts.dto.to;

import com.a1tSign.shikiadapter.contracts.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
public class ModeratorTo {
    private UUID id;
    private String username;
    private Role role;
}
