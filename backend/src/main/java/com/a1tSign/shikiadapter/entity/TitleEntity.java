package com.a1tSign.shikiadapter.entity;

import com.a1tSign.shikiadapter.contracts.enums.TitleStatus;
import com.a1tSign.shikiadapter.contracts.enums.TitleType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "titles")
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
    private Map<String, List<String>> content = new HashMap<>();

    @Column(name = "kind")
    private TitleType kind;

    @Column(name = "status")
    private TitleStatus status;
}