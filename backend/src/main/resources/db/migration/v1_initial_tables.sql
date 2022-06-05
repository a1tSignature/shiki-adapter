create table title (
    title_id uuid not null primary key,
    shikimori_id int4 unique,
    name varchar unique,
    original_image_link varchar,
    content jsonb,
    kind varchar,
    status varchar
);

create table title_lists (
    title_list_id uuid not null primary key,
    name varchar,
    username varchar
);

create table list_titles (
    title_list_id uuid constraint title_list_id_fk references title_lists(title_list_id),
    title_id uuid constraint title_id_fk references title(title_id)
);

create table administration (
    id uuid not null primary key,
    username varchar unique,
    password varchar,
    role varchar
);