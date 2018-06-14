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
    @Column(name = "entitled", nullable = false)
    private String entitled;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "option_module", nullable = false)
    private Boolean optionModule;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntitled() {
        return entitled;
    }

    public Module entitled(String entitled) {
        this.entitled = entitled;
        return this;
    }

    public void setEntitled(String entitled) {
        this.entitled = entitled;
    }

    public String getDescription() {
        return description;
    }

    public Module description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
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
            ", entitled='" + getEntitled() + "'" +
            ", description='" + getDescription() + "'" +
            ", optionModule='" + isOptionModule() + "'" +
            "}";
    }
}
