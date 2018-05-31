package org.csid.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "ine", nullable = false)
    private String ine;

    @NotNull
    @Pattern(regexp = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Size(min = 10, max = 18)
    @Pattern(regexp = "^[+](\\d{3})\\)?(\\d{3})(\\d{5,6})$|^(\\d{10,10})$")
    @Column(name = "mobile_phone_number", length = 18, nullable = false)
    private String mobilePhoneNumber;

    @NotNull
    @Size(min = 10, max = 18)
    @Pattern(regexp = "^[+](\\d{3})\\)?(\\d{3})(\\d{5,6})$|^(\\d{10,10})$")
    @Column(name = "fixe_phone_number", length = 18, nullable = false)
    private String fixePhoneNumber;

    @NotNull
    @Column(name = "address", nullable = false)
    private String address;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @NotNull
    @Pattern(regexp = "^(([0-8][0-9])|(9[0-5]))[0-9]{3}$")
    @Column(name = "postal_code", nullable = false)
    private String postalCode;

    @NotNull
    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @NotNull
    @Column(name = "place_of_birth", nullable = false)
    private String placeOfBirth;

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private Set<Absence> absences = new HashSet<>();

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private Set<DelayStudent> delaystudents = new HashSet<>();

    @OneToMany(mappedBy = "student")
    @JsonIgnore
    private Set<Document> documents = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToOne
    private SchoolYear schoolYear;

    @ManyToOne
    private Classroom classroom;

    @ManyToOne
    private School school;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIne() {
        return ine;
    }

    public Student ine(String ine) {
        this.ine = ine;
        return this;
    }

    public void setIne(String ine) {
        this.ine = ine;
    }

    public String getEmail() {
        return email;
    }

    public Student email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobilePhoneNumber() {
        return mobilePhoneNumber;
    }

    public Student mobilePhoneNumber(String mobilePhoneNumber) {
        this.mobilePhoneNumber = mobilePhoneNumber;
        return this;
    }

    public void setMobilePhoneNumber(String mobilePhoneNumber) {
        this.mobilePhoneNumber = mobilePhoneNumber;
    }

    public String getFixePhoneNumber() {
        return fixePhoneNumber;
    }

    public Student fixePhoneNumber(String fixePhoneNumber) {
        this.fixePhoneNumber = fixePhoneNumber;
        return this;
    }

    public void setFixePhoneNumber(String fixePhoneNumber) {
        this.fixePhoneNumber = fixePhoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public Student address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public Student city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public Student postalCode(String postalCode) {
        this.postalCode = postalCode;
        return this;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public Student dateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public Student placeOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
        return this;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public Set<Absence> getAbsences() {
        return absences;
    }

    public Student absences(Set<Absence> absences) {
        this.absences = absences;
        return this;
    }

    public Student addAbsences(Absence absence) {
        this.absences.add(absence);
        absence.setStudent(this);
        return this;
    }

    public Student removeAbsences(Absence absence) {
        this.absences.remove(absence);
        absence.setStudent(null);
        return this;
    }

    public void setAbsences(Set<Absence> absences) {
        this.absences = absences;
    }

    public Set<DelayStudent> getDelaystudents() {
        return delaystudents;
    }

    public Student delaystudents(Set<DelayStudent> delayStudents) {
        this.delaystudents = delayStudents;
        return this;
    }

    public Student addDelaystudents(DelayStudent delayStudent) {
        this.delaystudents.add(delayStudent);
        delayStudent.setStudent(this);
        return this;
    }

    public Student removeDelaystudents(DelayStudent delayStudent) {
        this.delaystudents.remove(delayStudent);
        delayStudent.setStudent(null);
        return this;
    }

    public void setDelaystudents(Set<DelayStudent> delayStudents) {
        this.delaystudents = delayStudents;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public Student documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public Student addDocuments(Document document) {
        this.documents.add(document);
        document.setStudent(this);
        return this;
    }

    public Student removeDocuments(Document document) {
        this.documents.remove(document);
        document.setStudent(null);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public User getUser() {
        return user;
    }

    public Student user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SchoolYear getSchoolYear() {
        return schoolYear;
    }

    public Student schoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
        return this;
    }

    public void setSchoolYear(SchoolYear schoolYear) {
        this.schoolYear = schoolYear;
    }

    public Classroom getClassroom() {
        return classroom;
    }

    public Student classroom(Classroom classroom) {
        this.classroom = classroom;
        return this;
    }

    public void setClassroom(Classroom classroom) {
        this.classroom = classroom;
    }

    public School getSchool() {
        return school;
    }

    public Student school(School school) {
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
        Student student = (Student) o;
        if (student.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), student.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Student{" +
            "id=" + getId() +
            ", ine='" + getIne() + "'" +
            ", email='" + getEmail() + "'" +
            ", mobilePhoneNumber='" + getMobilePhoneNumber() + "'" +
            ", fixePhoneNumber='" + getFixePhoneNumber() + "'" +
            ", address='" + getAddress() + "'" +
            ", city='" + getCity() + "'" +
            ", postalCode='" + getPostalCode() + "'" +
            ", dateOfBirth='" + getDateOfBirth() + "'" +
            ", placeOfBirth='" + getPlaceOfBirth() + "'" +
            "}";
    }
}
