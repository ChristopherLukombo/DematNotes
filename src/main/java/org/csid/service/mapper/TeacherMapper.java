package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.TeacherDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Teacher and its DTO TeacherDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, CourseMapper.class})
public interface TeacherMapper extends EntityMapper<TeacherDTO, Teacher> {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "specialCourse.id", target = "specialCourseId")
    TeacherDTO toDto(Teacher teacher);

    @Mapping(target = "interventions", ignore = true)
    @Mapping(source = "userId", target = "user")
    @Mapping(source = "specialCourseId", target = "specialCourse")
    Teacher toEntity(TeacherDTO teacherDTO);

    default Teacher fromId(Long id) {
        if (id == null) {
            return null;
        }
        Teacher teacher = new Teacher();
        teacher.setId(id);
        return teacher;
    }
}
