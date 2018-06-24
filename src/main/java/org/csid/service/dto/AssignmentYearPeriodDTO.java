package org.csid.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the AssignmentYearPeriod entity.
 */
public class AssignmentYearPeriodDTO implements Serializable {

    private Long id;

    private Long schoolId;

    private Set<YearPeriodDTO> yearPeriods = new HashSet<>();

    private Set<ClassroomDTO> classrooms = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public Set<YearPeriodDTO> getYearPeriods() {
        return yearPeriods;
    }

    public void setYearPeriods(Set<YearPeriodDTO> yearPeriods) {
        this.yearPeriods = yearPeriods;
    }

    public Set<ClassroomDTO> getClassrooms() {
        return classrooms;
    }

    public void setClassrooms(Set<ClassroomDTO> classrooms) {
        this.classrooms = classrooms;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AssignmentYearPeriodDTO assignmentYearPeriodDTO = (AssignmentYearPeriodDTO) o;
        if(assignmentYearPeriodDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignmentYearPeriodDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssignmentYearPeriodDTO{" +
            "id=" + getId() +
            "}";
    }
}
