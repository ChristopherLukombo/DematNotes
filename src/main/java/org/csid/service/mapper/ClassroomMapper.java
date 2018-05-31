package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.ClassroomDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Classroom and its DTO ClassroomDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ClassroomMapper extends EntityMapper<ClassroomDTO, Classroom> {



    default Classroom fromId(Long id) {
        if (id == null) {
            return null;
        }
        Classroom classroom = new Classroom();
        classroom.setId(id);
        return classroom;
    }
}
