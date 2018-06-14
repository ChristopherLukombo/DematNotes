package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.StudentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Student and its DTO StudentDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface StudentMapper extends EntityMapper<StudentDTO, Student> {

    @Mapping(source = "user.id", target = "userId")
    StudentDTO toDto(Student student);

    @Mapping(target = "documents", ignore = true)
    @Mapping(source = "userId", target = "user")
    Student toEntity(StudentDTO studentDTO);

    default Student fromId(Long id) {
        if (id == null) {
            return null;
        }
        Student student = new Student();
        student.setId(id);
        return student;
    }
}
