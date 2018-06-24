package org.csid.service.dto;


import java.time.LocalDate;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the SchoolReport entity.
 */
public class SchoolReportDTO implements Serializable {

    private Long id;

    private String gradeAword;

    private String comment;

    private LocalDate creationDate;

    private Long yearPeriodId;

    private Long studentId;

    private Long managerId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getYearPeriodId() {
        return yearPeriodId;
    }

    public void setYearPeriodId(Long yearPeriodId) {
        this.yearPeriodId = yearPeriodId;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
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
            ", gradeAword='" + getGradeAword() + "'" +
            ", comment='" + getComment() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
