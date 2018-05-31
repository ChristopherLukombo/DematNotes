package org.csid.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SchoolReport entity.
 */
public class SchoolReportDTO implements Serializable {

    private Long id;

    @NotNull
    private String yearPeriod;

    private String gradeAword;

    private String comment;

    private LocalDate creationDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYearPeriod() {
        return yearPeriod;
    }

    public void setYearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
    }

    public String getGradeAword() {
        return gradeAword;
    }

    public void setGradeAword(String gradeAword) {
        this.gradeAword = gradeAword;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SchoolReportDTO schoolReportDTO = (SchoolReportDTO) o;
        if(schoolReportDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schoolReportDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SchoolReportDTO{" +
            "id=" + getId() +
            ", yearPeriod='" + getYearPeriod() + "'" +
            ", gradeAword='" + getGradeAword() + "'" +
            ", comment='" + getComment() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
