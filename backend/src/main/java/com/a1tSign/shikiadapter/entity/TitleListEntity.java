package com.a1tSign.shikiadapter.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "title_lists")
public class TitleListEntity {

    @Id
    @Column(name = "title_list_id")
    private UUID id;

    /**
     * Name of the list.
     */
    @Column(name = "name")
    private String name;

    /**
     * Owner username.
     */
    @Column(name = "username")
    private String username;

    /**
     * List of titles belong to the list.
     */
    @ManyToMany
    @JoinTable(
            name = "list_titles",
            joinColumns = @JoinColumn(name = "title_list_id"),
            inverseJoinColumns = @JoinColumn(name = "title_id")
    )
    private List<TitleEntity> titles;


}
