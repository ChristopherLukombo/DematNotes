package org.csid.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A AssignmentModule.
 */
@Entity
@Table(name = "assignment_module")
public class AssignmentModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "coefficient")
    private Float coefficient;

    @ManyToOne
    private Classroom classroom;

    @ManyToOne
    private School school;

    @ManyToOne
    private SchoolYear schoolYear;

    @ManyToMany
    @JoinTable(name = "assignment_module_teacher",
               joinColumns = @JoinColumn(name="assignment_modules_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="teachers_id", referencedColumnName="id"))
    private Set<Teacher> teachers = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "assignment_module_module",
               joinColumns = @JoinColumn(name="assignment_modules_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="modules_id", referencedColumnName="id"))
    private Set<Module> modules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCoefficient() {
        return coefficient;
    }

    public AssignmentModule coefficient(Float coefficient) {
        this.coefficient = coefficient;
        return this;
    }

    public void setCoefficient(Float coefficient) {
        this.coefficient = coefficient;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public AssignmentModule classroom(Classroom classroom) {
        this.classroom = classroom;
        return this;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public School getSchool() {
        return school;
    }

    public AssignmentModule school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
    }

    public SchoolYear getSchoolYear() {
        return schoolYear;
    }

    public AssignmentModule schoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
        return this;
    }

    public void setSchoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
    }

    public Set<Teacher> getTeachers() {
        return teachers;
    }

    public AssignmentModule teachers(Set<Teacher> teachers) {
        this.teachers = teachers;
        return this;
    }

    public AssignmentModule addTeacher(Teacher teacher) {
        this.teachers.add(teacher);
        return this;
    }

    public AssignmentModule removeTeacher(Teacher teacher) {
        this.teachers.remove(teacher);
        return this;
    }

    public void setTeachers(Set<Teacher> teachers) {
        this.teachers = teachers;
    }

    public Set<Module> getModules() {
        return modules;
    }

    public AssignmentModule modules(Set<Module> modules) {
        this.modules = modules;
        return this;
    }

    public AssignmentModule addModule(Module module) {
        this.modules.add(module);
        return this;
    }

    public AssignmentModule removeModule(Module module) {
        this.modules.remove(module);
        return this;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
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
        AssignmentModule assignmentModule = (AssignmentModule) o;
        if (assignmentModule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignmentModule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssignmentModule{" +
            "id=" + getId() +
            ", coefficient=" + getCoefficient() +
            "}";
    }
}
