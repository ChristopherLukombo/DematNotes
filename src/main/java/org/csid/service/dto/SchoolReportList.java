package org.csid.service.dto;

import org.csid.domain.Evaluation;
import org.csid.domain.Module;

import java.util.List;

public class SchoolReportList {
    private List<Evaluation> evaluations;
    private List<Module> modules;

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }

    public void setEvaluations(List<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }
}
