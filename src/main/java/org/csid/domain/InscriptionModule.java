package org.csid.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A InscriptionModule.
 */
@Entity
@Table(name = "inscription_module")
public class InscriptionModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "inscription_date", nullable = false)
    private LocalDate inscriptionDate;

    @Size(max = 10)
    @Column(name = "jhi_validation", length = 10)
    private String validation;

    @NotNull
    @Column(name = "year_period", nullable = false)
    private String yearPeriod;

    @ManyToOne
    private Module module;

    @ManyToOne
    private Student student;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getInscriptionDate() {
        return inscriptionDate;
    }

    public InscriptionModule inscriptionDate(LocalDate inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
        return this;
    }

    public void setInscriptionDate(LocalDate inscriptionDate) {
        this.inscriptionDate = inscriptionDate;
    }

    public String getValidation() {
        return validation;
    }

    public InscriptionModule validation(String validation) {
        this.validation = validation;
        return this;
    }

    public void setValidation(String validation) {
        this.validation = validation;
    }

    public String getYearPeriod() {
        return yearPeriod;
    }

    public InscriptionModule yearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
        return this;
    }

    public void setYearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
    }

    public Module getModule() {
        return module;
    }

    public InscriptionModule module(Module module) {
        this.module = module;
        return this;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public Student getStudent() {
        return student;
    }

    public InscriptionModule student(Student student) {
        this.student = student;
        return this;
    }

    public void setStudent(Student student) {
        this.student = student;
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
        InscriptionModule inscriptionModule = (InscriptionModule) o;
        if (inscriptionModule.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), inscriptionModule.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InscriptionModule{" +
            "id=" + getId() +
            ", inscriptionDate='" + getInscriptionDate() + "'" +
            ", validation='" + getValidation() + "'" +
            ", yearPeriod='" + getYearPeriod() + "'" +
            "}";
    }
}
