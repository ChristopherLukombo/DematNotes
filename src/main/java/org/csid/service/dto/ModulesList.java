package org.csid.service.dto;

import org.csid.domain.Module;

import java.util.List;
import java.util.Set;

public class ModulesList {
    private Set<Module> modules;
    private List<Double> coefficients;

    public Set<Module> getModules() {
        return modules;
    }

    public void setModules(Set<Module> modules) {
        this.modules = modules;
    }

    public List<Double> getCoefficients() {
        return coefficients;
    }

    public void setCoefficients(List<Double> coefficients) {
        this.coefficients = coefficients;
    }
}
