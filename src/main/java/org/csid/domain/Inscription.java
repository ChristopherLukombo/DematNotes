package org.csid.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Inscription.
 */
@Entity
@Table(name = "inscription")
public class Inscription implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    private School school;

    @ManyToOne
    private Classroom classroom;

    @ManyToOne
    private SchoolYear schoolYear;

    @ManyToMany
    @JoinTable(name = "inscription_student",
               joinColumns = @JoinColumn(name="inscriptions_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="students_id", referencedColumnName="id"))
    private Set<Student> students = new HashSet<>();

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

    public Inscription school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public Inscription classroom(Classroom classroom) {
        this.classroom = classroom;
        return this;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public SchoolYear getSchoolYear() {
        return schoolYear;
    }

    public Inscription schoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
        return this;
    }

    public void setSchoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public Inscription students(Set<Student> students) {
        this.students = students;
        return this;
    }

    public Inscription addStudent(Student student) {
        this.students.add(student);
        return this;
    }

    public Inscription removeStudent(Student student) {
        this.students.remove(student);
        return this;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
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
        Inscription inscription = (Inscription) o;
        if (inscription.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inscription.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Inscription{" +
            "id=" + getId() +
            "}";
    }
}
