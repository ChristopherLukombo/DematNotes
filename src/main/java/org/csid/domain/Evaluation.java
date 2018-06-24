package org.csid.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Evaluation.
 */
@Entity
@Table(name = "evaluation")
public class Evaluation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "average", nullable = false)
    private Double average;

    @NotNull
    @Column(name = "evaluation_date", nullable = false)
    private ZonedDateTime evaluationDate;

    @Column(name = "jhi_comment")
    private String comment;

    @Size(max = 10)
    @Column(name = "jhi_validation", length = 10)
    private String validation;

    @ManyToOne
    private Student student;

    @ManyToOne
    private Module module;

    @ManyToOne
    private Teacher teacher;

    @ManyToOne
    private SchoolReport schoolReport;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAverage() {
        return average;
    }

    public Evaluation average(Double average) {
        this.average = average;
        return this;
    }

    public void setAverage(Double average) {
        this.average = average;
    }

    public ZonedDateTime getEvaluationDate() {
        return evaluationDate;
    }

    public Evaluation evaluationDate(ZonedDateTime evaluationDate) {
        this.evaluationDate = evaluationDate;
        return this;
    }

    public void setEvaluationDate(ZonedDateTime evaluationDate) {
        this.evaluationDate = evaluationDate;
    }

    public String getComment() {
        return comment;
    }

    public Evaluation comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getValidation() {
        return validation;
    }

    public Evaluation validation(String validation) {
        this.validation = validation;
        return this;
    }

    public void setValidation(String validation) {
        this.validation = validation;
    }

    public Student getStudent() {
        return student;
    }

    public Evaluation student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Module getModule() {
        return module;
    }

    public Evaluation module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public Evaluation teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public SchoolReport getSchoolReport() {
        return schoolReport;
    }

    public Evaluation schoolReport(SchoolReport schoolReport) {
        this.schoolReport = schoolReport;
        return this;
    }

    public void setSchoolReport(SchoolReport schoolReport) {
        this.schoolReport = schoolReport;
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
        Evaluation evaluation = (Evaluation) o;
        if (evaluation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evaluation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evaluation{" +
            "id=" + getId() +
            ", average=" + getAverage() +
            ", evaluationDate='" + getEvaluationDate() + "'" +
            ", comment='" + getComment() + "'" +
            ", validation='" + getValidation() + "'" +
            "}";
    }
}
