package org.csid.service.mapper;

import org.csid.domain.*;
import org.csid.service.dto.InscriptionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Inscription and its DTO InscriptionDTO.
 */
@Mapper(componentModel = "spring", uses = {SchoolMapper.class, ClassroomMapper.class, SchoolYearMapper.class, StudentMapper.class})
public interface InscriptionMapper extends EntityMapper<InscriptionDTO, Inscription> {

    @Mapping(source = "school.id", target = "schoolId")
    @Mapping(source = "classroom.id", target = "classroomId")
    @Mapping(source = "schoolYear.id", target = "schoolYearId")
    InscriptionDTO toDto(Inscription inscription);

    @Mapping(source = "schoolId", target = "school")
    @Mapping(source = "classroomId", target = "classroom")
    @Mapping(source = "schoolYearId", target = "schoolYear")
    Inscription toEntity(InscriptionDTO inscriptionDTO);

    default Inscription fromId(Long id) {
        if (id == null) {
            return null;
        }
        Inscription inscription = new Inscription();
        inscription.setId(id);
        return inscription;
    }
}
