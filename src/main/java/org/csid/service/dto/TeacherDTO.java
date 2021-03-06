package org.csid.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Teacher entity.
 */
public class TeacherDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 10, max = 18)
    @Pattern(regexp = "^[+](\\d{3})\\)?(\\d{3})(\\d{5,6})$|^(\\d{10,10})$")
    private String mobilePhoneNumber;

    @Size(min = 10, max = 18)
    @Pattern(regexp = "^[+](\\d{3})\\)?(\\d{3})(\\d{5,6})$|^(\\d{10,10})$")
    private String fixePhoneNumber;

    @NotNull
    private String address;

    @NotNull
    private String city;

    @NotNull
    @Pattern(regexp = "^(([0-8][0-9])|(9[0-5]))[0-9]{3}$")
    private String postalCode;

    @NotNull
    private LocalDate dateOfBirth;

    @NotNull
    private String placeOfBirth;

    private Long userId;

    private Long specialModuleId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMobilePhoneNumber() {
        return mobilePhoneNumber;
    }

    public void setMobilePhoneNumber(String mobilePhoneNumber) {
        this.mobilePhoneNumber = mobilePhoneNumber;
    }

    public String getFixePhoneNumber() {
        return fixePhoneNumber;
    }

    public void setFixePhoneNumber(String fixePhoneNumber) {
        this.fixePhoneNumber = fixePhoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPlaceOfBirth() {
        return placeOfBirth;
    }

    public void setPlaceOfBirth(String placeOfBirth) {
        this.placeOfBirth = placeOfBirth;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getSpecialModuleId() {
        return specialModuleId;
    }

    public void setSpecialModuleId(Long moduleId) {
        this.specialModuleId = moduleId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TeacherDTO teacherDTO = (TeacherDTO) o;
        if(teacherDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), teacherDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TeacherDTO{" +
            "id=" + getId() +
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
