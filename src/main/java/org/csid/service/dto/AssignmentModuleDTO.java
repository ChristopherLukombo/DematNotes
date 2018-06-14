package org.csid.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the AssignmentModule entity.
 */
public class AssignmentModuleDTO implements Serializable {

    private Long id;

    private Float coefficient;

    private Long classroomId;

    private Long schoolId;

    private Long schoolYearId;

    private Set<TeacherDTO> teachers = new HashSet<>();

    private Set<ModuleDTO> modules = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getCoefficient() {
        return coefficient;
    }

    public void setCoefficient(Float coefficient) {
        this.coefficient = coefficient;
    }

    public Long getClassroomId() {
        return classroomId;
    }

    public void setClassroomId(Long classroomId) {
        this.classroomId = classroomId;
    }

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public Long getSchoolYearId() {
        return schoolYearId;
    }

    public void setSchoolYearId(Long schoolYearId) {
        this.schoolYearId = schoolYearId;
    }

    public Set<TeacherDTO> getTeachers() {
        return teachers;
    }

    public void setTeachers(Set<TeacherDTO> teachers) {
        this.teachers = teachers;
    }

    public Set<ModuleDTO> getModules() {
        return modules;
    }

    public void setModules(Set<ModuleDTO> modules) {
        this.modules = modules;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AssignmentModuleDTO assignmentModuleDTO = (AssignmentModuleDTO) o;
        if(assignmentModuleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignmentModuleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssignmentModuleDTO{" +
            "id=" + getId() +
            ", coefficient=" + getCoefficient() +
            "}";
    }
}
