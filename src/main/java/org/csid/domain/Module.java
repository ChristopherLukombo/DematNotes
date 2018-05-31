package org.csid.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Module.
 */
@Entity
@Table(name = "module")
public class Module implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "year_period", nullable = false)
    private String yearPeriod;

    @NotNull
    @Column(name = "option_module", nullable = false)
    private Boolean optionModule;

    @ManyToOne
    private Course course;

    @ManyToOne
    private School school;

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

    public Module yearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
        return this;
    }

    public void setYearPeriod(String yearPeriod) {
        this.yearPeriod = yearPeriod;
    }

    public Boolean isOptionModule() {
        return optionModule;
    }

    public Module optionModule(Boolean optionModule) {
        this.optionModule = optionModule;
        return this;
    }

    public void setOptionModule(Boolean optionModule) {
        this.optionModule = optionModule;
    }

    public Course getCourse() {
        return course;
    }

    public Module course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public School getSchool() {
        return school;
    }

    public Module school(School school) {
        this.school = school;
        return this;
    }

    public void setSchool(School school) {
        this.school = school;
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
        Module module = (Module) o;
        if (module.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), module.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Module{" +
            "id=" + getId() +
            ", yearPeriod='" + getYearPeriod() + "'" +
            ", optionModule='" + isOptionModule() + "'" +
            "}";
    }
}
