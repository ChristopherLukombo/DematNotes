package org.csid.service.non.persistent;

import org.csid.domain.Evaluation;
import org.csid.domain.User;

import java.util.List;

public class Results {
    private User user;
    private List<Evaluation> evaluations;

    public Results(User user, List<Evaluation> evaluations) {
        this.user = user;
        this.evaluations = evaluations;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Evaluation> getEvaluations() {
        return evaluations;
    }

    public void setEvaluations(List<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

}
