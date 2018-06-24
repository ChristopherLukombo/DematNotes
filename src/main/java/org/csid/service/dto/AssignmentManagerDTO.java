package org.csid.service.dto;


import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the AssignmentManager entity.
 */
public class AssignmentManagerDTO implements Serializable {

    private Long id;

    private Long schoolYearId;

    private Long schoolId;

    private Set<ManagerDTO> managers = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSchoolYearId() {
        return schoolYearId;
    }

    public void setSchoolYearId(Long schoolYearId) {
        this.schoolYearId = schoolYearId;
    }

    public Long getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(Long schoolId) {
        this.schoolId = schoolId;
    }

    public Set<ManagerDTO> getManagers() {
        return managers;
    }

    public void setManagers(Set<ManagerDTO> managers) {
        this.managers = managers;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AssignmentManagerDTO assignmentManagerDTO = (AssignmentManagerDTO) o;
        if(assignmentManagerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), assignmentManagerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AssignmentManagerDTO{" +
            "id=" + getId() +
            "}";
    }
}
