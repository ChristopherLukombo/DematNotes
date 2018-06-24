package org.csid.service.dto;


import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Evaluation entity.
 */
public class EvaluationDTO implements Serializable {

    private Long id;

    @NotNull
    private Double average;

    @NotNull
    private ZonedDateTime evaluationDate;

    private String comment;

    @Size(max = 10)
    private String validation;

    private Long studentId;

    private Long moduleId;

    private Long teacherId;

    private Long schoolReportId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAverage() {
        return average;
    }

    public void setAverage(Double average) {
        this.average = average;
    }

    public ZonedDateTime getEvaluationDate() {
        return evaluationDate;
    }

    public void setEvaluationDate(ZonedDateTime evaluationDate) {
        this.evaluationDate = evaluationDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getValidation() {
        return validation;
    }

    public void setValidation(String validation) {
        this.validation = validation;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public Long getSchoolReportId() {
        return schoolReportId;
    }

    public void setSchoolReportId(Long schoolReportId) {
        this.schoolReportId = schoolReportId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        EvaluationDTO evaluationDTO = (EvaluationDTO) o;
        if(evaluationDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluationDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EvaluationDTO{" +
            "id=" + getId() +
            ", average=" + getAverage() +
            ", evaluationDate='" + getEvaluationDate() + "'" +
            ", comment='" + getComment() + "'" +
            ", validation='" + getValidation() + "'" +
            "}";
    }
}
