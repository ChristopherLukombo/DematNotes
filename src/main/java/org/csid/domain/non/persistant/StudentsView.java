package org.csid.domain.non.persistant;

import org.csid.domain.Student;
import org.csid.domain.User;

import java.util.List;

public class StudentsView {
    private List<Student> students;
    private List<User> user;

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }
}
