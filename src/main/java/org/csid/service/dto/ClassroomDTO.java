package org.csid.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Classroom entity.
 */
public class ClassroomDTO implements Serializable {

    private Long id;

    @NotNull
    private String entitled;

    private String option;

    private String division;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntitled() {
        return entitled;
    }

    public void setEntitled(String entitled) {
        this.entitled = entitled;
    }

    public String getOption() {
        return option;
    }

    public void setOption(String option) {
        this.option = option;
    }

    public String getDivision() {
        return division;
    }

    public void setDivision(String division) {
        this.division = division;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ClassroomDTO classroomDTO = (ClassroomDTO) o;
        if(classroomDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), classroomDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClassroomDTO{" +
            "id=" + getId() +
            ", entitled='" + getEntitled() + "'" +
            ", option='" + getOption() + "'" +
            ", division='" + getDivision() + "'" +
            "}";
    }
}
