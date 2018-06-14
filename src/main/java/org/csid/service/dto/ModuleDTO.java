package org.csid.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Module entity.
 */
public class ModuleDTO implements Serializable {

    private Long id;

    @NotNull
    private String entitled;

    private String description;

    @NotNull
    private Boolean optionModule;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isOptionModule() {
        return optionModule;
    }

    public void setOptionModule(Boolean optionModule) {
        this.optionModule = optionModule;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ModuleDTO moduleDTO = (ModuleDTO) o;
        if(moduleDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), moduleDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ModuleDTO{" +
            "id=" + getId() +
            ", entitled='" + getEntitled() + "'" +
            ", description='" + getDescription() + "'" +
            ", optionModule='" + isOptionModule() + "'" +
            "}";
    }
}
