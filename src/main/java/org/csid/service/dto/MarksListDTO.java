package org.csid.service.dto;

import org.csid.domain.Evaluation;

import java.util.List;

public class MarksListDTO {
    private List<Evaluation> evaluations;

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }

    public void setEvaluations(List<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }
}
