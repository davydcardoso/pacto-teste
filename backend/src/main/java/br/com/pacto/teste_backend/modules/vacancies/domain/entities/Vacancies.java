package br.com.pacto.teste_backend.modules.vacancies.domain.entities;

import br.com.pacto.teste_backend.modules.users.domain.entities.Users;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "vacancies")
@NoArgsConstructor
@AllArgsConstructor
public class Vacancies {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String title;
    private String descriptions;
    private List<String> requirements;
    @Nullable
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "updated_at")
    private Date updatedAt;

    @JsonManagedReference
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @ManyToMany
    @JoinTable(
            name = "vacancies_user",
            joinColumns = @JoinColumn(name = "vacancy_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Users> users;

    public Vacancies(String title, String description, List<String> requirements, Date createdAt) {
        this.title = title;
        this.descriptions = description;
        this.requirements = requirements;
        this.createdAt = createdAt;
    }

    public Vacancies(String title, String description, List<String> requirements,Date createdAt, Date updatedAt) {
        this.title = title;
        this.descriptions = description;
        this.requirements = requirements;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Vacancies(UUID id, String title, String description, List<String> requirements, Date createdAt, Date updatedAt) {
        this.id = id;
        this.title = title;
        this.descriptions = description;
        this.requirements = requirements;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
