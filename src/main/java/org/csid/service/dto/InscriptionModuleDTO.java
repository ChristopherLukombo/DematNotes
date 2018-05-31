package org.csid.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the InscriptionModule entity.
 */
public class InscriptionModuleDTO implements Serializable {

    private Long id;

    @NotNull
    private LocalDate inscriptionDate;

    @Size(max = 10)
    private String validation;

    @NotNull
    private String yearPeriod;

    private Long moduleId;

    private Long studentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getInscriptionDate() {
        return inscriptionDate;
    }

    public void setInscriptionDate(LocalDate inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
    }

    public String getValidation() {
        return validation;
    }

    public void setValidation(String validation) {
        this.validation = validation;
    }

    public String getYearPeriod() {
        return yearPeriod;
    }

    public void setYearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
    }

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        InscriptionModuleDTO inscriptionModuleDTO = (InscriptionModuleDTO) o;
        if(inscriptionModuleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inscriptionModuleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InscriptionModuleDTO{" +
            "id=" + getId() +
            ", inscriptionDate='" + getInscriptionDate() + "'" +
            ", validation='" + getValidation() + "'" +
            ", yearPeriod='" + getYearPeriod() + "'" +
            "}";
    }
}
