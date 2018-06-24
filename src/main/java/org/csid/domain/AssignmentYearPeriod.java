package org.csid.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AssignmentYearPeriod.
 */
@Entity
@Table(name = "assignment_year_period")
public class AssignmentYearPeriod implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private School school;

    @ManyToMany
    @JoinTable(name = "assignment_year_period_year_period",
               joinColumns = @JoinColumn(name="assignment_year_periods_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="year_periods_id", referencedColumnName="id"))
    private Set<YearPeriod> yearPeriods = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "assignment_year_period_classroom",
               joinColumns = @JoinColumn(name="assignment_year_periods_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="classrooms_id", referencedColumnName="id"))
    private Set<Classroom> classrooms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public School getSchool() {
        return school;
    }

    public AssignmentYearPeriod school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public Set<YearPeriod> getYearPeriods() {
        return yearPeriods;
    }

    public AssignmentYearPeriod yearPeriods(Set<YearPeriod> yearPeriods) {
        this.yearPeriods = yearPeriods;
        return this;
    }

    public AssignmentYearPeriod addYearPeriod(YearPeriod yearPeriod) {
        this.yearPeriods.add(yearPeriod);
        return this;
    }

    public AssignmentYearPeriod removeYearPeriod(YearPeriod yearPeriod) {
        this.yearPeriods.remove(yearPeriod);
        return this;
    }

    public void setYearPeriods(Set<YearPeriod> yearPeriods) {
        this.yearPeriods = yearPeriods;
    }

    public Set<Classroom> getClassrooms() {
        return classrooms;
    }

    public AssignmentYearPeriod classrooms(Set<Classroom> classrooms) {
        this.classrooms = classrooms;
        return this;
    }

    public AssignmentYearPeriod addClassroom(Classroom classroom) {
        this.classrooms.add(classroom);
        return this;
    }

    public AssignmentYearPeriod removeClassroom(Classroom classroom) {
        this.classrooms.remove(classroom);
        return this;
    }

    public void setClassrooms(Set<Classroom> classrooms) {
        this.classrooms = classrooms;
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
        AssignmentYearPeriod assignmentYearPeriod = (AssignmentYearPeriod) o;
        if (assignmentYearPeriod.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignmentYearPeriod.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssignmentYearPeriod{" +
            "id=" + getId() +
            "}";
    }
}
