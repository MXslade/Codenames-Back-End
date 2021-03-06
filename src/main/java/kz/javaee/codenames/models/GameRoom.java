package kz.javaee.codenames.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "game_room")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "config")
    @Type(type = "text")
    private String config;

    @Column(name = "max_number_of_players", nullable = false)
    private String maxNumberOfPlayers;

    @Column(name = "language", nullable = false)
    private String language;

    @Column(name = "is_active", nullable = false)
    private boolean isActive;

    @ManyToMany(fetch = FetchType.EAGER)
    private List<User> users;

}
