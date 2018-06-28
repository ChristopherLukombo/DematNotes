package org.csid.domain.non.persistant;

import org.csid.domain.Evaluation;

import java.io.Serializable;
import java.util.List;

public class MarksList implements Serializable {
    private List<Evaluation> evaluations;

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }

    public void setEvaluations(List<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

}
