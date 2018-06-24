package org.csid.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AssignmentManager.
 */
@Entity
@Table(name = "assignment_manager")
public class AssignmentManager implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private SchoolYear schoolYear;

    @ManyToOne
    private School school;

    @ManyToMany
    @JoinTable(name = "assignment_manager_manager",
               joinColumns = @JoinColumn(name="assignment_managers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="managers_id", referencedColumnName="id"))
    private Set<Manager> managers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SchoolYear getSchoolYear() {
        return schoolYear;
    }

    public AssignmentManager schoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
        return this;
    }

    public void setSchoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
    }

    public School getSchool() {
        return school;
    }

    public AssignmentManager school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public Set<Manager> getManagers() {
        return managers;
    }

    public AssignmentManager managers(Set<Manager> managers) {
        this.managers = managers;
        return this;
    }

    public AssignmentManager addManager(Manager manager) {
        this.managers.add(manager);
        return this;
    }

    public AssignmentManager removeManager(Manager manager) {
        this.managers.remove(manager);
        return this;
    }

    public void setManagers(Set<Manager> managers) {
        this.managers = managers;
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
        AssignmentManager assignmentManager = (AssignmentManager) o;
        if (assignmentManager.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignmentManager.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssignmentManager{" +
            "id=" + getId() +
            "}";
    }
}
