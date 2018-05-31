package org.csid.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SchoolReport.
 */
@Entity
@Table(name = "school_report")
public class SchoolReport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "year_period", nullable = false)
    private String yearPeriod;

    @Column(name = "grade_aword")
    private String gradeAword;

    @Column(name = "jhi_comment")
    private String comment;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @OneToMany(mappedBy = "schoolReport")
    @JsonIgnore
    private Set<Evaluation> evaluations = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getYearPeriod() {
        return yearPeriod;
    }

    public SchoolReport yearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
        return this;
    }

    public void setYearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
    }

    public String getGradeAword() {
        return gradeAword;
    }

    public SchoolReport gradeAword(String gradeAword) {
        this.gradeAword = gradeAword;
        return this;
    }

    public void setGradeAword(String gradeAword) {
        this.gradeAword = gradeAword;
    }

    public String getComment() {
        return comment;
    }

    public SchoolReport comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public SchoolReport creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Set<Evaluation> getEvaluations() {
        return evaluations;
    }

    public SchoolReport evaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
        return this;
    }

    public SchoolReport addEvaluations(Evaluation evaluation) {
        this.evaluations.add(evaluation);
        evaluation.setSchoolReport(this);
        return this;
    }

    public SchoolReport removeEvaluations(Evaluation evaluation) {
        this.evaluations.remove(evaluation);
        evaluation.setSchoolReport(null);
        return this;
    }

    public void setEvaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
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
        SchoolReport schoolReport = (SchoolReport) o;
        if (schoolReport.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), schoolReport.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SchoolReport{" +
            "id=" + getId() +
            ", yearPeriod='" + getYearPeriod() + "'" +
            ", gradeAword='" + getGradeAword() + "'" +
            ", comment='" + getComment() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
