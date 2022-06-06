package com.a1tSign.shikiadapter.entity;

import com.a1tSign.shikiadapter.contracts.dto.to.VideoLinkTo;
import com.a1tSign.shikiadapter.contracts.enums.TitleStatus;
import com.a1tSign.shikiadapter.contracts.enums.TitleType;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Accessors(chain = true)
@Table(name = "title")
@TypeDef (name = "jsonb", typeClass = JsonBinaryType.class)
public class TitleEntity {

    @Id
    @Column(name = "title_id")
    private UUID id;

    @Column(name = "name")
    private String name;

    @Column(name = "originalImageLink")
    private String originalImageLink;

    @Type(type = "jsonb")
    @Column(columnDefinition = "jsonb", name = "content")
    private Map<String, List<VideoLinkTo>> content = new HashMap<>();

    @Column(name = "kind")
    @Enumerated (EnumType.STRING)
    private TitleType kind;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private TitleStatus status;

    @Column(name = "shikimori_id")
    private Integer shikimoriId;
}
