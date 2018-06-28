package org.csid.service.dto;

import org.csid.domain.Student;
import org.csid.domain.User;

import java.util.List;

public class StudentsList {
    private List<Student> students;
    private List<User> users;

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUser(List<User> users) {
        this.users = users;
    }
}
