package org.csid.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Intervention.
 */
@Entity
@Table(name = "intervention")
public class Intervention implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "jhi_type", nullable = false)
    private String type;

    @NotNull
    @Column(name = "year_period", nullable = false)
    private String yearPeriod;

    @NotNull
    @Column(name = "start_date", nullable = false)
    private ZonedDateTime startDate;

    @NotNull
    @Column(name = "end_date", nullable = false)
    private ZonedDateTime endDate;

    @ManyToOne
    private Module module;

    @ManyToMany
    @JoinTable(name = "intervention_teacher",
               joinColumns = @JoinColumn(name="interventions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="teachers_id", referencedColumnName="id"))
    private Set<Teacher> teachers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public Intervention type(String type) {
        this.type = type;
        return this;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getYearPeriod() {
        return yearPeriod;
    }

    public Intervention yearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
        return this;
    }

    public void setYearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
    }

    public ZonedDateTime getStartDate() {
        return startDate;
    }

    public Intervention startDate(ZonedDateTime startDate) {
        this.startDate = startDate;
        return this;
    }

    public void setStartDate(ZonedDateTime startDate) {
        this.startDate = startDate;
    }

    public ZonedDateTime getEndDate() {
        return endDate;
    }

    public Intervention endDate(ZonedDateTime endDate) {
        this.endDate = endDate;
        return this;
    }

    public void setEndDate(ZonedDateTime endDate) {
        this.endDate = endDate;
    }

    public Module getModule() {
        return module;
    }

    public Intervention module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public Intervention teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public Intervention addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        return this;
    }

    public Intervention removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Intervention intervention = (Intervention) o;
        if (intervention.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), intervention.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Intervention{" +
            "id=" + getId() +
            ", type='" + getType() + "'" +
            ", yearPeriod='" + getYearPeriod() + "'" +
            ", startDate='" + getStartDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
